import { GetStaticPaths, GetStaticProps, GetStaticPropsContext } from "next";
import { SAxios } from "utils/Axios";

import { WithLayout } from "layout/Layout";

import { MenuItem } from "interfaces/menu.interface";
import { TopLevelCategory, TopPageModel } from "interfaces/page.interface";
import { ProductModel } from "interfaces/product.interface";
import { firstLevelMenuDir } from "../../helpers";
import { TopPageComponent } from "../../page-components";

function TopPage({ page, products, firstCategory }: TopPageProps): JSX.Element {
  return (
    <TopPageComponent
      page={page}
      products={products}
      firstCategory={firstCategory}
    />
  );
}

export default WithLayout(TopPage);

export const getStaticPaths: GetStaticPaths = async () => {
  let paths: string[] = [];
  for (const item of firstLevelMenuDir) {
    const route = `${process.env.NEXT_PUBLIC_DOMAIN}/api/top-page/find`;
    const { data: menu } = await SAxios.post<MenuItem[]>(route, {
      firstCategory: item.id
    });

    paths = paths.concat(menu.flatMap((m) => m.pages.map((p) => `/${item.route}/${p.alias}`)));
  }

  return {
    paths,
    fallback: true
  };
};

export const getStaticProps: GetStaticProps<TopPageProps> = async ({ params }: GetStaticPropsContext) => {
  try {
    const firstCategoryItem = !params ? null : firstLevelMenuDir.find((item) => {
      return item.route === params.type;
    });
    if (!firstCategoryItem) return { notFound: true };

    const route = process.env.NEXT_PUBLIC_DOMAIN;

    const { data: menu } = await SAxios.post<MenuItem[]>(`${route}/api/top-page/find`, {
      firstCategory: firstCategoryItem.id
    });
    if (!menu || !menu.length) return { notFound: true };

    const { data: page } = await SAxios.get<TopPageModel>(`${route}/api/top-page/byAlias/${params?.alias}`);
    const { data: products } = await SAxios.post<ProductModel[]>(`${route}/api/product/find`, {
      category: page.category,
      limit: 10
    });

    return {
      props: {
        firstCategory :firstCategoryItem.id,
        menu,
        page,
        products
      }
    };
  } catch {
    return { notFound: true };
  }
};

interface TopPageProps extends Record<string, unknown> {
  menu: MenuItem[];
  firstCategory: TopLevelCategory;
  page: TopPageModel;
  products: ProductModel[];
}