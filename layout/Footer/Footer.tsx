import React from 'react';

import { FooterProps } from './Footer.props';
import styles from './Footer.module.css';

export const Footer: React.FC<FooterProps> = (props): JSX.Element => {
  return (
    <div {...props}>Footer</div>
  );
};
