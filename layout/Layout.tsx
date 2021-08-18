import React from 'react';

import { Header } from "./Header/Header";
import { Sidebar } from "./Sidebar/Sidebar";
import { Footer } from "./Footer/Footer";

import styles from './Layout.module.css';

const Layout: React.FC = ({ children }): JSX.Element => {
  return (
    <>
      <Header />
      <div>
        <Sidebar />
        <div>{children}</div>
      </div>
      <Footer />
    </>
  );
};

export const WithLayout = <T extends Record<string, unknown>>(Component: React.FC<T>): React.FC<T> => {
  return function WithLayoutComponent(props: T): JSX.Element {
    return (
      <Layout>
        <Component {...props} />
      </Layout>
    );
  };
};