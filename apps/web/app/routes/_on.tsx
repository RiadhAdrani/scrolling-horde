import { json, LoaderFunctionArgs } from '@remix-run/node';
import { Form, Link, Outlet, useLoaderData } from '@remix-run/react';
import { SuccessResponse } from '@shared/types/request';
import { PublicUserData } from '@shared/types/user';
import axios from 'axios';
import { redirect } from 'react-router';
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
      <div className='absolute top-0 right-0 w-screen h-16 bg-slate-200 shadow-xl overflow-hidden'>
        <div className='size-full flex flex-row items-center px-8 py-2 gap-4'>
          <h1 className='flex-1'>The Scrolling Horde</h1>
          <div className='flex-1 flex flex-row items-center'>
            <Input placeholder='Search' />
          </div>
          <div className='flex-1 flex flex-row gap-2 justify-end'>
            <Button>User</Button>
            <Form method='GET' action='/logout'>
              <Button>Disconnect</Button>
            </Form>
          </div>
        </div>
      </div>
      <div className='mt-16 py-4 flex-1 flex flex-col'>
        <Outlet />
      </div>
    </div>
  );
}
