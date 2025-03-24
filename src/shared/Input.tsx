// Code: Input component
import React from 'react';

interface InputProps {
  disabled?: boolean;
  type?: string;
  value?: string;
  defaultValue?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const Input: React.FC<InputProps> = ({ disabled, type,  defaultValue, onChange}) => {
  return (
    <input
      disabled={disabled}
			type={type}
      defaultValue={defaultValue}
      onChange={onChange}
      className="w-full h-10 bg-netural_100 placeholder:text-gray text-primary_100 text-base font-bold border border-primary_300 rounded-md pr-3 pl-3 text-base transition duration-300 ease focus:outline-none focus:border-primary_100 hover:border-primary_100"
    />
  );
};

export default Input;