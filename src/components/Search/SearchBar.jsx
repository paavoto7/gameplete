import { useState } from "react";
import { useNavigate, createSearchParams } from "react-router-dom";

const SearchBar = () => {
    const [query, setQuery] = useState("");
    const navigate = useNavigate();

    const search = (event) => {
        event.preventDefault();
        navigate({
            pathname: "/search",
            search: `${createSearchParams({ query: query })}`
        });
    };

    return (
        <div className="text-white xl:text-lg font-semibold w-fit m-auto mt-2 sm:mt-4 shadow">
            <form className="appearance-none bg-inherit" onSubmit={search}>
                <input
                    type="search"
                    className="bg-inherit border-2 rounded-xl appearance-none mx-2 px-2"
                    name="query"
                    placeholder="Search..."
                    minLength={3}
                    value={query}
                    onChange={e => setQuery(e.target.value)}
                />
                <button className="bg-inherit border-2 rounded-xl appearance-none px-2" type="submit">Search</button>
            </form>
        </div>
    )
}

export default SearchBar;