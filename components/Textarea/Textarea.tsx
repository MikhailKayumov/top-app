import React from 'react';
import clsx from "classnames";

import { TextareaProps } from "./Textarea.props";
import styles from './Textarea.module.css';

export const Textarea: React.FC<TextareaProps> = ({ className, ...props }): JSX.Element => {
  return <textarea className={clsx(styles.textarea, className)} {...props} />;
};
