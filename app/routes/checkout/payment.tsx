import { DataFunctionArgs } from '@remix-run/server-runtime';
import { redirect } from '@remix-run/cloudflare';
import {
  addPaymentToOrder,
  generateBraintreeClientToken,
  createStripePaymentIntent,
  getEligiblePaymentMethods,
  getNextOrderStates,
  transitionOrderToState,
} from '~/providers/checkout/checkout';
import {
  useActionData,
  useLoaderData,
  useOutletContext,
} from '@remix-run/react';
import { OutletContext } from '~/types';
import { sessionStorage } from '~/sessions';
import { CurrencyCode, ErrorCode, ErrorResult } from '~/generated/graphql';
import { StripePayments } from '~/components/checkout/stripe/StripePayments';
//import { DummyPayments } from '~/components/checkout/DummyPayments';
import { BraintreeDropIn } from '~/components/checkout/braintree/BraintreePayments';
import { getActiveOrder } from '~/providers/orders/order';
import { PoPayments } from '~/components/checkout/PoPayments';
import CreditCardForm from '~/components/creditcard/credit-card-form';

export async function loader({ params, request }: DataFunctionArgs) {
  const session = await sessionStorage.getSession(
    request?.headers.get('Cookie'),
  );
  const activeOrder = await getActiveOrder({ request });
  //console.log(activeOrder);
  //check if there is an active order if not redirect to homepage
  if (
    !session ||
    !activeOrder ||
    !activeOrder.active ||
    activeOrder.lines.length === 0
  ) {
    return redirect('/');
  }

  let { eligiblePaymentMethods } = await getEligiblePaymentMethods({
    request,
  });
  eligiblePaymentMethods = eligiblePaymentMethods.filter(
    (method) => method.isEligible,
  );
  const error = session.get('activeOrderError');
  let stripePaymentIntent: string | undefined;
  let stripePublishableKey: string | undefined;
  let stripeError: string | undefined;
  if (eligiblePaymentMethods.find((method) => method.code.includes('stripe'))) {
    try {
      const stripePaymentIntentResult = await createStripePaymentIntent({
        request,
      });
      stripePaymentIntent =
        stripePaymentIntentResult.createStripePaymentIntent ?? undefined;
      stripePublishableKey = process.env.STRIPE_PUBLISHABLE_KEY;
    } catch (e: any) {
      stripeError = e.message;
    }
  }

  let brainTreeKey: string | undefined;
  let brainTreeError: string | undefined;
  if (
    eligiblePaymentMethods.find((method) => method.code.includes('braintree'))
  ) {
    try {
      const generateBrainTreeTokenResult = await generateBraintreeClientToken({
        request,
      });
      brainTreeKey =
        generateBrainTreeTokenResult.generateBraintreeClientToken ?? '';
    } catch (e: any) {
      brainTreeError = e.message;
    }
  }
  return {
    request,
    eligiblePaymentMethods,
    stripePaymentIntent,
    stripePublishableKey,
    stripeError,
    brainTreeKey,
    brainTreeError,
    error,
  };
}

export async function action({ params, request }: DataFunctionArgs) {
  const body = await request.formData();
  const paymentMethodCode = body.get('paymentMethodCode');
  const paymentNonce = body.get('paymentNonce');
  //console.log(paymentNonce);
  //console.log(paymentMethodCode);
  if (typeof paymentMethodCode === 'string') {
    const { nextOrderStates } = await getNextOrderStates({
      request,
    });
    if (nextOrderStates.includes('ArrangingPayment')) {
      const transitionResult = await transitionOrderToState(
        'ArrangingPayment',
        { request },
      );
      if (transitionResult.transitionOrderToState?.__typename !== 'Order') {
        throw new Response('Not Found', {
          status: 400,
          statusText: transitionResult.transitionOrderToState?.message,
        });
      }
    }

    //  for authorize payment method
    if (paymentMethodCode === 'authorize') {
      const cardNumber = body.get('cardNumber');
      const month = body.get('month');
      const year = body.get('year');
      const cardCode = body.get('cardCode');
      const expiryDate = `${month}/${year}`;

      if (cardNumber && expiryDate && cardCode) {
        const result = await addPaymentToOrder(
          {
            method: 'authorize',
            metadata: { cardNumber, expirationDate: expiryDate, cardCode },
          },
          { request },
        );
        if (result.addPaymentToOrder.__typename == 'Order') {
          return redirect(
            `/checkout/confirmation/${result.addPaymentToOrder.code}`,
          );
        } else {
          return {
            errorMessage: result.addPaymentToOrder?.message,
          };
        }
      }
    }

    // const result = await addPaymentToOrder(
    //   { method: paymentMethodCode, metadata: { nonce: paymentNonce } },
    //   { request },
    // );
    // if (result.addPaymentToOrder.__typename === 'Order') {
    //   return redirect(
    //     `/checkout/confirmation/${result.addPaymentToOrder.code}`,
    //   );
    // } else {
    //   throw new Response('Not Found', {
    //     status: 400,
    //     statusText: result.addPaymentToOrder?.message,
    //   });
    // }
  }
}

export default function CheckoutPayment() {
  const {
    eligiblePaymentMethods,
    stripePaymentIntent,
    stripePublishableKey,
    stripeError,
    brainTreeKey,
    brainTreeError,
    error,
  } = useLoaderData<typeof loader>();
  const { activeOrderFetcher, activeOrder } = useOutletContext<OutletContext>();
  const paymentError = getPaymentError(error);
  const actionData = useActionData();
  //console.log(actionData);

  return (
    <div className="flex flex-col items-center divide-gray-200 divide-y">
      {eligiblePaymentMethods.map((paymentMethod) =>
        paymentMethod.code.includes('braintree') ? (
          <div className="py-3 w-full" key={paymentMethod.id}>
            {brainTreeError ? (
              <div>
                <p className="text-red-700 font-bold">Braintree error:</p>
                <p className="text-sm">{brainTreeError}</p>
              </div>
            ) : (
              <BraintreeDropIn
                fullAmount={activeOrder?.totalWithTax ?? 0}
                currencyCode={
                  activeOrder?.currencyCode ?? ('USD' as CurrencyCode)
                }
                show={true}
                authorization={brainTreeKey!}
              />
            )}
          </div>
        ) : paymentMethod.code.includes('stripe') ? (
          <div className="py-12" key={paymentMethod.id}>
            {stripeError ? (
              <div>
                <p className="text-red-700 font-bold">Stripe error:</p>
                <p className="text-sm">{stripeError}</p>
              </div>
            ) : (
              <StripePayments
                orderCode={activeOrder?.code ?? ''}
                clientSecret={stripePaymentIntent!}
                publishableKey={stripePublishableKey!}
              ></StripePayments>
            )}
          </div>
        ) : (
          <div className="py-3 w-full" key={paymentMethod.id}>
            {paymentMethod.code.includes('po') ? (
              <PoPayments
                paymentMethod={paymentMethod}
                paymentError={paymentError}
              />
            ) : (
              paymentMethod.code.includes('authorize') && (
                <div>
                  <div>
                    <CreditCardForm errorMessage={actionData?.errorMessage} />
                  </div>
                </div>
              )
            )}
          </div>
        ),
      )}
    </div>
  );
}

function getPaymentError(error?: ErrorResult): string | undefined {
  if (!error || !error.errorCode) {
    return undefined;
  }
  switch (error.errorCode) {
    case ErrorCode.OrderPaymentStateError:
    case ErrorCode.IneligiblePaymentMethodError:
    case ErrorCode.PaymentFailedError:
    case ErrorCode.PaymentDeclinedError:
    case ErrorCode.OrderStateTransitionError:
    case ErrorCode.NoActiveOrderError:
      return error.message;
  }
}
