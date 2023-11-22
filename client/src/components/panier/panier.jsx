import React from 'react';

const Cart = () => {
  return (
    <div className=" py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row -mx-4">
          <div className="md:flex-1 px-4">
            <div className="h-[460px] rounded-lg bg-gray-300 dark:bg-gray-700 mb-4">
              <img
                className="w-full h-full object-cover"
                src="https://cdn.pixabay.com/photo/2020/05/22/17/53/mockup-5206355_960_720.jpg"
                alt="Product Image"
              />
            </div>
            <div className="flex -mx-2 mb-4">
              <div className="w-1/2 px-2">
                <button className="w-full   text-black py-2 px-4 rounded-full font-bold hover:bg-gray-800 dark:hover:bg-gray-700">
                     Commander       
                </button>
              </div>
              <div className="w-1/2 px-2">
                <button className="w-full   text-black  py-2 px-4 rounded-full font-bold  hover:bg-gray-800 dark:hover:bg-gray-700">
                  Supprimer
                </button>
              </div>
            </div>
          </div>
          <div className="md:flex-1 px-4">
            <h2 className="text-2xl font-bold text-black mb-2">Product Name</h2>
            <p className="text-black text-sm mb-4">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sed ante justo. Integer euismod libero id
              mauris malesuada tincidunt.
            </p>
            <div className="flex mb-4">
              <div className="mr-4">
                <span className="font-bold text-black">Price:</span>
                <span className="text-black">$29.99</span>
              </div>
            </div>
            <div className="mb-4">
              <span className="font-bold text-black">Quantity :</span>
              <div className="flex items-center mt-2">
              <button
                className="bg-white rounded-l border text-gray-600 hover:bg-gray-100 active:bg-gray-200 disabled:opacity-50 inline-flex items-center px-2 py-1 border-r border-gray-200">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-4" fill="none" viewBox="0 0 24 24"
                    stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 12H4" />
                </svg>
            </button>
            <div
                className="bg-gray-100 border-t border-b border-gray-100 text-gray-600 hover:bg-gray-100 inline-flex items-center px-4 py-1 select-none">
                2
            </div>
            <button
                className="bg-white rounded-r border text-gray-600 hover:bg-gray-100 active:bg-gray-200 disabled:opacity-50 inline-flex items-center px-2 py-1 border-r border-gray-200">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-4" fill="none" viewBox="0 0 24 24"
                    stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
                </svg>
            </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
