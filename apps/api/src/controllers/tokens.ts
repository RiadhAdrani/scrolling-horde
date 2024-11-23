import { $error } from '@helpers/errors.js';
import { $success } from '@helpers/request.js';
import httpStatus from '@helpers/status.js';
import { findToken } from '@helpers/tokens.js';

export const checkToken = async (value: string) => {
  const token = await findToken(value, true);

  // check if token is valid and not expired
  if (token.expiresAt && token.expiresAt < new Date()) {
    throw $error(httpStatus.UNAUTHORIZED, 'token.expired');
  }

  return $success(true);
};
