import type { MetaFunction } from '@remix-run/node';
import { Form, Link, useActionData } from '@remix-run/react';
import type { FailedResponse } from '@shared-types/request';
import { Button } from '~/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '~/components/ui/card';
import { Input } from '~/components/ui/input';

export const meta: MetaFunction = () => {
  return [{ title: 'Sign In' }];
};

export default function Index() {
  const data = useActionData<FailedResponse | undefined>();

  return (
    <Form method='POST' action='/signin' className='w-[500px]'>
      <Card>
        <CardHeader>
          <CardTitle>Signin</CardTitle>
          <CardDescription>Welcome to Scrolling Horde</CardDescription>
        </CardHeader>
        <CardContent className='flex flex-col gap-2'>
          <Input placeholder='Email' type='email' name='email' />
          <Input placeholder='Password' type='password' name='password' />
          <Link to={'/signup'}>No account yet</Link>
        </CardContent>
        <CardFooter>
          <Button type='submit'>Sign in</Button>
        </CardFooter>
      </Card>
    </Form>
  );
}
