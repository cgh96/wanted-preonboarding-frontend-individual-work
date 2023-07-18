import SearchForm from "components/SearchForm";

import SickProvider from "contexts/Sick";

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
