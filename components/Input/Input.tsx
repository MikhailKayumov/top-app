import React from 'react';
import clsx from "classnames";

import { InputProps } from "./Input.props";
import styles from './Input.module.css';

export const Input: React.ForwardRefExoticComponent<
  React.PropsWithoutRef<InputProps> &
  React.RefAttributes<HTMLInputElement>
> = React.forwardRef(
  ({ className, error, ...props }, ref): JSX.Element => {
    return (
      <div className={clsx(styles.inputWrapper, {
        [styles.wrapperError]: error
      }, className)}>
        <input
          ref={ref}
          className={clsx(styles.input, {
            [styles.error]: error
          })}
          {...props}
        />
        {error && <span className={styles.errorMsg}>{error.message}</span>}
      </div>
    );
  }
);
