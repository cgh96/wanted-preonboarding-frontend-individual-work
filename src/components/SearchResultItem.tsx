import "./SearchResultItem.scss";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

function SearchResultItem() {
  return (
    <div className="search-result-item">
      <FontAwesomeIcon icon={faMagnifyingGlass} />
      <span>Klatskin</span>
    </div>
  );
}

export default SearchResultItem;
