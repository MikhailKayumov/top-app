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
      <div className={styles.sortName} id="sort">Сортировка</div>
      <span
        id="rating"
        onClick={selectSort}
        onKeyDown={selectSort}
        className={clsx({ [styles.active]: sort === SortingKind.Rating })}
        data-sortingkind={SortingKind.Rating}
        tabIndex={0}
        role="button"
        aria-selected={sort === SortingKind.Rating}
        aria-labelledby="sort rating"
      >
        <SortIcon className={styles.sortIcon} />
        По рейтингу
      </span>
      <span
        id="price"
        onClick={selectSort}
        onKeyDown={selectSort}
        className={clsx({ [styles.active]: sort === SortingKind.Price })}
        data-sortingkind={SortingKind.Price}
        tabIndex={0}
        role="button"
        aria-selected={sort === SortingKind.Price}
        aria-labelledby="sort price"
      >
        <SortIcon className={styles.sortIcon} />
        По цене
      </span>
    </div>
  );
};
