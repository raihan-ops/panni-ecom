'use client';
import React from 'react';
import { Input, Slider } from 'antd';
import { useEffect, useState } from 'react';

const RangeFilterWithInputBox = ({ min, max, value, onChange, title }) => {
  const [inputValues, setInputValues] = useState(value);

  useEffect(() => {
    setInputValues(value);
  }, [value]);

  const handleInputChange = (index, newValue) => {
    const parsedValue = parseInt(newValue, 10);
    if (isNaN(parsedValue)) return;

    const newValues = [...inputValues];
    newValues[index] = parsedValue;

    // Allow values within the range and ensure the lower value doesn't exceed the higher value
    if (newValues[0] >= min && newValues[1] <= max && newValues[0] <= newValues[1]) {
      setInputValues(newValues);
      onChange(newValues);
    }
  };

  const handleSliderChange = (newValues) => {
    setInputValues(newValues);
    onChange(newValues);
  };

  return (
    <div className="bg-white shadow-md p-4 rounded-xl">
      <h3 className="font-semibold mb-2">{title}</h3>
      <div className="flex justify-center items-center gap-2 mb-4">
        <Input
          type="number"
          value={inputValues[0]}
          onChange={(e) => handleInputChange(0, e.target.value)}
          min={min}
          max={inputValues[1]}
        />
        <span className="text-xs">To</span>
        <Input
          type="number"
          value={inputValues[1]}
          onChange={(e) => handleInputChange(1, e.target.value)}
          min={inputValues[0]}
          max={max}
        />
      </div>
      <Slider range min={min} max={max} value={inputValues} onChange={handleSliderChange} />
      <div className="flex justify-between mt-2">
        <span>৳ {inputValues[0]}</span>
        <span>৳ {inputValues[1]}</span>
      </div>
    </div>
  );
};

export default RangeFilterWithInputBox;
