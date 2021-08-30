import { GetStaticPaths, GetStaticProps, GetStaticPropsContext } from "next";
import axios from 'axios';
import { useRouter } from 'next/router';
import { API, firstLevelMenuDir } from 'helpers';
import { MenuItem } from "interfaces/menu.interface";
import { HTag, PTag } from 'components';
import { WithLayout } from "layout/Layout";
import { useLayoutEffect } from 'react';

function Type({ firstCategory, menu }: TypeProps): JSX.Element {
  const router = useRouter();
  const { name, route } = firstLevelMenuDir[firstCategory] || {};

  useLayoutEffect(() => {
    if (menu.length) {
      router.replace(route + '/' + menu[0].pages[0].alias);
    }
  }, [firstCategory]);

  if (menu && menu.length) return <></>;

  return (
    <>
      {name && <HTag tag="h1">{name}</HTag>}
      <PTag>Данный раздел пока пуст.</PTag>
    </>
  );
}

export default WithLayout(Type);

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: firstLevelMenuDir.map((item) => '/' + item.route),
    fallback: true
  };
};

export const getStaticProps: GetStaticProps<TypeProps> = async ({ params }: GetStaticPropsContext) => {
  const firstCategoryItem = !params ? null : firstLevelMenuDir.find((item) => {
    return item.route === params.type;
  });
  if (!firstCategoryItem) return { notFound: true };

  const { data: menu } = await axios.post<MenuItem[]>(API.topPage.find, {
    firstCategory: firstCategoryItem.id
  });

  return {
    props: {
      menu,
      firstCategory: firstCategoryItem.id
    }
  };
};

interface TypeProps extends Record<string, unknown> {
  menu: MenuItem[];
  firstCategory: number;
}
