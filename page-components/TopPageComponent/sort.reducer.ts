import { ProductModel } from "interfaces/product.interface";
import { SortingKind } from "components/Sort/Sort.props";

export type SortActions = {
  type: SortingKind | 'SET_PRODUCTS';
  products?: ProductModel[];
};

export interface SortReducerState {
  sort: SortingKind;
  products: ProductModel[];
}

function sortProducts(products: ProductModel[], type: SortingKind): ProductModel[] {
  let sortFunc: ((a: ProductModel, b: ProductModel) => number )| null = null;

  switch (type) {
    case SortingKind.Rating:
      sortFunc = (a, b) => b.initialRating - a.initialRating;
      break;
    case SortingKind.Price:
      sortFunc = (a, b) => a.price - b.price;
      break;
  }

  return sortFunc ? products.sort(sortFunc) : products;
}

export function sortReducer(state: SortReducerState, action: SortActions): SortReducerState {
  switch (action.type) {
    case SortingKind.Rating: {
      return {
        sort: SortingKind.Rating,
        products: sortProducts(state.products, SortingKind.Rating)
      };
    }
    case SortingKind.Price:
      return {
        sort: SortingKind.Price,
        products: sortProducts(state.products, SortingKind.Price)
      };
    case "SET_PRODUCTS":
      return {
        sort: state.sort,
        products: action.products ?? []
      };
    default:
      return state;
  }
}