import { GetStaticProps } from "next";
import axios from 'axios';

import { WithLayout } from "layout/Layout";

import { MenuItem } from "interfaces/menu.interface";
import { API } from 'helpers';

function Search(): JSX.Element {
  return (
    <>search</>
  );
}

export default WithLayout(Search);

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
