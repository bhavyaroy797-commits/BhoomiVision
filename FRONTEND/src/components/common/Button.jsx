import React from 'react';

export const Button = ({
  children,
  variant = 'primary',
  size = 'md',
  className = '',
  loading = false,
  disabled = false,
  type = 'button',
  onClick,
  ...props
}) => {
  const baseStyles =
    'font-medium rounded-xl transition-all duration-150 flex items-center justify-center gap-2 active:scale-[0.99] disabled:opacity-50 disabled:cursor-not-allowed';

  const variants = {
    primary: 'bg-[#064e3b] hover:bg-[#043e2f] text-white shadow-sm',
    secondary: 'bg-emerald-100 hover:bg-emerald-200 text-emerald-900',
    outline: 'border border-emerald-800/30 hover:border-emerald-800 hover:bg-emerald-50/50 text-[#064e3b]',
    ghost: 'hover:bg-slate-100 text-slate-700',
    danger: 'bg-red-600 hover:bg-red-700 text-white shadow-sm',
  };

  const sizes = {
    sm: 'px-3 py-1.5 text-xs',
    md: 'px-4 py-2.5 text-sm',
    lg: 'px-6 py-3 text-base font-semibold',
  };

  return (
    <button
      type={type}
      disabled={disabled || loading}
      onClick={onClick}
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {loading ? (
        <>
          <span className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin"></span>
          <span>Loading...</span>
        </>
      ) : (
        children
      )}
    </button>
  );
};

export default Button;
