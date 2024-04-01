import React from 'react';

const error = () => {
  return (
    <div className="flex justify-center items-center w-full text-red-400 p-4">
      The Payment method you entered is either invalid or something went wrong
      with the payment confirmation. Please try again with a valid one.
    </div>
  );
};

export default error;
