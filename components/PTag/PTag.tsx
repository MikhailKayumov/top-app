import React from 'react';
import clsx from "classnames";

import { PTagProps } from "./PTag.props";
import styles from './PTag.module.css';

export const PTag: React.FC<PTagProps> = ({
  size = 'm',
  children,
  className,
  ...props
}): JSX.Element => {
  const classes = clsx(styles.p, {
    [styles.small]: size === 's',
    [styles.medium]: size === 'm',
    [styles.large]: size === 'l'
  }, className);

  return (
    <p className={classes} {...props}>
      {children}
    </p>
  );
};
