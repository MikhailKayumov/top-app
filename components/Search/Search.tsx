import React, { useState } from 'react';
import { useRouter } from "next/router";
import clsx from "classnames";

import { Input } from "../Input/Input";
import { SearchProps } from "./Search.props";
import { Button } from "../Button/Button";
import styles from './Search.module.css';
import SearchIcon from "./search.svg";

export const Search: React.FC<SearchProps> = ({
  className,
  ...props
}): JSX.Element => {
  const { push } = useRouter();
  const [value, setValue] = useState('');

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };

  const findByEnter = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter') find();
  };

  const find = () => {
    push({
      pathname: '/search',
      query: { q: value }
    }).then(() => {
      setValue('');
    });
  };

  return (
    <form
      role="search"
      className={clsx(className, styles.search)}
      {...props}
    >
      <Input
        placeholder="Поиск..."
        value={value}
        onChange={onChange}
        className={styles.input}
        onKeyDown={findByEnter}
      />
      <Button
        appearance="primary"
        className={styles.button}
        onClick={() => find}
        aria-label="Искать по сайту"
      >
        <SearchIcon />
      </Button>
    </form>
  );
};
