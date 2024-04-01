import { LoaderArgs, redirect } from '@remix-run/cloudflare';
import { CHANNEL_TOKEN, PO_PAYMENT_UPLOAD_URL } from '~/constants';
import {
  addPaymentToOrder,
  getEligiblePaymentMethods,
  getNextOrderStates,
  transitionOrderToState,
} from '~/providers/checkout/checkout';
import { setOrderCustomFields } from '~/providers/orders/order';

export async function action({ request }: LoaderArgs) {
  const poDetails = await request.formData();
  const formData = new FormData();
  const poFile = poDetails.get('po');
  if (poFile) {
    formData.append('file', poDetails.get('po'));
    // const res = await (PO_PAYMENT_UPLOAD_URL, formData, {
    //   headers: {
    //     'vendure-token': CHANNEL_TOKEN,
    //   },
    // });
    const res = await fetch(PO_PAYMENT_UPLOAD_URL, {
      headers: {
        'vendure-token': CHANNEL_TOKEN,
      },
      method: 'POST',
      body: formData,
    });
    const imgRes = await res.json();
    const updateCustomFields = await setOrderCustomFields(
      imgRes.id,
      poDetails.get('poNumber'),
      { request },
    );
    console.log(updateCustomFields);
  } else {
    const updateCustomFieldsWithoutFile = await setOrderCustomFields(
      '',
      poDetails.get('poNumber'),
      { request },
    );
    console.log(updateCustomFieldsWithoutFile);
  }

  const { nextOrderStates } = await getNextOrderStates({ request });
  console.log(nextOrderStates);
  if (nextOrderStates.includes('ArrangingPayment')) {
    const transitionResult = await transitionOrderToState('ArrangingPayment', {
      request,
    });
    console.log(transitionResult);
  }

  //adding payment to order
  const eligibleMethods = await getEligiblePaymentMethods({ request });
  console.log(eligibleMethods);

  const addPayment = await addPaymentToOrder(
    { method: 'po-payment', metadata: {} },
    { request },
  );
  console.log(addPayment);
  if (addPayment.addPaymentToOrder.__typename === 'Order') {
    return redirect(
      `/checkout/confirmation/${addPayment.addPaymentToOrder.code}`,
    );
  } else {
    return redirect('/checkout/error');
  }
}
