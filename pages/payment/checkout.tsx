import StripeCheckout from "@components/payment/StripeCheckout";
import Head from "next/head";
import React from "react";

export default function Checkout() {
  return (
    <>
      <Head>
        <script async src="https://js.stripe.com/v3/pricing-table.js"></script>
      </Head>
      <StripeCheckout />
    </>
  );
}
