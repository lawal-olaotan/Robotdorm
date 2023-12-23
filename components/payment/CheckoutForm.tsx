import {
  CardNumberElement,
  PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import { CreatePaymentMethodCardData } from "@stripe/stripe-js";
import classNames from "classnames";
import React from "react";
// import { setShowPaymentScreen } from "../../../../../redux/reducers/payment";
// import { ReactComponent as X } from "../../X.svg";
// import { useDispatch } from "react-redux";
// import { NEXT_PUBLIC_PAYMENT_API_URL } from "../../../configs";

export default function CheckoutForm({ title }: { title: string }) {
  const stripe = useStripe();
  const elements = useElements();
  // const dispatch = useDispatch();

  const [isProcessing, setIsProcessing] = React.useState<boolean>(false);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js has not yet loaded.
      // Handle error or show loading state.
      return;
    }

    setIsProcessing(true);

    const { error, paymentIntent } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: process.env.NEXT_PUBLIC_PAYMENT_API_URL + "/success",
        receipt_email: "nehemiezikama@gmail.com",
      },
      redirect: "if_required",
    });

    if (error) {
      // Handle error
      console.error(error);
      setIsProcessing(false);
      return;
    }

    if (paymentIntent) {
      if (paymentIntent?.status === "succeeded") {
        // Convert the object into a query string
        const queryParams = new URLSearchParams({
          id: paymentIntent.id as string,
          client_secret: paymentIntent.client_secret as string,
          payment_method: paymentIntent.payment_method as string,
          receipt_email: paymentIntent.receipt_email as string,
          status: paymentIntent.status as string,
          amount: String(paymentIntent.amount) as string,
        }).toString();
        // Handle payment - send it to the server for processing subscription
        // ...
        fetch(`${process.env.NEXT_PUBLIC_PAYMENT_API_URL}/success?${queryParams}`)
          .then((res) => res.json())
          .then((data) => {
            if (data.status === "success") {
              // close the modal
              setIsProcessing(false);
              // dispatch(setShowPaymentScreen(false));
            }
          });
      }
    }
  };

  return (
      <form
        onSubmit={handleSubmit}
        className="art_modal container mx-auto w-full h-full flex justify-center items-center flex-col"
      >
          <div className="wrapp w-[100%] min-h-[290px] max-h-[475px] p-3 overflow-y-auto overflow-x-hidden"> 
            <PaymentElement
              options={{
                layout: "accordion",
                fields: {
                  billingDetails: {
                    address: "auto",
                    email: "auto",
                  },
                },
              }}
            />
          </div>
          <div className="art_foot sticky px-3 bottom-0 w-[100%] flex gap-2 items-center justify-center">
            <button
              className={classNames(
                "min-h-[35px] py-2 px-3 rounded-[10px] font-medium flex-1 bg-[#307BD1] text-white",
                {
                  "!bg-slate-400 !text-slate-900 cursor-not-allowed": !stripe || isProcessing,
                }
              )}
              
              type="submit"
              disabled={!stripe}
            >
              {isProcessing?`Processing...`:`Subscribe`}
            </button>
          </div>
      </form>
  );
}
