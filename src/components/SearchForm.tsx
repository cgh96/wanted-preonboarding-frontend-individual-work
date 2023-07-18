import "./SearchForm.scss";

import SearchInput from "./SearchInput";
import SearchResults from "./SearchResult";

import { useState } from "react";

function SearchForm() {
  const [inputFocus, setInputFocus] = useState(false);

  const onFocusInput = () => {
    setInputFocus(true);
  };

  const onBlurInput = () => {
    setInputFocus(false);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  return (
    <form className="search-form" onSubmit={handleSubmit}>
      <h2>
        국내 모든 임상시험 검색하고
        <br /> 온라인으로 참여하기
      </h2>
      <SearchInput
        onFocusInput={onFocusInput}
        onBlurInput={onBlurInput}
        inputFocus={inputFocus}
      />
      {inputFocus && <SearchResults />}
    </form>
  );
}

export default SearchForm;
