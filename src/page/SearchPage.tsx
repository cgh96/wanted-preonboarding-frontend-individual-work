import SearchForm from "components/SearchForm";

import QueryProvider from "contexts/QueryContext";

function SearchPage() {
  return (
    <main>
      <QueryProvider>
        <SearchForm />
      </QueryProvider>
    </main>
  );
}

export default SearchPage;
