import React from 'react';

import { SidebarProps } from "./Sidebar.props";

import styles from './Sidebar.module.css';

import { Menu } from '../Menu/Menu';

export const Sidebar: React.FC<SidebarProps> = (props): JSX.Element => {
  return (
    <div {...props}>
      <Menu />
    </div>
  );
};
