import { GetStaticProps } from "next";
import { SAxios } from "utils/Axios";

import { WithLayout } from "layout/Layout";

import { MenuItem } from "interfaces/menu.interface";

function Search(): JSX.Element {
  return (
    <>search</>
  );
}

export default WithLayout(Search);

export const getStaticProps: GetStaticProps<HomeProps> = async () => {
  const firstCategory = 0;
  const route = `${process.env.NEXT_PUBLIC_DOMAIN}/api/top-page/find`;
  const { data: menu } = await SAxios.post<MenuItem[]>(route, { firstCategory });

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