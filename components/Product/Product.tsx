import React, { ForwardedRef, useRef, useState } from 'react';
import Image from 'next/image';
import { CustomDomComponent, motion } from 'framer-motion';
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

const variants = {
  visible: {
    opacity: 1,
    height: 'auto'
  },
  hidden: {
    opacity: 0,
    height: 0
  }
};

export const Product: CustomDomComponent<ProductProps> = motion(React.forwardRef(
  ({
     product,
     className,
     ...props
   }, ref: ForwardedRef<HTMLDivElement>): JSX.Element => {
    const [isReviewsOpened, setIsReviewsOpened] = useState(false);
    const reviewRef = useRef<HTMLDivElement>(null);
    const toggleReviews = () => setIsReviewsOpened(!isReviewsOpened);

    const scrollToReview = () => {
      setIsReviewsOpened(true);
      reviewRef.current?.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    };

    return (
      <div className={className} ref={ref} {...props} >
        <Card className={styles.product}>
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
            <span
              onClick={scrollToReview}
              onKeyDown={(e) => {
                if (e.code === 'Enter') {
                  scrollToReview();
                  reviewRef.current?.focus();
                }
              }}
              tabIndex={0}
            >
              {product.reviewCount}{' '}
              {declinationOFNumber(product.reviewCount, ['отзыв', 'отзыва', 'отзывов'])}
            </span>
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
        <motion.div
          variants={variants}
          initial="hidden"
          animate={isReviewsOpened ? 'visible' : 'hidden'}
        >
          <Card
            color="blue"
            className={styles.reviews}
            ref={reviewRef}
            tabIndex={isReviewsOpened ? 0 : -1}
          >
            {product.reviews.map((r) => (
              <React.Fragment key={r._id}>
                <Review review={r} />
                <Divider />
              </React.Fragment>
            ))}
            <ReviewForm productId={product._id} isOpened={isReviewsOpened} />
          </Card>
        </motion.div>
      </div>
    );
  }
));
