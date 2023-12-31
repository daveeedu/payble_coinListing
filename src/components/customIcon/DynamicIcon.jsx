import React from 'react';

export const DynamicIcon = ({ percentage, threshold, greenIcon, redIcon }) => {
  const isGreen = percentage >= threshold;

  return (
    <div className="flex justify-end items-center">
      {isGreen ? greenIcon : redIcon}
      <span className='ml-1'>{percentage || 0}%</span>
    </div>
  );
};