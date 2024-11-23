import axios from 'axios';
import $env from './env';
import { userCookies } from '~/cookies.server';

const $api = axios.create({
  baseURL: $env('API_URL'),
});

export const getUserTokenCookie = async (request: Request): Promise<string | undefined> => {
  const raw = request.headers.get('Cookie');

  const cookie = await userCookies.parse(raw);

  return cookie;
};

export default $api;
