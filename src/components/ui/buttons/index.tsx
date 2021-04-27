import React from 'react';
import classnames from 'classnames';
import { ButtonSizes, Colors } from 'utils/tailwind-constants';

export interface ButtonProps {
  size?: ButtonSizes;
  color?: Colors;
  rounded?: boolean;
  outlined?: boolean;
}

const Button: React.FC<
  ButtonProps & React.ButtonHTMLAttributes<HTMLButtonElement>
> = ({
  size = ButtonSizes.Small,
  color: bgColor = 'lightBlue',
  rounded = false,
  outlined = false,
  className,
  children,
  ...htmlAttributes
}) => {
  const commonClasses = [
    'outline-none',
    'focus:outline-none',
    'uppercase',
    'font-bold',
    'ease-linear',
    'transition-all',
    'duration-150',
    'inline-flex',
    'items-center',
    'justify-center',
    rounded && 'rounded-full',
    !rounded && 'rounded',
  ];
  const sizeClasses = [
    size === ButtonSizes.Small && `px-4 py-2`,
    size === ButtonSizes.Regular && `px-6 py-3`,
    size === ButtonSizes.Large && `px-8 py-3`,
    `text-${size}`,
  ];

  let btnClasses = [];

  if (outlined) {
    btnClasses = [
      'bg-transparent',
      'border',
      'border-solid',
      `border-${bgColor}-500`,
      `hover:bg-${bgColor}-500`,
      `active:bg-${bgColor}-600`,
      'hover:text-white',
      `text-${bgColor}-500`,
    ];
  } else {
    btnClasses = [
      'shadow hover:shadow-md',
      bgColor === 'white' && 'bg-white',
      bgColor === 'black' && 'bg-black',
      (bgColor === 'white' || bgColor === 'black') && 'active:bg-gray-300',
      bgColor !== 'white' && bgColor !== 'black' && `bg-${bgColor}-500`,
      bgColor !== 'white' && bgColor !== 'black' && `active:bg-${bgColor}-600`,
      bgColor !== 'white' && 'text-white',
      bgColor === 'white' && 'text-blueGray',
    ];
  }

  return (
    <button
      className={classnames(className, commonClasses, sizeClasses, btnClasses)}
      {...htmlAttributes}
    >
      {children}
    </button>
  );
};

export default Button;
