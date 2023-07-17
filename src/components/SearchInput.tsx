import "./SearchInput.scss";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

import { useState } from "react";

function SearchInput() {
  const [searchKeyword, setSearchKeyword] = useState("");
  const [inputFocus, setInputFocus] = useState(false);

  const onChangeSearchKeyword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchKeyword(e.target.value);
  };

  const onFocusInput = () => {
    setInputFocus(true);
  };

  const onBlurInput = () => {
    setInputFocus(false);
  };

  const isVisiblePlaceholder = searchKeyword.length ? "input-focus" : "";
  const fieldsetBorderColor =
    searchKeyword.length || inputFocus ? "search-input-wrapper-focus" : "";

  return (
    <fieldset className={`search-input-wrapper ${fieldsetBorderColor}`}>
      <div className="search-input-label">
        <label htmlFor="search-keyword">
          <FontAwesomeIcon icon={faMagnifyingGlass} />
          <span>질환명을 입력해주세요.</span>
        </label>
        <input
          className={`${isVisiblePlaceholder}`}
          type="text"
          name="keyword"
          id="search-keyword"
          autoComplete="off"
          value={searchKeyword}
          onChange={onChangeSearchKeyword}
          onBlur={onBlurInput}
          onFocus={onFocusInput}
        />
      </div>
      <button type="submit">
        <FontAwesomeIcon icon={faMagnifyingGlass} />
      </button>
    </fieldset>
  );
}

export default SearchInput;
