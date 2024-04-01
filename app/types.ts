import { useActiveOrder } from '~/utils/use-active-order';
import { CreateAddressInput } from '~/generated/graphql';

export type OutletContext = ReturnType<typeof useActiveOrder>;

export type ShippingFormData = CreateAddressInput;

export type BasicCardInfo = {
  cardNumber: string;
  cardCode: string;
  month: string;
  year: string;
};
