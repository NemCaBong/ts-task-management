interface objectPagination {
  totalPages?: number;
  currentPage: number;
  limitItems: number;
  skip?: number;
}

export const paginationHelper = (
  paginationObj: objectPagination,
  query,
  totalItems: number
): objectPagination => {
  // Nếu có req.query.page mà
  // ng dùng tự nhập vào thì lấy query đó làm số trang
  if (query.page) {
    paginationObj.currentPage = parseInt(query.page);
  }

  if (query.limit) {
    paginationObj.limitItems = query.limit;
  }

  // Tồng số trang của tất cả bản ghi trong
  // DB
  paginationObj.totalPages = Math.ceil(totalItems / paginationObj.limitItems);

  // Số trang skip
  paginationObj.skip =
    (paginationObj.currentPage - 1) * paginationObj.limitItems;
  return paginationObj;
};
