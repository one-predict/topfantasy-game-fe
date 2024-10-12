import React from 'react';
import clsx from 'clsx';
import ButtonLoader from './ButtonLoader';
import styles from './Button.module.scss';

export interface ButtonProps {
  className?: string;
  children?: React.ReactNode;
  disabled?: boolean;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  loading?: boolean;
  darkLoader?: boolean;
}

const Button = ({ children, disabled, className, onClick, loading }: ButtonProps) => {
  const handleButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    if (loading || disabled) {
      return;
    }

    onClick?.(event);
  };

  return (
    <button
      className={clsx(
        styles.button,
        {
          [styles.loadingButton]: loading,
        },
        className,
      )}
      onClick={handleButtonClick}
      disabled={disabled}
    >
      <span>{loading ? <ButtonLoader dark /> : children}</span>
    </button>
  );
};

export default Button;
