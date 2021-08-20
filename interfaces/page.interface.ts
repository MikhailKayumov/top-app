export interface TopPageModel {
  _id: string;
  title: string;
  alias: string;
  category: string;
  firstCategory: TopLevelCategory;
  secondCategory: string;
  tags: string[];
  tagsTitle: string;
  seoText?: string;
  metaTitle: string;
  metaDescription: string;
  advantages?: TopPageAdvantage[];
  hh?: HHData;
  createdAt: Date;
  updatedAt: Date;
}

export interface HHData {
  _id: string;
  count: number;
  juniorSalary: number;
  middleSalary: number;
  seniorSalary: number;
  updatedAt: Date;
}

export interface TopPageAdvantage {
  _id: string;
  title: string;
  description: string;
}

export enum TopLevelCategory {
  Courses,
  Services,
  Books,
  Products
}
