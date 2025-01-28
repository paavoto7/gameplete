import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";
import games from "../../services/games";
import ImageLink from "../common/ImageLink";
import LoadDiv from "../common/LoadDiv";

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
        <main className="grid grid-cols-2 sm:grid-cols-3 2xl:grid-cols-4 gap-y-5 gap-x-8 sm:gap-10 w-10/12 sm:w-4/5 m-auto text-white pb-16">
            {search_results.length !== 0 
            ? search_results.map(game =>
                <div key={game.id} className="min-h-52 min-w-28 sm:min-w-40 sm:min-h-64">
                    <ImageLink game={game} />
                </div>)
            : <h1 className="h-fit m-auto col-span-4 mt-10 text-xl">
                No results found. The search doesn&#39;t allow typos or such.
              </h1>
            }
        </main>
    );
};

export default Search;