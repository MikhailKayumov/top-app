import React, { useRef, useState } from 'react';
import clsx from 'classnames';

import { AppContextProvider, IAppContext } from 'context/app.context';
import { Header } from "./Header/Header";
import { Sidebar } from "./Sidebar/Sidebar";
import { Footer } from "./Footer/Footer";
import { Up } from "../components";

import styles from './Layout.module.css';

const Layout: React.FC = ({ children }): JSX.Element => {
  const bodyRef = useRef<HTMLDivElement>(null);
  const [isSkipLinkDisplayed, setIsSkipLinkDisplayed] = useState(false);

  const toContent = (key: React.KeyboardEvent) => {
    if (key.code === 'Space' || key.code === 'Enter') {
      key.preventDefault();
      bodyRef.current?.focus();
    }

    setIsSkipLinkDisplayed(false);
  };

  return (
    <div className={styles.wrapper}>
      <a
        onFocus={() => setIsSkipLinkDisplayed(true)}
        onKeyDown={toContent}
        tabIndex={1}
        className={clsx(styles.skipLink, { [styles.displayed]: isSkipLinkDisplayed })}
      >
        Сразу к содержанию
      </a>
      <Header className={styles.header} />
      <Sidebar className={styles.sidebar} />
      <main
        className={styles.body}
        ref={bodyRef}
        tabIndex={0}
        role="main"
      >
        {children}
      </main>
      <Footer className={styles.footer} />
      <Up />
    </div>
  );
};

export const WithLayout = <T extends Record<string, unknown> & IAppContext>(Component: React.FC<T>): React.FC<T> => {
  return function WithLayoutComponent(props: T): JSX.Element {
    return (
      <AppContextProvider menu={props.menu} firstCategory={props.firstCategory}>
        <Layout>
          <Component {...props} />
        </Layout>
      </AppContextProvider>
    );
  };
};
