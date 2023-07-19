import "./SearchResult.scss";

import SearchResultItem from "./SearchResultItem";
import { useQueryStateContext } from "contexts/QueryContext";
import Loading from "./common/Loading";

function SearchResults() {
  const { data, loading } = useQueryStateContext();

  return (
    <fieldset className="search-result-wrapper">
      <legend>추천 검색어</legend>
      <div style={{ height: "25px" }} aria-hidden />
      {loading && <Loading />}
      {((!loading && !data) || data?.length === 0) && "검색어 없음"}
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
