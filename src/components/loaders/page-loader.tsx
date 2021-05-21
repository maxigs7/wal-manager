import React from 'react';

export const PageLoader: React.FC = React.memo(() => (
  <div className=" w-full h-full fixed top-0 left-0 bg-white opacity-75 z-50">
    <div className="flex justify-center items-center w-full h-full ">
      <div
        className="animate-spin ease-linear rounded-full border-4 border-t-4 border-gray-200 h-12 w-12 mb-4"
        style={{ borderTopColor: 'rgba(79, 70, 229)' }}
      ></div>
    </div>
  </div>
));
