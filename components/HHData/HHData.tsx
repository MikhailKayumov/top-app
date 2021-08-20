import React from 'react';

import { Card } from "../Card/Card";
import { HHDataProps } from "./HHData.props";
import styles from './HHData.module.css';
import StarIcon from './star.svg';
import { formatPriceRu } from "../../utils";

export const HHData: React.FC<HHDataProps> = ({
  count,
  juniorSalary,
  middleSalary,
  seniorSalary
}): JSX.Element => {
  return (
    <div className={styles.hh}>
      <Card className={styles.count}>
        <div className={styles.title}>Всего вакансий</div>
        <div className={styles.countValue}>
          {formatPriceRu(count, 0, false)}
        </div>
      </Card>
      <Card className={styles.salary}>
        <div>
          <div className={styles.title}>Начальный</div>
          <div className={styles.salaryValue}>
            {formatPriceRu(juniorSalary)}
          </div>
          <div className={styles.rate}>
            <StarIcon className={styles.filled} />
            <StarIcon />
            <StarIcon />
          </div>
        </div>
        <div>
          <div className={styles.title}>Средний</div>
          <div className={styles.salaryValue}>
            {formatPriceRu(middleSalary)}
          </div>
          <div className={styles.rate}>
            <StarIcon className={styles.filled} />
            <StarIcon className={styles.filled} />
            <StarIcon />
          </div>
        </div>
        <div>
          <div className={styles.title}>Профессионал</div>
          <div className={styles.salaryValue}>
            {formatPriceRu(seniorSalary)}
          </div>
          <div className={styles.rate}>
            <StarIcon className={styles.filled} />
            <StarIcon className={styles.filled} />
            <StarIcon className={styles.filled} />
          </div>
        </div>
      </Card>
    </div>
  );
};
