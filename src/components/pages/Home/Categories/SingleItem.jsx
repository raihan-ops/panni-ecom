import React from 'react';
import Image from 'next/image';

const SingleItem = ({ item }) => {
  return (
    <a href="#" className="group flex flex-col items-center">
      <div className="w-40 h-40 overflow-hidden bg-[#F2F3F8]  rounded-full flex items-center justify-center mb-4 smallCategories">
        {item.image ? (
          <Image
            src={item.image}
            alt={item.name || 'Category'}
            width={100}
            height={100}
            className="w-full h-full  rounded-full"
          />
        ) : (
          <Image
            src="https://media.istockphoto.com/id/1147544807/vector/thumbnail-image-vector-graphic.jpg?s=612x612&w=0&k=20&c=rnCKVbdxqkjlcs3xH87-9gocETqpspHFXu5dIGB4wuM=" // Replace with a real fallback image path
            alt="Fallback Category"
            width={100}
            height={100}
            className="w-full h-full  rounded-full"
          />
        )}
      </div>

      <div className="flex justify-center">
        <h3 className="inline-block font-medium text-center text-dark bg-gradient-to-r from-blue to-blue bg-[length:0px_1px] bg-left-bottom bg-no-repeat transition-[background-size] duration-500 hover:bg-[length:100%_3px] group-hover:bg-[length:100%_1px] group-hover:text-blue">
          {item.name || 'Unknown Category'}
        </h3>
      </div>
    </a>
  );
};

export default SingleItem;
