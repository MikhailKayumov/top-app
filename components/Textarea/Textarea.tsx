import React from 'react';
import clsx from "classnames";

import { TextareaProps } from "./Textarea.props";
import styles from './Textarea.module.css';

export const Textarea: React.ForwardRefExoticComponent<
  React.PropsWithoutRef<TextareaProps> &
  React.RefAttributes<HTMLTextAreaElement>
> = React.forwardRef(
  ({
    className,
    error,
    rows = 3,
    ...props
  }, ref): JSX.Element => {
    return (
      <div className={clsx(styles.textareaWrapper, {
        [styles.wrapperError]: error
      }, className)}>
        <textarea
          rows={rows}
          ref={ref}
          className={clsx(styles.textarea, {
            [styles.error]: error
          })}
          {...props}
        />
        {error && <span role="alert" className={styles.errorMsg}>{error.message}</span>}
      </div>
    );
  }
);
