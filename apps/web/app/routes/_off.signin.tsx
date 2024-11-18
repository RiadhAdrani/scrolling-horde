import type { ActionFunctionArgs, MetaFunction } from '@remix-run/node';
import { Form, json, Link, redirect, useActionData } from '@remix-run/react';
import type { FailedResponse, SuccessResponse } from '@shared-types/request';
import { SignInResponse } from '@shared/types/user';
import axios, { AxiosError } from 'axios';
import { useEffect } from 'react';
import { toast } from 'sonner';
import { Button } from '~/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '~/components/ui/card';
import { Input } from '~/components/ui/input';
import { userCookies } from '~/cookies.server';

export const meta: MetaFunction = () => {
  return [{ title: 'Sign In' }];
};

export const action = async ({ request }: ActionFunctionArgs) => {
  const body = Object.fromEntries(await request.formData());

  try {
    const response = await axios.post<SuccessResponse<SignInResponse>>('http://localhost:8888/api/users/signin', body);

    const cookie = await userCookies.serialize(response.data.data.token);

    return redirect('/', {
      headers: {
        'Set-Cookie': cookie,
      },
    });
  } catch (e) {
    return json((e as AxiosError<FailedResponse>).response?.data);
  }
};

export default function Index() {
  const data = useActionData<FailedResponse | undefined>();

  useEffect(() => {
    if (data) {
      toast.error('User with the given credentials was not found');
    }
  });

  return (
    <Form method='POST' action='/signin' className='w-[500px]'>
      <Card>
        <CardHeader>
          <CardTitle>Sign In</CardTitle>
          <CardDescription>Welcome to Scrolling Horde</CardDescription>
        </CardHeader>
        <CardContent className='flex flex-col gap-4'>
          <label className='flex flex-col gap-1 text-sm'>
            <span>Email</span>
            <Input placeholder='Email' type='email' name='email' />
          </label>
          <label className='flex flex-col gap-1 text-sm'>
            <span>Password</span>
            <Input placeholder='Password' type='password' name='password' />
          </label>
          <Link to={'/signup'} className='w-full'>
            <Button variant={'ghost'} className='w-full'>
              No account yet
            </Button>
          </Link>
        </CardContent>
        <CardFooter>
          <Button className='w-full' type='submit'>
            Sign in
          </Button>
        </CardFooter>
      </Card>
    </Form>
  );
}
