/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import clsx from "classnames";

import { RatingProps } from './Rating.props';
import styles from './Rating.module.css';

import StarIcon from './start.svg';

export const Rating: React.FC<RatingProps> = ({
  rating,
  isEditable = false,
  setRating,
  ...props
}): JSX.Element => {
  const [ratingArray, setRatingArray] = useState<JSX.Element[]>(new Array(5).fill(<></>));

  const changeDisplay = (i: number) => {
    if (isEditable) constructRating(i);
  };
  const onClick = (i: number) => {
    if (isEditable && setRating) {
      setRating(i === rating ? 0 : i);
    }
  };
  const handleSpace = (i: number, e: React.KeyboardEvent<SVGElement>) => {
    if (e.code === 'Space' && setRating) {
      setRating(i === rating ? 0 : i);
    }
  };
  const constructRating = (currentRating: number) => {
    const updatedArray = ratingArray.map((r, id) => {
      return (
        <span
          className={isEditable ? styles.editable : ''}
          onMouseEnter={() => changeDisplay(id + 1)}
          onMouseLeave={() => changeDisplay(rating)}
          onClick={() => onClick(id + 1)}
        >
          <StarIcon
            className={clsx(styles.star, {
              [styles.filled]: id < currentRating,
            })}
            tabIndex={isEditable ? 0 : -1}
            onKeyDown={(e) => isEditable && handleSpace(id + 1, e)}
          />
        </span>
      );
    });

    setRatingArray(updatedArray);
  };

  useEffect(() => {
    constructRating(rating);
  }, [rating]);

  return (
    <div {...props}>
      {ratingArray.map((r, id) => (<span key={id}>{r}</span>))}
    </div>
  );
};
