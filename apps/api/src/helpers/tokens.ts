import $env from '@cfg/config.js';
import $prisma from '@db/prisma.js';
import { $error } from '@helpers/errors.js';
import httpStatus from '@helpers/status.js';
import { Token, TokenSubject } from '@prisma/client';
import { error } from 'console';
import { sign, verify } from 'hono/jwt';
import { JwtTokenExpired } from 'hono/utils/jwt/types';

const secret = $env('API_SECRET');
const algorithm = 'HS256';

export type TokenPayload<T extends object = object> = {
  sub: TokenSubject;
  userId: string;
  exp: number;
  nbf?: number;
  iat?: number;
} & T;

export const createToken = async (data: Pick<Token, 'expiresAt' | 'subject' | 'userId'>) => {
  const payload: TokenPayload = {
    exp: data.expiresAt.getTime(),
    sub: data.subject,
    userId: data.userId,
  };

  const value = await sign(payload, secret, algorithm);

  const token = await $prisma.token.create({ data: { ...data, value } });

  return token;
};

export const deleteToken = async (value: string) => $prisma.token.deleteMany({ where: { value } });

export const deleteTokensByUser = async (userId: string) => $prisma.token.deleteMany({ where: { userId } });

export const deleteByUserAndSubject = async (userId: string, subject: TokenSubject) =>
  $prisma.token.deleteMany({ where: { userId, subject } });

export const findToken = async <B extends boolean>(
  value: string,
  doThrow?: B,
): Promise<B extends true ? Token : Token | undefined> => {
  const token = await $prisma.token.findFirst({ where: { value } });

  if (!token && doThrow) {
    throw $error(httpStatus.NOT_FOUND, 'token.expired');
  }

  return token as Token;
};

export const verifyToken = async (token: string) => {
  let payload: TokenPayload;

  try {
    payload = (await verify(token, secret, algorithm)) as TokenPayload;
  } catch {
    if (error instanceof JwtTokenExpired) {
      throw $error(httpStatus.UNAUTHORIZED, 'token.expired');
    }

    throw $error(httpStatus.UNAUTHORIZED, 'token.invalid');
  }

  const { userId, sub } = payload;

  const exists = await findToken(token, true);

  if (
    new Date(exists.expiresAt).getTime() !== new Date(payload.exp).getTime() ||
    exists.subject !== sub ||
    exists.userId !== userId ||
    new Date(exists.expiresAt).getTime() < new Date().getTime()
  ) {
    throw $error(httpStatus.UNAUTHORIZED, 'token.invalid');
  }

  return payload;
};
