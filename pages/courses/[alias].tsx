import { GetStaticPaths, GetStaticProps, GetStaticPropsContext } from "next";
import API from "../../utils/API";

import { WithLayout } from "../../layout/Layout";

import { MenuItem } from "../../interfaces/menu.interface";
import { TopPageModel } from "../../interfaces/page.interface";
import { ProductModel } from "../../interfaces/product.interface";

const firstCategory = 0;

function Course({ menu, page, products }: CourseProps): JSX.Element {
  return (
    <>
      {products && products.length}
    </>
  );
}

export default WithLayout(Course);

export const getStaticPaths: GetStaticPaths = async () => {
  const route = `${process.env.NEXT_PUBLIC_DOMAIN}/api/top-page/find`;
  const { data: menu } = await API.post<MenuItem[]>(route, { firstCategory });

  return {
    paths: menu.flatMap((m) => m.pages.map((p) => `/courses/${p.alias}`)),
    fallback: true
  };
};

export const getStaticProps: GetStaticProps<CourseProps> = async ({ params }: GetStaticPropsContext) => {
  if (!params) {
    return {
      notFound: true
    };
  }

  const route = process.env.NEXT_PUBLIC_DOMAIN;
  const { data: menu } = await API.post<MenuItem[]>(`${route}/api/top-page/find`, {
    firstCategory
  });
  const { data: page } = await API.get<TopPageModel>(`${route}/api/top-page/byAlias/${params.alias}`);
  const { data: products } = await API.post<ProductModel[]>(`${route}/api/product/find`, {
    category: page.category,
    limit: 10
  });

  return {
    props: {
      menu,
      firstCategory,
      page,
      products
    }
  };
};

interface CourseProps extends Record<string, unknown> {
  menu: MenuItem[];
  firstCategory: number;
  page: TopPageModel;
  products: ProductModel[];
}