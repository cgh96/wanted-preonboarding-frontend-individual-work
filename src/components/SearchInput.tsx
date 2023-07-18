import "./SearchInput.scss";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

import { getSicks } from "axiosInstance/getSicks";
import { useQueryDispatchContext } from "contexts/Query";
import { useState, useEffect } from "react";

interface SearchInputProps {
  onFocusInput: () => void;
  onBlurInput: () => void;
  inputFocus: boolean;
}

function SearchInput({
  onFocusInput,
  onBlurInput,
  inputFocus,
}: SearchInputProps) {
  const [searchKeyword, setSearchKeyword] = useState("");

  const onChangeSearchKeyword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchKeyword(e.target.value);
  };

  const dispatchQuery = useQueryDispatchContext();

  useEffect(() => {
    console.log(searchKeyword);
    if (dispatchQuery && inputFocus) {
      dispatchQuery({
        queryKey: [searchKeyword],
        queryFn: async (keyword: string) => await getSicks(keyword),
        staleTime: 1000 * 5 * 60,
      });
    }
  }, [inputFocus, searchKeyword]);

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
