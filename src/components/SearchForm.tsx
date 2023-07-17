import "./SearchForm.scss";

import SearchInput from "./SearchInput";
import SearchResults from "./SearchResult";

function SearchForm() {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  return (
    <form className="search-form" onSubmit={handleSubmit}>
      <h2>
        국내 모든 임상시험 검색하고
        <br /> 온라인으로 참여하기
      </h2>
      <SearchInput />
      <SearchResults />
    </form>
  );
}

export default SearchForm;
