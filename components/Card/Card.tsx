import React, { RefAttributes } from 'react';
import clsx from "classnames";

import { CardProps } from "./Card.props";
import styles from './Card.module.css';

export const Card: React.ForwardRefExoticComponent<
  React.PropsWithRef<CardProps> &
  RefAttributes<HTMLDivElement>
> = React.forwardRef(
  ({
    color = 'white',
    children,
    className,
    ...props
  }, ref): JSX.Element => {
    return (
      <div
        ref={ref}
        className={clsx(styles.card, {
          [styles.blue]: color === 'blue'
        }, className)}
        {...props}
      >
        {children}
      </div>
    );
  }
);
