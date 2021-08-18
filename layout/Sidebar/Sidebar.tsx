import React from 'react';

import { SidebarProps } from "./Sidebar.props";
import styles from './Sidebar.module.css';

export const Sidebar: React.FC<SidebarProps> = (props): JSX.Element => {
  return (
    <div {...props}>Sidebar</div>
  );
};
