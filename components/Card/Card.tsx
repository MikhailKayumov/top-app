import React from 'react';
import clsx from "classnames";

import { CardProps } from "./Card.props";
import styles from './Card.module.css';

export const Card: React.FC<CardProps> = ({
  color = 'white',
  children,
  className,
  ...props
}): JSX.Element => {
  return (
    <div
      className={clsx(styles.card, {
        [styles.blue]: color === 'blue'
      }, className)}
      {...props}
    >
      {children}
    </div>
  );
};
