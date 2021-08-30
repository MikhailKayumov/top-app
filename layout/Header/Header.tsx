import React, { useEffect, useState } from 'react';
import clsx from "classnames";
import { useRouter } from 'next/router';
import { motion } from 'framer-motion';

import { ButtonIcon } from "components";

import { HeaderProps } from './Header.props';
import styles from './Header.module.css';
import Logo from '../logo.svg';
import { Sidebar } from "../Sidebar/Sidebar";

const variants = {
  opened: {
    opacity: 1,
    x: 0,
    transition: {
      stiffness: 20
    }
  },
  closed: {
    opacity: 0,
    x: '100%',
    transition: {
      stiffness: 30
    }
  }
};

export const Header: React.FC<HeaderProps> = ({
  className,
  ...props
}): JSX.Element => {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    document.body.style.overflowY = isOpen ? 'hidden' : 'auto';
  }, [isOpen]);
  useEffect(() => {
    setIsOpen(false);
  }, [router]);

  return (
    <header
      className={clsx(styles.header, className)}
      {...props}
    >
      <Logo />
      <ButtonIcon
        icon="menu"
        appearance="white"
        onClick={() => setIsOpen(true)}
      />
      <motion.div
        variants={variants}
        initial={'closed'}
        animate={isOpen ? 'opened' : 'closed'}
        className={styles.mobileMenu}
      >
        <Sidebar />
        <ButtonIcon
          icon="close"
          appearance="white"
          className={styles.menuClose}
          onClick={() => setIsOpen(false)}
        />
      </motion.div>
    </header>
  );
};
