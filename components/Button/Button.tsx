import React from 'react';
import clsx from 'classnames';

import { ButtonProps } from "./Button.props";
import styles from './Button.module.css';
import ArrowIcon from './arrow.svg';

export const Button: React.FC<ButtonProps> = ({
  appearance = 'primary',
  arrow = 'none',
  children,
  className,
  ...props
}): JSX.Element => {
  const classes = clsx(styles.button, className, {
    [styles.primary]: appearance === 'primary',
    [styles.ghost]: appearance === 'ghost',
  });
  const arrowClasses = clsx(styles.arrow, {
    [styles.down]: arrow === 'down'
  });

  return (
    <button
      className={classes}
      {...props}
    >
      {children}
      {arrow !== 'none' && (
        <ArrowIcon className={arrowClasses} />
      )}
    </button>
  );
};
