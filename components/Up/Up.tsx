import React, { useEffect } from 'react';

import styles from './Up.module.css';
import { useScrollY } from "hooks/useScrollY";
import { motion, useAnimation } from 'framer-motion';
import { ButtonIcon } from "../ButtonIcon/ButtonIcon";

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
      opacity: Math.min((y * 10) / document.body.scrollHeight, 1),
      bottom: y + window.innerHeight + 70 > document.body.scrollHeight ?
        100 - (document.body.scrollHeight - y - window.innerHeight) :
        30
    });

  }, [y, controls]);

  return (
    <motion.div
      className={styles.up}
      animate={controls}
      initial={{ opacity: 0 }}
    >
      <ButtonIcon icon="up" onClick={scrollToTop} />
    </motion.div>
  );
};
