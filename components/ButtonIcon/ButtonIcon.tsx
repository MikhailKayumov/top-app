import React from 'react';
import clsx from 'classnames';

import { ButtonIconProps, icons } from "./ButtonIcon.props";
import styles from './ButtonIcon.module.css';

export const ButtonIcon: React.FC<ButtonIconProps> = ({
  appearance = 'primary',
  icon,
  className,
  ...props
}): JSX.Element => {
  const classes = clsx(styles.button, className, {
    [styles.primary]: appearance === 'primary',
    [styles.white]: appearance === 'white',
  });

  const Icon = icons[icon];

  return (
    <button
      className={classes}
      {...props}
    >
      <Icon />
    </button>
  );
};
