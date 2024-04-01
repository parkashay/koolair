import { useEffect, useMemo, useState } from 'react';
import { Price } from '~/components/products/Price';
import { OrderDetailFragment } from '~/generated/graphql';
import { useGlobalTransitionStates } from 'remix-utils';

export function CartTotals({ order }: { order?: OrderDetailFragment | null }) {
  let globalState = useGlobalTransitionStates();

  const totalTaxAmount = useMemo(
    () => order?.taxSummary.reduce((acc, curr) => acc + curr.taxTotal, 0),
    [order],
  );

  return (
    <dl className="border-t mt-6 border-gray-200 py-6 space-y-6">
      <div className="flex items-center justify-between">
        <dt className="text-sm">Subtotal</dt>

        <dd className="text-sm font-medium text-gray-900">
          <Price
            priceWithTax={order?.subTotal}
            currencyCode={order?.currencyCode}
          ></Price>
        </dd>
      </div>
      <div className="flex items-center justify-between">
        <dt className="text-sm">Shipping cost</dt>
        <dd className="text-sm font-medium text-gray-900">
          <Price
            priceWithTax={order?.shipping ?? 0}
            currencyCode={order?.currencyCode}
          ></Price>
        </dd>
      </div>
      {globalState.includes('loading') || globalState.includes('submitting') ? (
        <div className="border-2 rounded-full h-[20px] w-[20px] border-t-blue-500 animate-spin "></div>
      ) : (
        // order?.taxSummary?.map((tax) => {
        //   return (
        //     <div
        //       key={tax.description}
        //       className="flex items-center justify-between"
        //     >
        //       <dt className="text-sm"> {tax.description} </dt>
        //       <dd className="text-sm font-medium text-gray-900">
        //         <Price
        //           priceWithTax={tax?.taxTotal}
        //           currencyCode={order?.currencyCode}
        //         ></Price>
        //       </dd>
        //     </div>
        //   );
        // })

        <div className="flex items-center justify-between">
          <dt className="text-sm"> Tax </dt>
          <dd className="text-sm font-medium text-gray-900">
            <Price
              priceWithTax={totalTaxAmount ?? 0}
              currencyCode={order?.currencyCode}
            ></Price>
          </dd>
        </div>
      )}

      <div className="flex items-center justify-between border-t border-gray-200 pt-6">
        <dt className="text-base font-medium">Total</dt>
        <dd className="text-base font-medium text-gray-900">
          <Price
            priceWithTax={order?.totalWithTax}
            currencyCode={order?.currencyCode}
          ></Price>
        </dd>
      </div>
    </dl>
  );
}
