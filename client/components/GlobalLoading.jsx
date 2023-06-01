import React from "react";

const GlobalLoading = () => {
  return (
    <div class="fixed top-0 left-0 right-0 bottom-0 w-full h-screen z-50 overflow-hidden bg-gray-700 opacity-75 flex flex-col items-center justify-center">
      <div
        class="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
        role="status"
      >
        <span class="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
          Loading...
        </span>
      </div>

      <p class="w-1/3 mt-2 text-center text-white">
        This may take a few seconds, please don't close this page.
      </p>
    </div>
  );
};

export default GlobalLoading;
