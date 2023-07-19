import "./SearchForm.scss";

import SearchInput from "./SearchInput";
import SearchResults from "./SearchResult";
import Error from "./common/Error";

import { useQueryStateContext } from "contexts/QueryContext";
import { useState, useEffect } from "react";

import type { Sick } from "types/sick";
import type { QueryResponse } from "types/query";

function SearchForm() {
  const { data, loading, error }: QueryResponse<Sick[]> =
    useQueryStateContext();
  const [searchKeyword, setSearchKeyword] = useState("");
  const [selectIdx, setSelectIdx] = useState(-1);
  const [inputFocus, setInputFocus] = useState(false);

  const RESULT_MAX_LENGTH = !data || data?.length > 7 ? 7 : data.length;

  const onChangeSearchKeyword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchKeyword(e.target.value);
    setSelectIdx(-1);
  };

  const handleSelectIdx = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (data?.length) {
      if (e.key === "ArrowDown") {
        e.preventDefault();
        setSelectIdx((prev) => (prev + 1) % RESULT_MAX_LENGTH);
        return;
      }

      if (e.key === "ArrowUp") {
        e.preventDefault();
        setSelectIdx(
          (prev) => (prev - 1 + RESULT_MAX_LENGTH) % RESULT_MAX_LENGTH,
        );
      }
    }
  };

  const onFocusInput = () => {
    setInputFocus(true);
  };

  const onBlurInput = () => {
    setInputFocus(false);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  if (error) {
    return <Error errorMessage={JSON.stringify(error)} />;
  }

  useEffect(() => {
    if (data && selectIdx !== -1) {
      setSearchKeyword(data[selectIdx].sickNm);
    }
  }, [selectIdx]);

  return (
    <form className="search-form" onSubmit={handleSubmit}>
      <h2>
        국내 모든 임상시험 검색하고
        <br /> 온라인으로 참여하기
      </h2>
      <SearchInput
        onFocusInput={onFocusInput}
        onBlurInput={onBlurInput}
        onChangeSearchKeyword={onChangeSearchKeyword}
        handleSelectIdx={handleSelectIdx}
        selectIdx={selectIdx}
        searchKeyword={searchKeyword}
        inputFocus={inputFocus}
      />
      {inputFocus && data && loading === false && (
        <SearchResults data={data} loading={loading} selectIdx={selectIdx} />
      )}
    </form>
  );
}

export default SearchForm;
