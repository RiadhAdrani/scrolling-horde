import $prisma from '@db/prisma.js';
import { $error } from '@helpers/errors.js';
import $password from '@helpers/password.js';
import { $success } from '@helpers/request.js';
import httpStatus from '@helpers/status.js';
import { createToken } from '@helpers/tokens.js';
import { findUserByEmail } from '@helpers/users.js';
import { duration } from '@helpers/utils.js';
import { TokenSubject, User } from '@prisma/client';
import { omit } from '@riadh-adrani/obj-utils';
import type { PublicUserData, SignInBody, SignInResponse, SignUpBody, SignUpResponse } from '@shared-types/user.js';
import userValidators from '@validators/user.js';

export const signup = async (_body: SignUpBody) => {
  const body = userValidators.signup.parse(_body);

  // check if email is used
  if (await findUserByEmail(body.email)) {
    throw $error(httpStatus.CONFLICT, 'users.emailUsed');
  }

  body.password = await $password.hash(body.password);

  const user = await $prisma.user.create({
    data: body,
  });

  const token = await createToken({
    expiresAt: duration.weeks(),
    subject: TokenSubject.Authentication,
    userId: user.id,
  });

  return $success<SignUpResponse>({ user, token: token.value });
};

export const signin = async (_body: SignInBody) => {
  const body = userValidators.signin.parse(_body);

  const user = await findUserByEmail(body.email, true);

  // check password
  if (!(await $password.compare(body.password, user.password))) {
    throw $error(httpStatus.UNAUTHORIZED, 'users.notFound');
  }

  const token = await createToken({
    expiresAt: duration.weeks(),
    subject: TokenSubject.Authentication,
    userId: user.id,
  });

  return $success<SignInResponse>({ user, token: token.value });
};

export const getMe = async (user: User) => {
  return $success<PublicUserData>(omit(user, 'password'));
};
