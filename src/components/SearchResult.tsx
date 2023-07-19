import "./SearchResult.scss";

import SearchResultItem from "./SearchResultItem";
import { useQueryStateContext } from "contexts/QueryContext";

function SearchResults() {
  const { data, loading, error } = useQueryStateContext();

  if (error) {
    return 1;
  }

  if (loading) {
    return 1;
  }

  return (
    <fieldset className="search-result-wrapper">
      <legend>추천 검색어</legend>
      <div style={{ height: "25px" }} aria-hidden />
      {(!data || data?.length === 0) && "검색어 없음"}
      <ul>
        {data?.map((e: any) => (
          <li key={e.sickCd}>
            <SearchResultItem sick={e} />
          </li>
        ))}
      </ul>
    </fieldset>
  );
}

export default SearchResults;
