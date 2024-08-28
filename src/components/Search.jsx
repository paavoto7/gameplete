import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";
import games from "../services/games";
import ImageLink from "./ImageLink";
import LoadDiv from "./LoadDiv";

const Search = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const query = searchParams.get("query");
    const result = useQuery({
        queryKey: [`search-${query}`],
        queryFn: () => games.searchGames(query),
        staleTime: 4 * 60 * 1000
    });

    if (result.isLoading || result.isError) {
        return <LoadDiv status={result.status} />
    }

    const search_results = result.data;

    return (
        <main className="grid grid-cols-2 sm:grid-cols-3 2xl:grid-cols-4 gap-y-10 gap-x-10 w-4/5 m-auto text-white pb-16">
            {search_results.map(game =>
                <ImageLink key={game.id} game={game} />
            )}
        </main>
    );
};

export default Search;