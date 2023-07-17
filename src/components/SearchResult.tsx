import "./SearchResult.scss";

import SearchResultItem from "./SearchResultItem";

function SearchResults() {
  return (
    <fieldset className="search-result-wrapper">
      <legend>추천 검색어</legend>
      <div style={{ height: "25px" }} aria-hidden />
      <ul>
        <li>
          <SearchResultItem />
        </li>
      </ul>
    </fieldset>
  );
}

export default SearchResults;
