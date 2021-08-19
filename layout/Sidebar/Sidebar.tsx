import React from 'react';
import clsx from "classnames";

import { Menu } from '../Menu/Menu';
import LogoIcon from '../logo.svg';

import { SidebarProps } from "./Sidebar.props";
import styles from './Sidebar.module.css';

export const Sidebar: React.FC<SidebarProps> = ({
  className,
  ...props
}): JSX.Element => {
  return (
    <div {...props} className={clsx(styles.sidebar, className)}>
      <LogoIcon className={styles.logo} />
      <div>search</div>
      <Menu />
    </div>
  );
};
