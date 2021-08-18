import clsx from 'classnames';
import { useContext } from 'react';
import { AppContext } from 'context/app.context';
import { FirstLevelMenuItem, PageItem } from 'interfaces/menu.interface';
import { TopLevelCategory } from 'interfaces/page.interface';

import styles from './Menu.module.css';

import CoursesIcon from './icons/courses.svg';
import ServicesIcon from './icons/services.svg';
import BooksIcon from './icons/books.svg';
import ProductsIcon from './icons/products.svg';

const firstLevelMenu: FirstLevelMenuItem[] = [
  {
    route: 'courses',
    name: 'Курсы',
    icon: <CoursesIcon />,
    id: TopLevelCategory.Courses
  },
  {
    route: 'services',
    name: 'Сервисы',
    icon: <ServicesIcon />,
    id: TopLevelCategory.Services
  },
  {
    route: 'books',
    name: 'Книги',
    icon: <BooksIcon />,
    id: TopLevelCategory.Books
  },
  {
    route: 'products',
    name: 'Товары',
    icon: <ProductsIcon />,
    id: TopLevelCategory.Products
  },
];

export const Menu = (): JSX.Element => {
  const { menu, firstCategory, setMenu } = useContext(AppContext);

  const buildFirstLevel = () => {
    return (
      <>
        {firstLevelMenu.map((item) => {
          return (
            <div key={item.route}>
              <a href={`/${item.route}`}>
                <div className={clsx(styles.firstLevel, {
                  [styles.firstLevelActive]: item.id === firstCategory
                })}>
                  {item.icon}
                  <span>{item.name}</span>
                </div>
              </a>
              {item.id === firstCategory && buildSecondLevel(item)}
            </div>
          );
        })}
      </>
    );
  };
  const buildSecondLevel = (firstLvlMenuItem: FirstLevelMenuItem) => {
    return (
      <div className={styles.secondLevelWrapp}>
        {menu.map((item) => {
          return (
            <div key={item._id.secondCategory}>
              <div className={styles.secondLevel}>
                {item._id.secondCategory}
              </div>
              <div className={clsx(styles.secondLevelBlock, {
                [styles.secondLevelBlockOpened]: item.isOpened
              })}>
                {buildThirdLevel(item.pages, firstLvlMenuItem.route)}
              </div>
            </div>
          );
        })}
      </div>
    );
  };
  const buildThirdLevel = (pages: PageItem[], route: string) => {
    return (
      <div>
        {pages.map((item) => {
          return (
            <a
              key={item.alias}
              href={`/${route}/${item.alias}`}
              className={clsx(styles.thirdLevel, {
                [styles.thirdLevelActive]: false
              })}
            >
              {item.category}
            </a>
          );
        })}
      </div>
    );
  };

  return (
    <div className={styles.menu}>
      <ul>
        {buildFirstLevel()}
      </ul>
    </div>
  );
};
