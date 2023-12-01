"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.paginationHelper = void 0;
const paginationHelper = (paginationObj, query, totalItems) => {
    if (query.page) {
        paginationObj.currentPage = parseInt(query.page);
    }
    if (query.limit) {
        paginationObj.limitItems = query.limit;
    }
    paginationObj.totalPages = Math.ceil(totalItems / paginationObj.limitItems);
    paginationObj.skip =
        (paginationObj.currentPage - 1) * paginationObj.limitItems;
    return paginationObj;
};
exports.paginationHelper = paginationHelper;
