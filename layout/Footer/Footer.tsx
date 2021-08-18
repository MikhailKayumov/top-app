import React from 'react';
import clsx from "classnames";
import format from 'date-fns/format';

import { FooterProps } from './Footer.props';
import styles from './Footer.module.css';

export const Footer: React.FC<FooterProps> = ({ className, ...props }): JSX.Element => {
  return (
    <footer className={clsx(styles.footer, className)} {...props}>
      <div>
        MyTop © 2020 - {format(new Date, 'yyyy')} Все права защищены
      </div>
      <a href="#" target="_blank">
        Пользовательское соглашение
      </a>
      <a href="#" target="_blank">
        Политика конфиденциальности
      </a>
    </footer>
  );
};
