import React, { useEffect, useReducer } from 'react';
import { useReducedMotion } from "framer-motion";
import { Advantages, HHData, HTag, Product, Sort, Tag } from "components";
import { SortingKind } from "components/Sort/Sort.props";
import { TopLevelCategory } from "interfaces/page.interface";

import { TopPageComponentProps } from "./TopPageComponent.props";
import { sortReducer } from "./sort.reducer";
import styles from './TopPageComponent.module.css';

export const TopPageComponent: React.FC<TopPageComponentProps> = ({
  page,
  products,
  firstCategory
}): JSX.Element => {
  const [{ products: sortedProducts, sort }, dispatcher] = useReducer(sortReducer, {
    products: [],
    sort: SortingKind.Rating
  });
  const shouldReduceMotion = useReducedMotion();
  const setSort = (sortingKind: SortingKind) => {
    dispatcher({ type: sortingKind });
  };

  useEffect(() => {
    dispatcher({ type: 'SET_PRODUCTS', products });
  }, [products]);

  return (
    <>
      <div className={styles.title}>
        <HTag tag="h1">{page.title}</HTag>
        <Tag
          color="grey"
          size="m"
          aria-label={`${products.length} элементов`}
        >
          {sortedProducts.length}
        </Tag>
        <Sort sort={sort} setSort={setSort}/>
      </div>
      <div role="list">
        {sortedProducts.map((p) => (
          <Product key={p._id} product={p} layout={!shouldReduceMotion} />
        ))}
      </div>
      <div className={styles.HHTitle}>
        <HTag tag="h2">Вакансии - {page.category}</HTag>
        <Tag color="red" size="m">hh.ru</Tag>
      </div>
      {firstCategory === TopLevelCategory.Courses && page.hh && <HHData {...page.hh} />}
      {page.advantages && !!page.advantages.length && <Advantages advantages={page.advantages} />}
      {page.seoText && <div className={styles.seo} dangerouslySetInnerHTML={{ __html: page.seoText }} />}
      <HTag tag="h2">Получаемые навыки</HTag>
      {page.tags.map((t) => (
        <Tag color="primary" className={styles.achievements} key={t}>{t}</Tag>
      ))}
    </>
  );
};
