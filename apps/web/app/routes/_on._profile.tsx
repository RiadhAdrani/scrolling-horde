import { json, LoaderFunctionArgs, TypedResponse } from '@remix-run/node';
import { Form, Link, Outlet, useLoaderData } from '@remix-run/react';
import { SuccessResponse } from '@shared/types/request';
import { PublicUserData } from '@shared/types/user';
import axios from 'axios';
import { redirect } from 'react-router';
import TopBar from '~/components/app/top-bar/top-bar';
import { Button } from '~/components/ui/button';
import { Input } from '~/components/ui/input';
import { userCookies } from '~/cookies.server';
import $api, { getUserTokenCookie } from '~/lib/api';

export async function loader(data: LoaderFunctionArgs) {
  let response: TypedResponse<unknown> = json(undefined);

  const cookie = await getUserTokenCookie(data.request);
  if (!cookie) {
    return response;
  }

  const slug = data.params.slug;

  try {
    const res = await $api.get<SuccessResponse<PublicUserData>>('/api/users/profile', {
      headers: {
        Authorization: `Bearer ${cookie}`,
      },
      params: {
        slug,
      },
    });

    response = json(res.data.data);
  } catch (error) {
    // console.log(error);
  }

  return response;
}

export default function Profile() {
  const data = useLoaderData<SuccessResponse<PublicUserData>>();

  return (
    <div className='flex flex-col flex-1'>
      <TopBar />
      <div className='mt-16 flex-1 flex flex-col'>
        <Outlet />
      </div>
    </div>
  );
}
