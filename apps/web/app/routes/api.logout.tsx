import { redirect } from '@remix-run/node';
import { userCookies } from '~/cookies.server';

export async function loader() {
  const cookie = await userCookies.serialize('', { expires: new Date() });

  // reset cookies
  return redirect('/signin', {
    headers: {
      'Set-Cookie': cookie,
    },
  });
}
