import { ProductModel } from "interfaces/product.interface";
import { SortingKind } from "components/Sort/Sort.props";

export type SortActions = {
  type: SortingKind
};

export interface SortReducerState {
  sort: SortingKind;
  products: ProductModel[];
}

export function sortReducer(state: SortReducerState, action: SortActions): SortReducerState {
  switch (action.type) {
    case SortingKind.Rating: {
      return {
        sort: SortingKind.Rating,
        products: state.products.sort((a, b) => {
          return b.initialRating - a.initialRating;
        })
      };
    }
    case SortingKind.Price:
      return {
        sort: SortingKind.Price,
        products: state.products.sort((a, b) => {
          return a.price - b.price;
        })
      };
    default:
      return state;
  }
}