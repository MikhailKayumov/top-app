import { GetStaticProps } from "next";
import axios from 'axios';

import { WithLayout } from "layout/Layout";

import { MenuItem } from "interfaces/menu.interface";
import { API } from 'helpers';

function Home({ menu, firstCategory }: HomeProps): JSX.Element {
  // console.log({
  //   menu,
  //   firstCategory
  // });
  return (
    <div></div>
  );
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
