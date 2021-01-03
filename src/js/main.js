import {
  setSearchFocus,
  showClearTextButton,
  clearSearchText,
  clearPushListener,
} from "./searchBar";
import { getSearchTerm, retrieveSearchResults } from "./dataFuncitons";
import {
  deleteSearchResults,
  buildSearchResults,
  clearStatsLine,
  setStatsLine,
} from "./searchResults";
import "../sass/style.scss";

document.addEventListener("readystatechange", (event) => {
  if (event.target.readyState === "complete") {
    initApp();
  }
});

const initApp = () => {
  //set the focus
  setSearchFocus();

  //3个清除文字的监听器
  const search = document.getElementById("search");
  search.addEventListener("input", showClearTextButton);
  const clear = document.getElementById("clear");
  clear.addEventListener("click", clearSearchText);
  clear.addEventListener("keydown", clearPushListener);

  const form = document.getElementById("searchBar");
  form.addEventListener("submit", submitTheSearch);
};

//Procedural "workflow" function
const submitTheSearch = (event) => {
  event.preventDefault();
  //TODO:删除搜索结果
  deleteSearchResults();
  //执行搜索
  processTheSearch();
  //设置聚焦
  setSearchFocus();
};

//Procedural "workflow" function
const processTheSearch = async () => {
  //clear the stats line
  clearStatsLine();
  const searchTerm = getSearchTerm();
  if (searchTerm === "") return;
  const resultArray = await retrieveSearchResults(searchTerm);
  if (resultArray.length) buildSearchResults(resultArray); //build search results
  //set stats line
  setStatsLine(resultArray.length);
};
