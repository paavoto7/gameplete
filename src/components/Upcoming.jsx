import { useQuery } from "@tanstack/react-query";
import games from "../services/games";
import ImageLink from "./ImageLink";
import LoadDiv from "./LoadDiv";

const Upcoming = () => {

    const result = useQuery({
        queryKey: ["upcoming-games"],
        queryFn: games.getUpcoming
    })

    if (result.isLoading || result.isError) {
        return <LoadDiv status={result.status} />
    }

    const gamedata = result.data;

    return (
        <main className="grid grid-cols-2 sm:grid-cols-3 gap-y-10 gap-x-10 w-4/5 m-auto text-white pb-16">
            {gamedata.map(game =>
                <ImageLink key={game.id} game={game} />
            )}
        </main>
    )
}

export default Upcoming