import React from 'react';

import { AppContextProvider, IAppContext } from 'context/app.context';
import { Header } from "./Header/Header";
import { Sidebar } from "./Sidebar/Sidebar";
import { Footer } from "./Footer/Footer";
import { Up } from "../components";

import styles from './Layout.module.css';

const Layout: React.FC = ({ children }): JSX.Element => {
  return (
    <div className={styles.wrapper}>
      <Header className={styles.header} />
      <Sidebar className={styles.sidebar} />
      <div className={styles.body}>{children}</div>
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
