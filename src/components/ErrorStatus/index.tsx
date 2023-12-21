import React from "react";

export const ErrorStatus: React.FC = () => {
  // ================== VIEWS
  return (
    <div className="min-h-screen sm:bg-gray-100 sm:pb-12 sm:pt-36 justify-center">
      <div className="relative min-h-full min-width max-w-screen md:max-w-2xl mx-5 md:m-auto sm:p-10 bg-white sm:shadow-lg sm:rounded-3xl">
        <div className="gap-5 flex flex-col h-96 justify-center">
          <div className="flex flex-col gap-2">
            <h1 className="text-sm  sm:text-lg text-color-sky font-bold">
              404
            </h1>
            <p className="text-2xl sm:text-3xl font-bold">Page not found</p>
            <p className="text-sm sm:text-lg">
              Sorry, something went wrong, please try again later.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ErrorStatus;
