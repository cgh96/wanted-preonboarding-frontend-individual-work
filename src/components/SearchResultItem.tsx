import "./SearchResultItem.scss";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

import type { Sick } from "types/sick";

interface SearchResultItemProps {
  sick: Sick;
}

function SearchResultItem({ sick }: SearchResultItemProps) {
  return (
    <div className="search-result-item">
      <FontAwesomeIcon icon={faMagnifyingGlass} />
      <span>{sick.sickNm}</span>
    </div>
  );
}

export default SearchResultItem;
