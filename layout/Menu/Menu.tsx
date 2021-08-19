import clsx from 'classnames';
import Link from 'next/link';
import { useRouter } from "next/router";
import { Fragment, useContext } from 'react';

import { AppContext } from 'context/app.context';
import { FirstLevelMenuItem, PageItem } from 'interfaces/menu.interface';
import { firstLevelMenuDir } from "helpers";

import styles from './Menu.module.css';


export const Menu = (): JSX.Element => {
  const { menu, firstCategory, setMenu } = useContext(AppContext);
  const router = useRouter();

  const openSecondLevel = (secondCategory: string) => {
    console.log(secondCategory);
    setMenu && setMenu(menu.map((item) => {
      if (item._id.secondCategory === secondCategory) {
        item.isOpened = !item.isOpened;
      }
      return item;
    }));
  };

  const buildFirstLevel = () => {
    return (
      <>
        {firstLevelMenuDir.map((item) => {
          return (
            <div key={item.route}>
              <Link href={`/${item.route}`}>
                <a>
                  <div className={clsx(styles.firstLevel, {
                    [styles.firstLevelActive]: item.id === firstCategory
                  })}>
                    {<item.icon />}
                    <span>{item.name}</span>
                  </div>
                </a>
              </Link>
              {item.id === firstCategory && !!menu.length && buildSecondLevel(item)}
            </div>
          );
        })}
      </>
    );
  };
  const buildSecondLevel = (firstLvlMenuItem: FirstLevelMenuItem) => {
    return (
      <div className={styles.secondLevelWrapper}>
        {menu.map((item) => {
          if (item.pages.map((p) => p.alias).includes(router.asPath.split('/')[2])) {
            item.isOpened = true;
          }

          return (
            <Fragment key={item._id.secondCategory}>
              <div
                className={styles.secondLevel}
                onClick={() => openSecondLevel(item._id.secondCategory)}
              >
                {item._id.secondCategory}
              </div>
              <div className={clsx(styles.secondLevelBlock, {
                [styles.secondLevelBlockOpened]: item.isOpened
              })}>
                {buildThirdLevel(item.pages, firstLvlMenuItem.route)}
              </div>
            </Fragment>
          );
        })}
      </div>
    );
  };
  const buildThirdLevel = (pages: PageItem[], route: string) => {
    return (
      <div>
        {pages.map((item) => {
          const path = `/${route}/${item.alias}`;
          return (
            <Link key={item.alias} href={path}>
              <a className={clsx(styles.thirdLevel, {
                [styles.thirdLevelActive]: path === router.asPath
              })}>
                {item.category}
              </a>
            </Link>
          );
        })}
      </div>
    );
  };

  return <>{buildFirstLevel()}</>;
};
