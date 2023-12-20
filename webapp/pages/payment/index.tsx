import { Elements } from "@stripe/react-stripe-js";
import { Stripe, StripeElementsOptions, loadStripe } from "@stripe/stripe-js";
import React, { useEffect } from "react";
import CheckoutForm from "../../components/payment/CheckoutForm";
import Loader from "@components/Loader";

export default function Payment({
  title = "Upgrade to Promium",
}: {
  title?: string;
}) {

  const [stripePromise, setStripePromise] =
    React.useState<Promise<Stripe | null> | null>(null);
  const [clientSecret, setClientSecret] = React.useState<string | null>(null);

  useEffect(() => {
    // fetch pub key
    fetch(process.env.NEXT_PUBLIC_PAYMENT_API_URL + "/config")
      .then((res) => res.json())
      .then((data) => {
        setStripePromise(loadStripe(data["STRIPE_PUB_KEY"]));
      })
      .catch((err) => {
        console.error(err);
      })

    // fetch client secret
    fetch(process.env.NEXT_PUBLIC_PAYMENT_API_URL + "/create-sub-intent", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer token`,
      },
      body: JSON.stringify({
        email: "nehemiezikama@gmail.com",
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        setClientSecret(data["clientSecret"]);
      })
      .catch((err) => {
        console.error(err);
      })
  }, []);

  const options: StripeElementsOptions | undefined = {
    // passing the client secret obtained from the server
    clientSecret: clientSecret as string,
  };

  return (
    <>
      {stripePromise && clientSecret ? (
        <Elements
          stripe={stripePromise}
          options={{
            clientSecret: options?.clientSecret,
          }}
        >
          <CheckoutForm title={title} />
        </Elements>
      ) : (
        <div className="art_modal container w-full h-full flex justify-center items-center">
           <Loader />
        </div>
      )}
    </>
  );
}
