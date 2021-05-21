// const circleCommonClasses = 'h-2 w-2 bg-indigo rounded-full';

export const PageLoader: React.FC = () => (
  <div className=" w-full h-full fixed top-0 left-0 bg-white opacity-75 z-50">
    <div className="flex justify-center items-center w-full h-full ">
      <div
        className="animate-spin ease-linear rounded-full border-4 border-t-4 border-gray-200 h-12 w-12 mb-4"
        style={{ borderTopColor: '#3498db' }}
      ></div>
    </div>
  </div>
);
