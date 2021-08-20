import React from 'react';
import clsx from "classnames";

import { InputProps } from "./Input.props";
import styles from './Input.module.css';

export const Input: React.FC<InputProps> = ({ className, ...props }): JSX.Element => {
  return <input className={clsx(styles.input, className)} {...props} />;
};
