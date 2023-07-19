import "./SearchInput.scss";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

import { getSicks } from "axiosInstance/getSicks";
import { useQueryDispatchContext } from "contexts/QueryContext";
import { useDebounce } from "hooks/useDebounce";

interface SearchInputProps {
  onFocusInput: () => void;
  onBlurInput: () => void;
  onChangeSearchKeyword: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSelectIdx: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  selectIdx: number;
  searchKeyword: string;
  inputFocus: boolean;
}

function SearchInput({
  onFocusInput,
  onBlurInput,
  onChangeSearchKeyword,
  handleSelectIdx,
  selectIdx,
  searchKeyword,
  inputFocus,
}: SearchInputProps) {
  const sickDispatch = useQueryDispatchContext();

  useDebounce(
    [inputFocus, searchKeyword],
    () => {
      if (
        sickDispatch &&
        inputFocus &&
        searchKeyword.length &&
        selectIdx === -1
      ) {
        sickDispatch({
          queryKey: [searchKeyword],
          queryFn: async (keyword: string) => await getSicks(keyword),
          staleTime: 1000 * 5 * 60,
        });
      }
    },
    500,
  );

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
          onKeyDown={handleSelectIdx}
        />
      </div>
      <button type="submit">
        <FontAwesomeIcon icon={faMagnifyingGlass} />
      </button>
    </fieldset>
  );
}

export default SearchInput;
