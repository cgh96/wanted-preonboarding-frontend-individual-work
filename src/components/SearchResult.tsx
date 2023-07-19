import "./SearchResult.scss";

import SearchResultItem from "./SearchResultItem";
import Loading from "./common/Loading";

import type { Sick } from "types/sick";

interface SearchResultsProps {
  data: Sick[];
  loading: boolean;
  selectIdx: number;
}

function SearchResults({ data, loading, selectIdx }: SearchResultsProps) {
  const result = data?.slice(0, 7);

  return (
    <fieldset className="search-result-wrapper">
      <legend>추천 검색어</legend>
      <div style={{ height: "25px" }} aria-hidden />
      {loading && <Loading />}
      {((!loading && !data) || data?.length === 0) && "검색어 없음"}
      <ul>
        {result?.map((e: Sick, i) => (
          <li key={e.sickCd} className={`${i === selectIdx ? "selected" : ""}`}>
            <SearchResultItem sick={e} />
          </li>
        ))}
      </ul>
    </fieldset>
  );
}

export default SearchResults;
