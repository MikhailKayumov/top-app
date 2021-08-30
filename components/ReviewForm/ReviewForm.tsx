import React, { useState } from 'react';
import { useForm, Controller } from "react-hook-form";
import clsx from "classnames";
import axios from 'axios';
import { API } from 'helpers';

import { Input } from "../Input/Input";
import { Rating } from "../Rating/Rating";
import { Textarea } from "../Textarea/Textarea";
import { Button } from "../Button/Button";
import { ReviewFormProps } from "./ReviewForm.props";
import { IReviewForm, IReviewSentResponse } from './ReviewForm.interface';
import styles from './ReviewForm.module.css';
import TimesIcon from './times.svg';

export const ReviewForm: React.FC<ReviewFormProps> = ({
  productId,
  className,
  isOpened,
  ...props
}): JSX.Element => {
  const { register, control, handleSubmit, formState: { errors }, reset, clearErrors } = useForm<IReviewForm>();
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState('');

  const onSubmit = async (formData: IReviewForm) => {
    setIsSuccess(false);
    setError('');

    try {
      const { data } = await axios.post<IReviewSentResponse>(API.review.createDemo, {
        name: formData.name,
        title: formData.title,
        description: formData.description,
        rating: formData.rating || 0,
        productId
      });

      if (data.message) {
        setIsSuccess(true);
        reset();
      } else {
        setError('Что-то пошло не так');
      }
    } catch (e) {
      const msg = e.response.data?.message.join(', ');
      setError(msg || 'Не известная ошибка');
    }
  };
  const onCloseMsg = () => {
    setIsSuccess(false);
    setError('');
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
          tabIndex={isOpened ? 0 : -1}
          aria-invalid={!!errors.name}
        />
        <Input
          placeholder="Заголовок отзыва"
          className={styles.title}
          error={errors.title}
          tabIndex={isOpened ? 0 : -1}
          aria-invalid={!!errors.title}
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
                tabIndex={isOpened ? 0 : -1}
              />
            )}
          />
        </div>
        <Textarea
          placeholder="Текст отзыва"
          className={styles.description}
          error={errors.description}
          tabIndex={isOpened ? 0 : -1}
          aria-label="Текст отзыва"
          aria-invalid={!!errors.description}
          {...register('description', { required: { value: true, message: 'Заполните описание' } })}
        />
        <div className={styles.submit}>
          <Button
            tabIndex={isOpened ? 0 : -1}
            onClick={() => clearErrors()}
          >
            Отправить
          </Button>
          <span className={styles.info}>* Перед публикацией отзыв пройдет предварительную модерацию и проверку</span>
        </div>
      </div>
      {isSuccess && (
        <div
          className={clsx(styles.success, styles.panel)}
          role="alert"
        >
          <div className={styles.successTitle}>Ваш отзыв отправлен</div>
          <div className={styles.successDescription}>
            Спасибо, ваш отзыв будет опубликован после проверки
          </div>
          <TimesIcon
            className={styles.close}
            onClick={onCloseMsg}
          />
        </div>
      )}
      {error && (
        <div className={clsx(styles.error, styles.panel)} role="alert">
          <div className={styles.successTitle}>Ошибка</div>
          <div className={styles.successDescription}>{error}</div>
          <TimesIcon
            className={styles.close}
            onClick={onCloseMsg}
          />
        </div>
      )}
    </form>
  );
};
