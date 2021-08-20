import React from 'react';
import clsx from "classnames";
import { formatPriceRu } from "utils";

import { Card } from "../Card/Card";
import { ProductProps } from './Product.props';
import styles from './Product.module.css';
import { Rating } from "../Rating/Rating";
import { Tag } from "../Tag/Tag";
import { Button } from "../Button/Button";
import { Divider } from "../Divider/Divider";

export const Product: React.FC<ProductProps> = ({
  product,
  className,
}): JSX.Element => {
  return (
    <Card className={clsx(styles.product, className)}>
      <div className={styles.logo}>
        <img
          src={`${process.env.NEXT_PUBLIC_DOMAIN}${product.image}`}
          alt={product.title}
        />
      </div>

      <div className={styles.title}>{product.title}</div>
      <div className={styles.price}>
        {formatPriceRu(product.price)}
        {!!product.oldPrice && (
          <Tag color={"green"} size="s">
            {formatPriceRu(product.price - product.oldPrice)}
          </Tag>
        )}
      </div>
      <div className={styles.credit}>
        {formatPriceRu(product.credit)}
        <span className={styles.month}>/мес</span>
      </div>
      <div className={styles.rating}>
        <Rating rating={product.reviewAvg ?? product.initialRating} />
      </div>

      <div className={styles.tags}>
        {product.categories.map((c) => (
          <Tag key={c} className={styles.category}>{c}</Tag>
        ))}
      </div>
      <div className={styles.priceTitle}>цена</div>
      <div className={styles.creditTitle}>в кредит</div>
      <div className={styles.reviewCount}>{product.reviewCount} отзывов</div>

      <Divider className={styles.hr} />
      <div className={styles.description}>{product.description}</div>

      <div className={styles.feature}>features</div>
      <div className={styles.advBlock}>
        {!!product?.advantages && (
          <div className={styles.advantages}>
            <div className={styles.advTitle}>Преимущества</div>
            <div>{product.advantages}</div>
          </div>
        )}
        {!!product?.disadvantages && (
          <div className={styles.disadvantages}>
            <div className={styles.advTitle}>Преимущества</div>
            <div>{product.disadvantages}</div>
          </div>
        )}
      </div>

      <Divider className={styles.hr} />
      <div className={styles.actions}>
        <Button>Узнать подробнее</Button>
        <Button appearance="ghost" arrow="right" className={styles.reviewBtn}>
          Читать отзывы
        </Button>
      </div>
    </Card>
  );
};
