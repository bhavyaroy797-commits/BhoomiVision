import React from 'react';

export const Card = ({ children, className = '', ...props }) => {
  return (
    <div
      className={`bg-white rounded-2xl border border-emerald-900/10 shadow-sm p-6 ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};

export default Card;
