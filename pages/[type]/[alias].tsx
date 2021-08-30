import { GetStaticPaths, GetStaticProps, GetStaticPropsContext } from "next";
import Head from "next/head";
import axios from 'axios';

import { WithLayout } from "layout/Layout";

import { MenuItem } from "interfaces/menu.interface";
import { TopLevelCategory, TopPageModel } from "interfaces/page.interface";
import { ProductModel } from "interfaces/product.interface";
import { firstLevelMenuDir, API } from "helpers";
import { TopPageComponent } from "page-components";

function TopPage({ page, products, firstCategory }: TopPageProps): JSX.Element {
  return (
    <>
      {page && products && (
        <>
          <Head>
            <title>{page.metaTitle}</title>
            <meta name="description" content={page.metaDescription} />
            <meta property="og:title" content={page.metaTitle} />
            <meta property="og:description" content={page.metaDescription} />
            <meta property="og:type" content="article" />
          </Head>
          <TopPageComponent
            page={page}
            products={products}
            firstCategory={firstCategory}
          />
        </>
      )}
    </>
  );
}

export default WithLayout(TopPage);

export const getStaticPaths: GetStaticPaths = async () => {
  let paths: string[] = [];
  for (const item of firstLevelMenuDir) {
    const { data: menu } = await axios.post<MenuItem[]>(API.topPage.find, {
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

    const { data: menu } = await axios.post<MenuItem[]>(API.topPage.find, {
      firstCategory: firstCategoryItem.id
    });
    if (!menu || !menu.length) return { notFound: true };

    const { data: page } = await axios.get<TopPageModel>(`${API.topPage.byAlias}${params?.alias}`);
    const { data: products } = await axios.post<ProductModel[]>(API.product.find, {
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
