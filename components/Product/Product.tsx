import React, { useState } from 'react';
import Image from 'next/image';
import clsx from "classnames";
import { declinationOFNumber, formatPriceRu } from "utils";

import { Card } from "../Card/Card";
import { Rating } from "../Rating/Rating";
import { Tag } from "../Tag/Tag";
import { Button } from "../Button/Button";
import { Divider } from "../Divider/Divider";
import { Review } from "../Review/Review";
import { ReviewForm } from "../ReviewForm/ReviewForm";
import { ProductProps } from './Product.props';
import styles from './Product.module.css';

export const Product: React.FC<ProductProps> = ({
  product,
  className,
}): JSX.Element => {
  const [isReviewsOpened, setIsReviewsOpened] = useState(true);
  const toggleReviews = () => setIsReviewsOpened(!isReviewsOpened);

  return (
    <>
      <Card className={clsx(styles.product, className)}>
        <div className={styles.logo}>
          <Image
            src={`${process.env.NEXT_PUBLIC_DOMAIN}${product.image}`}
            alt={product.title}
            width={70}
            height={70}
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
        <div className={styles.reviewCount}>
          {product.reviewCount}{' '}
          {declinationOFNumber(product.reviewCount, ['отзыв', 'отзыва', 'отзывов'])}
        </div>

        <Divider className={styles.hr} />
        <div className={styles.description}>{product.description}</div>

        <div className={styles.feature}>
          {product.characteristics.map((c) => {
            return (
              <div className={styles.characteristics} key={c.name}>
                <span className={styles.characteristicsName}>{c.name}</span>
                <span className={styles.characteristicsDots} />
                <span className={styles.characteristicsValue}>{c.value}</span>
              </div>
            );
          })}
        </div>
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

        <Divider className={clsx(styles.hr, styles.hr2)} />
        <div className={styles.actions}>
          <Button>Узнать подробнее</Button>
          <Button
            appearance="ghost"
            arrow={isReviewsOpened ? 'down' : 'right'}
            onClick={toggleReviews}
            className={styles.reviewBtn}
          >
            Читать отзывы
          </Button>
        </div>
      </Card>
      <Card
        color="blue"
        className={clsx(styles.reviews, {
          [styles.opened]: isReviewsOpened,
          [styles.closed]: !isReviewsOpened,
        })}
      >
        {product.reviews.map((r) => (
          <React.Fragment key={r._id}>
            <Review review={r} />
            <Divider />
          </React.Fragment>
        ))}
        <ReviewForm productId={product._id} />
      </Card>
    </>
  );
};
