import React from 'react';
import clsx from "classnames";

import { TagProps } from "./Tag.props";
import styles from './Tag.module.css';

export const Tag: React.FC<TagProps> = ({
  size = 'm',
  color = 'ghost',
  href,
  children,
  className,
  ...props
}): JSX.Element => {
  const classes = clsx(styles.tag, {
    [styles.small]: size === 's',
    [styles.medium]: size === 'm',
    [styles.ghost]: color === 'ghost',
    [styles.red]: color === 'red',
    [styles.grey]: color === 'grey',
    [styles.green]: color === 'green',
    [styles.primary]: color === 'primary',
  }, className);

  const content = href ? <a>{children}</a> : children;

  return (
    <div className={classes} {...props}>
      {content}
    </div>
  );
};
