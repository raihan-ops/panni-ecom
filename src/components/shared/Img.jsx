// 'use client';
// import assets from '@/assets/asset';
// import Image from 'next/image';
// import React from 'react';
// import { twMerge } from 'tailwind-merge';

// const Img = ({
//   src,
//   alt,
//   className = '',
//   width = 0,
//   height = 0,
//   layout = 'responsive',
//   objectFit = 'cover',
//   isProfile = false,
//   ...rest
// }) => {
//   const [error, setError] = React.useState(false);
//   const placeholderSrc = isProfile ? '' : assets.ImagePlaceholder;

//   const handleError = () => {
//     setError(true);
//   };

//   return (
//     <div className={twMerge('relative w-full h-auto', className)}>
//       <Image
//         src={error ? placeholderSrc : src}
//         alt={alt}
//         width={width}
//         height={height}
//         layout={layout}
//         objectFit={objectFit}
//         className="rounded-lg"
//         onError={handleError}
//         {...rest}
//       />
//     </div>
//   );
// };

// export default Img;

'use client';
import assets from '@/assets/asset';
import Image from 'next/image';
import React from 'react';
import { twMerge } from 'tailwind-merge';

const Img = ({
  src,
  alt = 'no_alt',
  className = '',
  isProfile = false,
  width,
  height,
  ...rest
}) => {
  const [error, setError] = React.useState(false);
  const placeholderSrc = isProfile ? '' : assets.ImagePlaceholder;

  const handleError = () => {
    setError(true);
  };

  // style: { objectFit: 'cover' }
  const imageProps = width || height ? { width, height } : { fill: true };

  return (
    <div className={twMerge('relative', className)}>
      <Image
        src={error ? placeholderSrc : src}
        alt={alt}
        className={twMerge(' object-cover', className)}
        onError={handleError}
        {...imageProps}
        {...rest}
      />
    </div>
  );
};

export default Img;
