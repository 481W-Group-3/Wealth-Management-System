import React from 'react';

const Spinner = () => {
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="flex space-x-2">
        <div className="h-4 w-4 bg-blue-500 rounded-full animate-bounce"></div>
        <div className="h-4 w-4 bg-blue-500 rounded-full animate-bounce200"></div>
        <div className="h-4 w-4 bg-blue-500 rounded-full animate-bounce400"></div>
      </div>
    </div>
  );
};

export default Spinner;