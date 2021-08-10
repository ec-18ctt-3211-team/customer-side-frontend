import { PayPalButton } from 'react-paypal-button-v2';

interface Props {
  amount: number;
  createAnOrder: (payment_number: string) => void;
}

export default function PayPal(props: Props): JSX.Element {
  return (
    <PayPalButton
      amount={props.amount}
      currency="USD"
      shippingPreference="NO_SHIPPING"
      onSuccess={(details: any, data: any) => {
        props.createAnOrder(data.payerID);
        console.log('details', details);
        console.log('data', data);
      }}
    />
  );
}
