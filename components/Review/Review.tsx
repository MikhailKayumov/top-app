import React from 'react';
import clsx from "classnames";
import format from "date-fns/format";
import ru from "date-fns/locale/ru";

import { Rating } from "../Rating/Rating";
import { ReviewProps } from "./Review.props";
import styles from './Review.module.css';
import UserIcon from './user.svg';

export const Review: React.FC<ReviewProps> = ({
  review,
  className,
  ...props
}): JSX.Element => {
  return (
    <div
      className={clsx(styles.review, className)}
      {...props}
    >
      <UserIcon className={styles.userIcon} />
      <div className={styles.title}>
        <span className={styles.userName}>{review.name}:</span>
        <span>{review.title}</span>
      </div>
      <div className={styles.date}>
        {format(new Date(review.createdAt), 'dd MMMM yyyy', { locale: ru })}
      </div>
      <div className={styles.rating}>
        <Rating rating={review.rating} />
      </div>
      <div className={styles.description}>{review.description}</div>
    </div>
  );
};
