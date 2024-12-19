import React from 'react';

interface ButtonProps {
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  text?: string| React.ReactNode;
  className?: string;  
}
const Button= ({ onClick, text, className }:ButtonProps) => {
  return (
    <button 
      className={`bg-green-400 hover:bg-green-500 text-white font-bold py-3 px-6 rounded ${className}`} 
      onClick={onClick}
    >
      {text}
    </button>
  );
}

export default Button;
