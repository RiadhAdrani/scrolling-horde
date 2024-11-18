import { createCookie } from '@remix-run/node';

export const userCookies = createCookie('user', {
  maxAge: 604_800, // one week
});
