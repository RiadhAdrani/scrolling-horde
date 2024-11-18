import { json, LoaderFunctionArgs } from '@remix-run/node';
import { Form, Link, Outlet, useLoaderData } from '@remix-run/react';
import { SuccessResponse } from '@shared/types/request';
import { PublicUserData } from '@shared/types/user';
import axios from 'axios';
import { redirect } from 'react-router';
import TopBar from '~/components/app/top-bar/top-bar';
import { Button } from '~/components/ui/button';
import { Input } from '~/components/ui/input';
import { userCookies } from '~/cookies.server';

export async function loader(data: LoaderFunctionArgs) {
  const raw = data.request.headers.get('Cookie');

  let response: unknown = redirect('/signin');

  const cookie = await userCookies.parse(raw);

  if (!cookie) {
    return response;
  }

  try {
    const res = await axios.get<SuccessResponse<PublicUserData>>('http://localhost:8888/api/users/me', {
      headers: {
        Authorization: `Bearer ${cookie}`,
      },
    });

    response = json(res.data.data);
  } catch (error) {
    // console.log(error);
  }

  return response;
}

export default function AuthGuard() {
  const data = useLoaderData<SuccessResponse<PublicUserData>>();

  return (
    <div className='flex flex-col flex-1'>
      <TopBar />
      <div className='mt-16 py-4 flex-1 flex flex-col'>
        <Outlet />
      </div>
    </div>
  );
}
