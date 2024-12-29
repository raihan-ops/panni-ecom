import React from 'react';
import Image from 'next/image';

const SingleItem = ({ item }) => {
  return (
    <a href="#" className="group flex flex-col items-center">
      <div className="w-40 h-40 overflow-hidden bg-[#F2F3F8] h-32.5 rounded-full flex items-center justify-center mb-4">
        <Image src={item.img} alt="Category" className="w-full h-full p-8" />
      </div>

      <div className="flex justify-center">
        <h3 className="inline-block font-medium text-center text-dark bg-gradient-to-r from-blue to-blue bg-[length:0px_1px] bg-left-bottom bg-no-repeat transition-[background-size] duration-500 hover:bg-[length:100%_3px] group-hover:bg-[length:100%_1px] group-hover:text-blue">
          {item.title}
        </h3>
      </div>
    </a>
  );
};

export default SingleItem;
