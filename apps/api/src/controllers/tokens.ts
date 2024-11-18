import { $error } from '@helpers/errors.js';
import { $success } from '@helpers/request.js';
import httpStatus from '@helpers/status.js';
import $token from '@models/token.js';

export const checkToken = async (value: string) => {
  const token = await $token.find.byValue(value, true);

  // check if token is valid and not expired
  if (token.expiresAt && token.expiresAt < new Date()) {
    throw $error(httpStatus.UNAUTHORIZED, 'token.expired');
  }

  return $success(true);
};
