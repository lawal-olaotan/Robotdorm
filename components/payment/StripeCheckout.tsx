import Subscribe from "./Subscribe";


export default function StripeCheckout({
  title = "Upgrade to Pro",
}: {
  title?: string;
}) {

  return (
    <div className="art_modal  container mx-auto w-full h-full flex justify-center items-center flex-col">
      {/* <span className="art_layer bg-primary/40 absolute w-full h-full"></span>
      <div className="art_container relative pt-3 container bg-white rounded-[1.5rem] overflow-hidden min-h-[405px] w-[39%]">
        <div className="art_header pt-1 p-3 flex justify-between items-center border-b border-[#E0E0E0]">
          <h2 className="text-2xl text-primary font-medium">{title}</h2>

          <button
            onClick={() => {
              // close the modal
              dispatch(setShowPaymentScreen(false));
            }}
            type="button"
            className="art_close ml-[5%] flex items-center bg-[#EEEFF2] text-[#566378] p-[.65rem] w-[35px] rounded-full cursor-pointer"
          >
            <X className="w-full h-full" />
          </button>
        </div> */}
        {/* <div className="wrapp min-h-[290px] max-h-[475px] overflow-y-auto overflow-x-hidden"> */}
          <Subscribe />
        {/* </div> */}
      {/* </div> */}
    </div>
  );
}
