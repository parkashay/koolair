import { useState, useEffect } from 'react';
import { Form, Link, useActionData, useSearchParams } from '@remix-run/react';
import { DataFunctionArgs, json, redirect } from '@remix-run/server-runtime';
import { resetPassword } from '~/providers/account/account';
import {
  RegisterValidationErrors,
  validatePasswordResetForm,
} from '~/utils/registration-helper';
import { ErrorCode, ErrorResult } from '~/generated/graphql';
import { XCircleIcon } from '@heroicons/react/24/outline';

export async function action({ params, request }: DataFunctionArgs) {
  const url = new URL(request.url);
  const token = url.searchParams.get('token');

  if (!token) {
    return {
      success: false,
      error: 'Verification token was not provided!',
    };
  }

  const body = await request.formData();
  const fieldErrors = validatePasswordResetForm(body);

  if (Object.keys(fieldErrors).length !== 0) {
    return fieldErrors;
  }

  const password = body.get('password') as string;

  const result = await resetPassword(token, password);

  if (result.__typename === 'CurrentUser') {
    return redirect('/sign-in');
  } else if (result.__typename === 'PasswordValidationError') {
    const formError: RegisterValidationErrors = {
      form: result.errorCode,
    };
    return json(formError, {
      status: 401,
    });
  } else {
    const resetError: ErrorResult = {
      errorCode: result?.errorCode as ErrorCode,
      message: result?.message as string,
    };
    return json(resetError, {
      status: 401,
    });
  }
}

export default function passwordResetPage() {
  const formErrors = useActionData<RegisterValidationErrors>();
  const actionData = useActionData<ErrorResult>();
  const [spinner, setSpinner] = useState(false);

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
            Reset Your Password
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
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700"
                >
                  Password
                </label>
                <div className="mt-1">
                  <input
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                  />
                  {formErrors?.password && (
                    <div className="text-xs text-red-700">
                      {formErrors.password}
                    </div>
                  )}
                </div>
              </div>
              <div>
                <label
                  htmlFor="repeatPassword"
                  className="block text-sm font-medium text-gray-700"
                >
                  Confirm Password
                </label>
                <div className="mt-1">
                  <input
                    id="repeatPassword"
                    name="repeatPassword"
                    type="password"
                    autoComplete="current-password"
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                  />
                  {formErrors?.repeatPassword && (
                    <div className="text-xs text-red-700">
                      {formErrors.repeatPassword}
                    </div>
                  )}
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
                        We ran into a problem!
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
                  Reset Password
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
