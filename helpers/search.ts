interface objectSearch {
  keyword: string;
  keywordRegex?: RegExp;
}

export const searchHelper = (query) => {
  let searchObject: objectSearch = {
    keyword: "",
  };

  if (query.keyword) {
    searchObject.keyword = query.keyword;
    const regex = new RegExp(searchObject.keyword, "i");
    searchObject.keywordRegex = regex;
  }
  return searchObject;
};
