import React from 'react';

import { HTag } from "../HTag/HTag";
import { AdvantagesProps } from "./Advantages.props";
import styles from './Advantages.module.css';
import CheckIcon from './check.svg';

export const Advantages: React.FC<AdvantagesProps> = ({ advantages }): JSX.Element => {
  return (
    <>
      <HTag tag="h2">Преимущества</HTag>
      <>
        {advantages.map((a) => {
          return (
            <div key={a._id} className={styles.advantage} >
              <CheckIcon />
              <div className={styles.title}>
                {a.title}
              </div>
              {!!a.description && (<>
                <hr className={styles.vLine} />
                <div className={styles.description}>{a.description}</div>
              </>)}
            </div>
          );
        })}
      </>
    </>
  );
};
