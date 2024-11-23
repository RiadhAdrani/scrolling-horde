import { json, LoaderFunctionArgs } from '@remix-run/node';
import { Outlet } from '@remix-run/react';
import { SuccessResponse } from '@shared/types/request';
import { PublicUserData } from '@shared/types/user';
import { redirect } from 'react-router';
import { userCookies } from '~/cookies.server';
import $api, { getUserTokenCookie } from '~/lib/api';

export async function loader(data: LoaderFunctionArgs) {
  const cookie = await getUserTokenCookie(data.request);

  let response: unknown = json('ok');

  if (!cookie) {
    return response;
  }

  try {
    const res = await $api.get<SuccessResponse<PublicUserData>>('/api/users/me', {
      headers: {
        Authorization: `Bearer ${cookie}`,
      },
    });

    // we are logged in
    response = redirect('/');
  } catch (error) {
    // console.log(error);
  }

  return response;
}

export default function AuthGuard() {
  return (
    <div className='flex flex-col flex-1 items-center justify-center'>
      <Outlet />
    </div>
  );
}
