import Link from 'next/link';
import React from 'react';

const Breadcrumb = ({ title, pages }) => {
  return (
    <div className="overflow-hidden shadow-breadcrumb">
      <div className="">
        <div className="w-full mx-auto px-4 sm:px-8 xl:px-0 py-2">
          <ul className="flex items-center gap-2">
            <li className="text-sm text-black hover:text-blue-500">
              <Link href="/">Home /</Link>
            </li>

            {pages.length > 0 &&
              pages.map((page, key) => (
                <li className="text-sm last:text-blue capitalize" key={key}>
                  {page}
                </li>
              ))}
          </ul>

          {/* <h1 className="font-semibold text-black text-xl sm:text-2xl xl:text-custom-2 mt-8">
            {title}
          </h1> */}
        </div>
      </div>
    </div>
  );
};

export default Breadcrumb;
