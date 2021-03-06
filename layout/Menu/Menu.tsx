import { Fragment, useContext } from 'react';
import { useRouter } from "next/router";
import Link from 'next/link';
import clsx from 'classnames';
import { motion, useReducedMotion, Variants } from 'framer-motion';

import { AppContext } from 'context/app.context';
import { FirstLevelMenuItem, PageItem } from 'interfaces/menu.interface';
import { firstLevelMenuDir } from "helpers";

import styles from './Menu.module.css';

export const Menu = (): JSX.Element => {
  const { menu, firstCategory, setMenu } = useContext(AppContext);
  const shouldReduceMotion = useReducedMotion();
  const router = useRouter();

  const variants: Variants = {
    visible: {
      transition: shouldReduceMotion ? {} : {
        staggerChildren: 0.1
      }
    },
    hidden: {
      transition: shouldReduceMotion ? {} : {
        staggerChildren: 0.1,
        staggerDirection: -1
      }
    }
  };
  const variantsChildren: Variants = {
    visible: {
      opacity: 1,
      height: 29
    },
    hidden: {
      opacity: shouldReduceMotion ? 1 : 0,
      height: 0
    }
  };

  const openSecondLevel = (secondCategory: string) => {
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
                onKeyDown={(e) => {
                  if (e.code === 'Enter' || e.code === 'Space') {
                    e.preventDefault();
                    openSecondLevel(item._id.secondCategory);
                  }
                }}
                tabIndex={0}
              >
                {item._id.secondCategory}
              </div>
              <motion.div
                layout
                variants={variants}
                initial={item.isOpened ? 'visible' : 'hidden'}
                animate={item.isOpened ? 'visible' : 'hidden'}
                className={styles.secondLevelBlock}
              >
                {buildThirdLevel(item.pages, firstLvlMenuItem.route, !!item.isOpened)}
              </motion.div>
            </Fragment>
          );
        })}
      </div>
    );
  };
  const buildThirdLevel = (pages: PageItem[], route: string, isOpened: boolean) => {
    return (
      <div>
        {pages.map((item) => {
          const path = `/${route}/${item.alias}`;
          return (
            <motion.div
              key={item.alias}
              variants={variantsChildren}
            >
              <Link href={path}>
                <a
                  tabIndex={isOpened ? 0 : -1}
                  className={clsx(styles.thirdLevel, {
                    [styles.thirdLevelActive]: path === router.asPath
                  })}
                  aria-current={path === router.asPath ? 'page' : false}
                >
                  {item.category}
                </a>
              </Link>
            </motion.div>
          );
        })}
      </div>
    );
  };

  return <nav role="navigation">{buildFirstLevel()}</nav>;
};
