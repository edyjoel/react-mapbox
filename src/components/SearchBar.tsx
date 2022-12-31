import { ChangeEvent, useContext, useRef } from "react";
import { PlacesContext } from "../context";
import { SearchResults } from "./SearchResults";

export const SearchBar = () => {
  const debounceRef = useRef<NodeJS.Timeout>();
  const { searchPlacesByTerm } = useContext(PlacesContext);

  const onQueryChanged = (event: ChangeEvent<HTMLInputElement>) => {
    if (debounceRef.current) clearTimeout(debounceRef.current);

    debounceRef.current = setTimeout(() => {
      console.log("debounced ", event.target.value);
      searchPlacesByTerm(event.target.value);
    }, 350);
  };

  return (
    <div className="search-container">
      <input
        type="search"
        className="form-control"
        placeholder="Buscar..."
        onChange={onQueryChanged}
      />
      <SearchResults />
    </div>
  );
};
