import {
  addPaymentToOrder,
  getNextOrderStates,
  transitionOrderToState,
} from '~/providers/checkout/checkout';
import { getActiveOrder } from '~/providers/orders/order';
import { DataFunctionArgs, LoaderArgs, redirect } from '@remix-run/cloudflare';
import { BasicCardInfo } from '~/types';

export async function loader({ request }: DataFunctionArgs) {
  return {
    activeOrder: await getActiveOrder({ request }),
  };
}

export async function action({ request }: LoaderArgs) {
  const formData = await request.formData();
  const cardNumber = formData.get('cardNumber');
  const month = formData.get('month');
  const year = formData.get('year');
  const cardCode = formData.get('cardCode');
  const expiryDate = `${month}/${year}`;
  const activeOrder = await getActiveOrder({ request });
  const { nextOrderStates } = await getNextOrderStates({
    request,
  });

  if (cardNumber && expiryDate && cardCode) {
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
    const addPayment = await addPaymentToOrder(
      {
        method: 'authorize',
        metadata: { cardNumber, expirationDate: expiryDate, cardCode },
      },
      { request },
    );
    if (addPayment.addPaymentToOrder.__typename == 'Order') {
      return redirect(
        `/checkout/confirmation/${addPayment.addPaymentToOrder.code}`,
      );
    }
  } else {
    return redirect('/checkout/error');
  }
}
