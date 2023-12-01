"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.searchHelper = void 0;
const searchHelper = (query) => {
    let searchObject = {
        keyword: "",
    };
    if (query.keyword) {
        searchObject.keyword = query.keyword;
        const regex = new RegExp(searchObject.keyword, "i");
        searchObject.keywordRegex = regex;
    }
    return searchObject;
};
exports.searchHelper = searchHelper;
