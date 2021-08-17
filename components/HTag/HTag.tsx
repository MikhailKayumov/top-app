import React from 'react';
import clsx from "classnames";

import { HTagProps } from "./HTag.props";
import styles from './HTag.module.css';

export const HTag: React.FC<HTagProps> = ({
  tag,
  children,
  className,
  ...props
}): JSX.Element | null => {
  switch (tag) {
    case 'h1':
      return <h1 className={clsx(styles.h1, className)} {...props}>{children}</h1>;
    case 'h2':
      return <h2 className={clsx(styles.h2, className)} {...props}>{children}</h2>;
    case 'h3':
      return <h3 className={clsx(styles.h3, className)} {...props}>{children}</h3>;
    default:
      return null;
  }
};
