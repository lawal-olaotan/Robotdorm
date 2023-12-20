import React, { Fragment } from "react";

declare global {
  namespace JSX {
    interface IntrinsicElements {
      "stripe-pricing-table": React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement>,
        HTMLElement
      >;
    }
  }
}

export default function Subscribe() {
  return (
    <Fragment>
      <stripe-pricing-table
        className="w-full"
        pricing-table-id="prctbl_1NSNO6BHzruAoDteiDAjtD5o"
        publishable-key="pk_live_51McD7NBHzruAoDtegTXjhLbD9Sb3H4yzGqdpduss6nZCbSBInlIJJIUg63BNG1tkgy4dR5415jHDktc9IHCqXtUj00azZvy6cc"
      ></stripe-pricing-table>
    </Fragment>
  );
}
