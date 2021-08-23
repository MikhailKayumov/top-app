import React from 'react';
import clsx from "classnames";

import { Input } from "../Input/Input";
import { Rating } from "../Rating/Rating";
import { Textarea } from "../Textarea/Textarea";
import { Button } from "../Button/Button";
import { ReviewFormProps } from "./ReviewForm.props";
import styles from './ReviewForm.module.css';
import TimesIcon from './times.svg';

export const ReviewForm: React.FC<ReviewFormProps> = ({
  productId,
  className,
  ...props
}): JSX.Element => {
  return (
    <>
      <div
        className={clsx(styles.review, className)}
        {...props}
      >
        <Input placeholder="Имя" />
        <Input placeholder="Заголовок отзыва" className={styles.title} />
        <div className={styles.rating}>
          <span>Оценка:</span>
          <Rating className={styles.formRating} rating={0} />
        </div>
        <Textarea placeholder="Текст отзыва" className={styles.description} />
        <div className={styles.submit}>
          <Button>Отправить</Button>
          <span className={styles.info}>* Перед публикацией отзыв пройдет предварительную модерацию и проверку</span>
        </div>
      </div>
      <div className={styles.success}>
        <div className={styles.successTitle}>Ваш отзыв отправлен</div>
        <div className={styles.successDescription}>
          Спасибо, ваш отзыв будет опубликован после проверки
        </div>
        <TimesIcon className={styles.close} />
      </div>
    </>
  );
};
