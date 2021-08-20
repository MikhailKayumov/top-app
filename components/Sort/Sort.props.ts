import { DetailedHTMLProps, HTMLAttributes } from "react";

export interface SortProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  sort: SortingKind;
  setSort: (sort: SortingKind) => void;
}

export enum SortingKind {
  Rating,
  Price
}
