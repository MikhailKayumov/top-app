import React from 'react';
import { useForm, Controller } from "react-hook-form";
import clsx from "classnames";

import { Input } from "../Input/Input";
import { Rating } from "../Rating/Rating";
import { Textarea } from "../Textarea/Textarea";
import { Button } from "../Button/Button";
import { ReviewFormProps } from "./ReviewForm.props";
import { IReviewForm } from "./ReviewForm.interface";
import styles from './ReviewForm.module.css';
import TimesIcon from './times.svg';

export const ReviewForm: React.FC<ReviewFormProps> = ({
  productId,
  className,
  ...props
}): JSX.Element => {
  const { register, control, handleSubmit, formState: { errors } } = useForm<IReviewForm>();

  const onSubmit = (data: IReviewForm) => {
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div
        className={clsx(styles.review, className)}
        {...props}
      >
        <Input
          placeholder="Имя"
          {...register('name', { required: { value: true, message: 'Заполните имя' } })}
          error={errors.name}
        />
        <Input
          placeholder="Заголовок отзыва"
          className={styles.title}
          error={errors.title}
          {...register('title', { required: { value: true, message: 'Заполните заголовок' } })}
        />
        <div className={styles.rating}>
          <span>Оценка:</span>
          <Controller
            control={control}
            name="rating"
            render={({ field }) => (
              <Rating
                className={styles.formRating}
                rating={+field.value}
                setRating={field.onChange}
                ref={field.ref}
                isEditable
              />
            )}
          />
        </div>
        <Textarea
          placeholder="Текст отзыва"
          className={styles.description}
          error={errors.description}
          {...register('description', { required: { value: true, message: 'Заполните описание' } })}
        />
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
    </form>
  );
};
