import $env from '@cfg/config.js';
import $prisma from '@db/prisma.js';
import { $error } from '@helpers/errors.js';
import httpStatus from '@helpers/status.js';
import { Token, TokenSubject } from '@prisma/client';
import { error } from 'console';
import { sign, verify } from 'hono/jwt';
import { JwtTokenExpired } from 'hono/utils/jwt/types';

export type TokenPayload<T extends object = object> = {
  sub: TokenSubject;
  userId: string;
  exp: number;
  nbf?: number;
  iat?: number;
} & T;

const createOne = async (data: Pick<Token, 'expiresAt' | 'subject' | 'userId'>) => {
  const payload: TokenPayload = {
    exp: data.expiresAt.getTime(),
    sub: data.subject,
    userId: data.userId,
  };

  const value = await sign(payload, $env('API_SECRET'), 'HS256');

  const token = await $prisma.token.create({ data: { ...data, value } });

  return token;
};

const deleteOne = async (id: string) => $prisma.token.delete({ where: { id } });

const deleteByValue = async (value: string) => $prisma.token.deleteMany({ where: { value } });

const deleteByUser = async (userId: string) => $prisma.token.deleteMany({ where: { userId } });

const deleteByUserAndSubject = async (userId: string, subject: TokenSubject) =>
  $prisma.token.deleteMany({ where: { userId, subject } });

const findByValue = async <B extends boolean>(
  value: string,
  doThrow?: B,
): Promise<B extends true ? Token : Token | undefined> => {
  const token = await $prisma.token.findFirst({ where: { value } });

  if (!token && doThrow) {
    throw $error(httpStatus.NOT_FOUND, 'token.expired');
  }

  return token as Token;
};

const verifyToken = async (token: string) => {
  let payload: TokenPayload;

  try {
    payload = (await verify(token, $env('API_SECRET'), 'HS256')) as TokenPayload;
  } catch {
    if (error instanceof JwtTokenExpired) {
      throw $error(httpStatus.UNAUTHORIZED, 'token.expired');
    }

    throw $error(httpStatus.UNAUTHORIZED, 'token.invalid');
  }

  const { userId, sub } = payload;

  const exists = await findByValue(token, true);

  if (
    new Date(exists.expiresAt) !== new Date(payload.exp) ||
    exists.subject !== sub ||
    exists.userId !== userId ||
    exists.value !== token ||
    exists.expiresAt < new Date()
  ) {
    throw $error(httpStatus.UNAUTHORIZED, 'token.invalid');
  }

  return payload;
};

const $token = {
  create: {
    one: createOne,
  },
  delete: {
    byId: deleteOne,
    byValue: deleteByValue,
    byUser: deleteByUser,
    byUserAndSubject: deleteByUserAndSubject,
  },
  find: {
    byValue: findByValue,
  },
  verify: verifyToken,
};

export default $token;
