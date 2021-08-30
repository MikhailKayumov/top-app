import { GetStaticProps } from "next";
import axios from 'axios';

import { WithLayout } from "layout/Layout";

import { MenuItem } from "interfaces/menu.interface";
import { API, firstLevelMenuDir } from 'helpers';
import { useLayoutEffect } from 'react';
import { useRouter } from 'next/router';

function Home({ firstCategory }: HomeProps): JSX.Element {
  const router = useRouter();
  const { route } = firstLevelMenuDir[firstCategory];

  useLayoutEffect(() => {
    router.replace(route);
  }, [firstCategory]);

  return <></>;
}

export default WithLayout(Home);

export const getStaticProps: GetStaticProps<HomeProps> = async () => {
  const firstCategory = 0;
  const { data: menu } = await axios.post<MenuItem[]>(API.topPage.find, { firstCategory });

  return {
    props: {
      menu,
      firstCategory
    }
  };
};

interface HomeProps extends Record<string, unknown> {
  menu: MenuItem[];
  firstCategory: number;
}
