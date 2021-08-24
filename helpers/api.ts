const DOMAIN = process.env.NEXT_PUBLIC_DOMAIN;

const API = {
  topPage: {
    find: `${DOMAIN}/api/top-page/find`,
    byAlias: `${DOMAIN}/api/top-page/byAlias/`
  },
  product: {
    find: `${DOMAIN}/api/product/find`
  },
  review: {
    createDemo: `${DOMAIN}/api/review/create-demo`
  }
};

export default API;
