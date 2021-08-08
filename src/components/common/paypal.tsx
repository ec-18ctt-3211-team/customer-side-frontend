import { PayPalButton } from 'react-paypal-button-v2';

interface Props {
  amount: number;
  setSucceed: (succeed: boolean) => void;
}

export default function PayPal(props: Props): JSX.Element {
  return (
    <PayPalButton
      amount={props.amount}
      currency="USD"
      shippingPreference="NO_SHIPPING"
      onSuccess={(details: any, data: any) => {
        props.setSucceed(true);
        console.log(details);
        console.log(data);
      }}
    />
  );
}
