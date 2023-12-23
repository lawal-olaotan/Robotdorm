import React from "react";

export default function Loader() {
  return (
    <div className="relative">
      <div className="h-[35px] w-[35px] border-4 border-t-4 border-gray-300 border-solid rounded-full absolute"></div>
      <div className="h-[35px] w-[35px] border-4 border-l-0 border-t-0 border-gray-900 border-solid rounded-full animate-spin "></div>
    </div>
  );
}
