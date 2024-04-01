import { Form, Link, useActionData, useSearchParams } from '@remix-run/react';
import { DataFunctionArgs, json, redirect } from '@remix-run/server-runtime';
import { requestPasswordReset } from '~/providers/account/account';
import { ErrorCode, ErrorResult } from '~/generated/graphql';
import { XCircleIcon } from '@heroicons/react/24/outline';
import { useEffect, useState } from 'react';

export async function action({ params, request }: DataFunctionArgs) {
  const body = await request.formData();
  const email = body.get('email');
  if (typeof email === 'string') {
    const result = await requestPasswordReset(email);
    if (result?.__typename === 'Success') {
      return redirect('/forgot-password/success');
    } else {
      const requestResetError: ErrorResult = {
        errorCode: result?.errorCode as ErrorCode,
        message: result?.message as string,
      };
      return json(requestResetError, {
        status: 401,
      });
    }
  }
}

export default function forgotPasswordPage() {
  const [spinner, setSpinner] = useState(false);
  const actionData = useActionData<ErrorResult>();

  useEffect(() => {
    setSpinner(false);
  }, [actionData]);
  const showSpinner = () => {
    setSpinner(true);
  };

  return (
    <>
      <div className="flex flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <h1 className="mt-6 text-center text-2xl text-gray-900">
            Forgot Password?
          </h1>
        </div>
        <div className="mt-4 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-white py-4 px-4 shadow sm:rounded-lg sm:px-10">
            <Form
              className="space-y-6"
              method="post"
              onSubmit={() => showSpinner()}
            >
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700"
                >
                  Enter email address
                </label>
                <div className="mt-1">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                  />
                </div>
              </div>

              {actionData && (
                <div className="rounded-md bg-red-50 p-4">
                  <div className="flex">
                    <div className="flex-shrink-0">
                      <XCircleIcon
                        className="h-5 w-5 text-red-400"
                        aria-hidden="true"
                      />
                    </div>
                    <div className="ml-3">
                      <h3 className="text-sm font-medium text-red-800">
                        There was a problem with the email.
                      </h3>
                      <p className="text-sm text-red-700 mt-2">
                        {actionData.message}
                      </p>
                    </div>
                  </div>
                </div>
              )}
              <div>
                <button
                  type="submit"
                  className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                >
                  Send Reset Link
                  {spinner && (
                    <div className=" ml-4 h-4 w-4 border-2 border-white border-t-blue-400 rounded-full animate-spin"></div>
                  )}
                </button>
              </div>
            </Form>
          </div>
        </div>
      </div>
    </>
  );
}
