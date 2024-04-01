import { CreditCardIcon, XCircleIcon } from '@heroicons/react/24/solid';
import { Form } from '@remix-run/react';
import { EligiblePaymentMethodsQuery } from '~/generated/graphql';
import { useState, useEffect } from 'react';
import { setOrderCustomFields } from '~/providers/orders/order';

// const uploadAsset = async (file: File, tag: string) => {
//   const formData = new FormData();
//   formData.append("file", file);
//   const res = await axios.post("https://pcadmin.chuggerpumps.com/poupload", formData);
//   console.log(res.data.id)
//   if(res.data.id){
//   const updateCustomField = await setOrderCustomFields(res.data.id, tag);
//  console.log(updateCustomField)
//   }
// };

export function PoPayments({
  paymentMethod,
  paymentError,
}: {
  paymentMethod: EligiblePaymentMethodsQuery['eligiblePaymentMethods'][number];
  paymentError?: string;
}) {
  const [file, setFile] = useState<File>();
  const [tag, setTag] = useState<string | null>(null);
  return (
    <div className="flex flex-col items-center">
      <p className="text-gray-600 text-sm p-6">PO Payment Method</p>
      {paymentError && (
        <div className="rounded-md bg-red-50 p-4 mb-8">
          <div className="flex">
            <div className="flex-shrink-0">
              <XCircleIcon
                className="h-5 w-5 text-red-400"
                aria-hidden="true"
              />
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-red-800">
                There was an error processing the payment
              </h3>
              <div className="mt-2 text-sm text-red-700">{paymentError}</div>
            </div>
          </div>
        </div>
      )}
      {/*<Form method="post">
        <input
          type="hidden"
          name="paymentMethodCode"
          value={paymentMethod.code}
        />
        <button
          type="submit"
          className="flex px-6 bg-primary-600 hover:bg-primary-700 items-center justify-center space-x-2 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
        >
          <CreditCardIcon className="w-5 h-5"></CreditCardIcon>
          <span>Pay with {paymentMethod.name}</span>
        </button>
      </Form>*/}
      <Form
        encType="multipart/form-data"
        method="post"
        className="flex flex-col gap-3"
        action="/api/po-payment"
      >
        <input
          type="string"
          name="poNumber"
          placeholder="PO Number"
          className="border border-blue-400 rounded-sm p-2"
        />
        <input type="file" name="po" placeholder="Purchase Order" />
        <input
          type="submit"
          value="Submit"
          className="cursor-pointer bg-blue-400 p-2 text-white rounded-sm"
        />
      </Form>
    </div>
  );
}
