import React from 'react';
import clsx from "classnames";

import { SortingKind, SortProps } from "./Sort.props";
import styles from './Sort.module.css';
import SortIcon from './sort.svg';

export const Sort: React.FC<SortProps> = ({
  sort,
  setSort,
  className,
  ...props
}): JSX.Element => {

  const selectSort = (event: React.MouseEvent<HTMLSpanElement> | React.KeyboardEvent<HTMLSpanElement>) => {
    if ('key' in event && event.key !== 'Enter') return;
    const target: HTMLSpanElement = event.target as HTMLSpanElement;
    const sortingKind: SortingKind = +(target?.dataset?.sortingkind || 0) as SortingKind;
    if (sortingKind !== sort) setSort(sortingKind);
  };

  return (
    <div className={clsx(styles.sort, className)} {...props}>
      <span
        onClick={selectSort}
        onKeyDown={selectSort}
        className={clsx({ [styles.active]: sort === SortingKind.Rating })}
        data-sortingkind={SortingKind.Rating}
        tabIndex={0}
      >
        <SortIcon className={styles.sortIcon} />
        По рейтингу
      </span>
      <span
        onClick={selectSort}
        onKeyDown={selectSort}
        className={clsx({ [styles.active]: sort === SortingKind.Price })}
        data-sortingkind={SortingKind.Price}
        tabIndex={0}
      >
        <SortIcon className={styles.sortIcon} />
        По цене
      </span>
    </div>
  );
};
