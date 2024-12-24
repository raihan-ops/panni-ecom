// FilterComponents.js
import React, { useEffect, useState } from 'react';
import { Checkbox, Radio, Slider, Rate, Collapse } from 'antd';
import { CaretRightOutlined, MinusOutlined, PlusOutlined } from '@ant-design/icons';
import { Input } from '../input';

export const CheckboxFilter = ({ options, selected, onChange, title }) => (
  <div className="mb-4">
    <h3 className="font-semibold mb-2">{title}</h3>
    {options.map((option) => (
      <div key={option.key} className="mb-2">
        <Checkbox onChange={() => onChange(option.key)} checked={selected.includes(option.key)}>
          {option.label}
        </Checkbox>
        {option.children && (
          <div className="ml-4">
            {option.children.map((child) => (
              <Checkbox
                key={child.key}
                onChange={() => onChange(child.key)}
                checked={selected.includes(child.key)}
              >
                {child.label}
              </Checkbox>
            ))}
          </div>
        )}
      </div>
    ))}
  </div>
);

export const RadioFilter = ({ options, value, onChange, title }) => (
  <div className="mb-4">
    <h3 className="font-semibold mb-2">{title}</h3>
    <Radio.Group value={value} onChange={(e) => onChange(e.target.value)}>
      {options.map((option) => (
        <Radio key={option.value} value={option.value}>
          {option.label}
        </Radio>
      ))}
    </Radio.Group>
  </div>
);

export const RangeFilter = ({ min, max, value, onChange, title }) => (
  <div className="mb-4">
    <h3 className="font-semibold mb-2">{title}</h3>
    <Slider range min={min} max={max} value={value} onChange={onChange} />
    <div className="flex justify-between">
      <span>৳ {value[0]}</span>
      <span>৳ {value[1]}</span>
    </div>
  </div>
);

export const RatingFilter = ({ onChange, value }) => (
  <div className="mb-4">
    <h3 className="font-semibold mb-2">Ratings</h3>
    {[5, 4, 3, 2, 1].map((star) => (
      <Checkbox key={star} onChange={() => onChange(star)} checked={value === star}>
        <Rate disabled defaultValue={star} /> & up
      </Checkbox>
    ))}
  </div>
);

// antd version
// export const BrandFilter = ({
//   brands,
//   selected,
//   onChange,
//   title = 'Brand',
// }) => {
//   const handleChange = (brandName) => {
//     onChange(brandName === selected ? null : brandName);
//   };

//   return (
//     <Collapse
//       bordered={false}
//       defaultActiveKey={['1']}
//       expandIcon={({ isActive }) => (
//         <div className="mt-3">
//           {isActive ? <MinusOutlined /> : <PlusOutlined />}
//         </div>
//       )}
//       className="bg-white shadow-md"
//       expandIconPosition="end"
//       items={[
//         {
//           key: '1',
//           label: <h2 className="text-black font-medium text-lg">{title}</h2>,
//           children: (
//             <>
//               {brands.map((brand) => (
//                 <div
//                   key={brand.name}
//                   style={{
//                     display: 'flex',
//                     justifyContent: 'space-between',
//                     marginBottom: '8px',
//                   }}
//                 >
//                   <Checkbox
//                     checked={selected === brand.name}
//                     onChange={() => handleChange(brand.name)}
//                   >
//                     {brand.name}
//                   </Checkbox>
//                   <span
//                     style={{
//                       color: '#16B38C',
//                       fontSize: '14px',
//                       fontWeight: 700,
//                     }}
//                   >
//                     {brand.count}
//                   </span>
//                 </div>
//               ))}
//             </>
//           ),
//         },
//       ]}
//     />
//   );
// };
