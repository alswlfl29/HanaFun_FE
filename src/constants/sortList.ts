export type SortType = {
  name: string;
  sort: string;
};

export const SortCategories: SortType[] = [
  {
    name: '날짜순',
    sort: 'date',
  },
  {
    name: '인기순',
    sort: 'popular',
  },
  {
    name: '저가순',
    sort: 'priceAsc',
  },
  {
    name: '고가순',
    sort: 'priceDesc',
  },
];
