import React, { useEffect } from 'react';

import UpArrowIcon from './upArrow.svg';
import styles from './Up.module.css';
import { useScrollY } from "hooks/useScrollY";
import { motion, useAnimation } from 'framer-motion';

function scrollToTop() {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
}

export const Up: React.FC = (): JSX.Element => {
  const controls = useAnimation();
  const y = useScrollY();

  useEffect(() => {
    controls.start({
      opacity: Math.min((y * 10) / document.body.scrollHeight, 1)
    });
  }, [y, controls]);

  return (
    <motion.button
      className={styles.up}
      onClick={scrollToTop}
      animate={controls}
      initial={{ opacity: 0 }}
    >
      <UpArrowIcon />
    </motion.button>
  );
};
