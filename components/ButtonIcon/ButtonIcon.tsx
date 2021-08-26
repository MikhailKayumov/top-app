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
  const classes = clsx(styles.button, {
    [styles.primary]: appearance === 'primary',
    [styles.white]: appearance === 'white',
  }, className);

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
