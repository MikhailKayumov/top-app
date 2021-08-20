import React from 'react';
import { HHData, HTag, Tag } from "components";

import { TopPageComponentProps } from "./TopPageComponent.props";
import styles from './TopPageComponent.module.css';
import { TopLevelCategory } from "../../interfaces/page.interface";

export const TopPageComponent: React.FC<TopPageComponentProps> = ({
  page,
  products,
  firstCategory
}): JSX.Element => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.title}>
        <HTag tag="h1">{page.title}</HTag>
        {products && <Tag color="grey" size="m">{products.length}</Tag>}
        <span>sort</span>
      </div>
      <div>
        {products.map((p) => {
          return (
            <div key={p._id}>{p.title}</div>
          );
        })}
      </div>
      <div className={styles.HHTitle}>
        <HTag tag="h2">Вакансии - {page.category}</HTag>
        <Tag color="red" size="m">hh.ru</Tag>
      </div>
      {firstCategory === TopLevelCategory.Courses && <HHData {...page.hh} />}
    </div>
  );
};
