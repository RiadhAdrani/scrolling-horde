import type { ActionFunctionArgs, LoaderFunctionArgs, MetaFunction } from '@remix-run/node';
import { Form, json, Link, redirect, useActionData } from '@remix-run/react';
import type { FailedResponse, SuccessResponse } from '@shared-types/request';
import type { SignUpResponse } from '@shared-types/user';
import axios, { AxiosError } from 'axios';
import { Button } from '~/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '~/components/ui/card';
import { Input } from '~/components/ui/input';
import { userCookies } from '~/cookies.server';

export const meta: MetaFunction = () => {
  return [{ title: 'Sign Up' }];
};

export async function loader(args: LoaderFunctionArgs) {
  const raw = args.request.headers.get('Cookie');

  const cookie = await userCookies.parse(raw);
  if (!cookie) {
    return json('ok');
  }

  let response: unknown;

  try {
    await axios.post('http://localhost:8888/api/tokens', cookie);
    response = redirect('/');
  } catch (e) {
    response = json('ok');
  }

  return response;
}

export async function action(args: ActionFunctionArgs) {
  const body = await args.request.formData();

  // transform formdata to json
  const data = Object.fromEntries(body);

  try {
    const response = await axios.post<SuccessResponse<SignUpResponse>>('http://localhost:8888/api/users/signup', data);

    const cookie = await userCookies.serialize(response.data.data.token);

    return redirect('/', {
      headers: {
        'Set-Cookie': cookie,
      },
    });
  } catch (e) {
    const response = e as AxiosError<FailedResponse>;

    return json(response.response?.data);
  }
}

export default function Index() {
  const data = useActionData<FailedResponse | undefined>();

  return (
    <Form method='POST' action='/signup' className='w-[500px]'>
      <Card>
        <CardHeader>
          <CardTitle>Signup</CardTitle>
          <CardDescription>Signup to Scrolling Horde</CardDescription>
        </CardHeader>
        <CardContent className='flex flex-col gap-2'>
          <Input placeholder='Email' type='email' name='email' />
          <Input placeholder='Password' type='password' name='password' />
          <Input placeholder='First name' type='text' name='firstname' />
          <Input placeholder='Last name' type='text' name='lastname' />
          <Link to={'/signin'} className='w-full'>
            <Button className='w-full' variant={'ghost'}>
              Already have an account
            </Button>
          </Link>
        </CardContent>
        <CardFooter className='w-full'>
          <Button className='w-full' type='submit'>
            Signup
          </Button>
        </CardFooter>
      </Card>
    </Form>
  );
}
