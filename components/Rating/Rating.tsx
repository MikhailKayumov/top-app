/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useRef, useState } from 'react';
import clsx from "classnames";

import { RatingProps } from './Rating.props';
import styles from './Rating.module.css';

import StarIcon from './start.svg';

export const Rating: React.ForwardRefExoticComponent<
  React.PropsWithRef<RatingProps> &
  React.RefAttributes<HTMLDivElement>
> = React.forwardRef(
  ({
    rating,
    isEditable = false,
    setRating,
    className,
    tabIndex,
    ...props
   }, ref): JSX.Element => {
    const [ratingArray, setRatingArray] = useState<JSX.Element[]>(new Array(5).fill(<></>));
    const ratingRef = useRef<(HTMLDivElement | null)[]>([]);

    const changeDisplay = (i: number) => {
      if (isEditable) constructRating(i);
    };
    const onClick = (i: number) => {
      if (isEditable && setRating) {
        const newRating = i === rating ? 0 : i;
        setRating(newRating);
      }
    };
    const handleKey = (e: React.KeyboardEvent<HTMLDivElement>) => {
      if (!isEditable || !setRating) return;

      let newRating: number | null = null;
      switch (e.code) {
        case 'ArrowRight':
        case 'ArrowUp':
          newRating = Math.min((rating || 0) + 1, 5);
          break;
        case 'ArrowLeft':
        case 'ArrowDown':
          newRating = Math.max((rating || 1) - 1, 0);
          break;
      }

      if (newRating !== null) {
        e.preventDefault();
        setRating(newRating);
        ratingRef.current[newRating]?.focus();
      }
    };
    const computeFocus = (r: number, id: number): number => {
      if (!isEditable) return -1;
      if (!rating && id == 0) return tabIndex ?? 0;
      if (r === id) return tabIndex ?? 0;
      return -1;
    };
    const constructRating = (currentRating: number) => {
      const updatedArray = ratingArray.map((r, id) => {
        return (
          <div
            className={clsx(styles.starBox, { [styles.editable]: isEditable })}
            onMouseEnter={() => changeDisplay(id + 1)}
            onMouseLeave={() => changeDisplay(rating)}
            onClick={() => onClick(id + 1)}
            tabIndex={computeFocus(rating, id)}
            onKeyDown={handleKey}
            ref={(r) => ratingRef.current.push(r)}
            role={isEditable ? 'slider' : ''}
            aria-valuenow={rating}
            aria-valuemax={5}
            aria-valuemin={1}
            aria-label={isEditable ? 'Укажите рейтинг' : `рейтинг ${rating}`}
          >
            <StarIcon
              className={clsx(styles.star, { [styles.filled]: id < currentRating })}
            />
          </div>
        );
      });

      setRatingArray(updatedArray);
    };

    useEffect(() => {
      constructRating(rating);
    }, [rating, tabIndex]);

    return (
      <div
        ref={ref}
        className={clsx(styles.wrapper, className)}
        {...props}
      >
        {ratingArray.map((r, id) => (
          <React.Fragment key={id}>{r}</React.Fragment>
        ))}
      </div>
    );
  }
);
