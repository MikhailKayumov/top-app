import { GetStaticPaths, GetStaticProps, GetStaticPropsContext } from "next";
import axios from 'axios';

import { WithLayout } from "layout/Layout";
import { MenuItem } from "interfaces/menu.interface";
import { API, firstLevelMenuDir } from 'helpers';

function Type({ firstCategory, menu }: TypeProps): JSX.Element {return (
    <>type: {firstCategory}</>
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
