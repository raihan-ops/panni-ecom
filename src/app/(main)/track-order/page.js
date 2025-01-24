import React from 'react';

const LoanRequestPage = () => {
  return (
    <div className="container">
      <div className="w-full mx-auto bg-white flex flex-col justify-center items-center">
        <div className="w-[95%] md:w-[50%] mt-20 shadow-lg rounded-lg p-6">
          <div className="text-start mb-4 w-full">
            <h4 className="text-2xl font-bold text-gray-800">Track Order</h4>
          </div>
          <form action={''} className="w-full">
            <div className="flex items-center w-full gap-2 mt-3">
              <input
                type="text"
                className="flex-grow px-4 w-full py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-b;ack focus:border-black"
                name="passport"
                placeholder="Enter invoice number"
                required
              />
              <button
                type="submit"
                className="px-4 py-2 bg-black text-white rounded-md border transition-all duration-200 hover:text-black hover:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                Track
              </button>
            </div>
          </form>
        </div>
        <div className="mt-10 mb-20 w-95% md:w-[50%]">
          <div className=" w-full flex justify-between">
            <p>Product:</p>
            <p>lorem</p>
          </div>
          <div className=" w-full flex justify-between">
            <p>Quantity:</p>
            <p>5</p>
          </div>
          <div className=" w-full flex justify-between">
            <p>Subtotal:</p>
            <p>15266</p>
          </div>
          <div className=" w-full flex justify-between">
            <p>Discopunt:</p>
            <p>10%</p>
          </div>
          <div className="w-full flex justify-between">
            <p>Total:</p>
            <p>15266</p>
          </div>
          <div className=" w-full flex justify-between">
            <p>Order status:</p>
            <p>pending</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoanRequestPage;
