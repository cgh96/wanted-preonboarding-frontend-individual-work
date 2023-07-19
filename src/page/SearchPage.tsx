import SearchForm from "components/SearchForm";

import SickProvider from "contexts/QueryContext";

function SearchPage() {
  return (
    <main>
      <SickProvider>
        <SearchForm />
      </SickProvider>
    </main>
  );
}

export default SearchPage;
