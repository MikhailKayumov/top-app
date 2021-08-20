import React from 'react';
import clsx from "classnames";

import { DividerProps } from "./Divider.props";
import styles from './Divider.module.css';

export const Divider: React.FC<DividerProps> = ({ className, ...props }): JSX.Element => {
  const classes = clsx(styles.divider, className);

  return (
    <hr className={classes} {...props} />
  );
};
