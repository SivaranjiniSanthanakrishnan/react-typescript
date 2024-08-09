export type PaginateType = {
  currentPage: number;
  paginate: (currentPage: number) => void;
  endPage: number;
  setItem: (itemPerPage: number) => void;
};
