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
        <main className="flex flex-col text-white pb-16">
            <div className="my-6 inline-flex justify-center">
                <h1 className="w-44 sm:w-48 text-center text-3xl sm:text-4xl font-bold border-b-2 pb-2">Upcoming</h1>
            </div>
            <section className="grid grid-cols-2 sm:grid-cols-3 gap-y-5 gap-x-8 sm:gap-10 w-10/12 sm:w-4/5 m-auto">
                {gamedata.map(game =>
                    <div key={game.id} className="min-h-52 min-w-28 sm:min-w-40 sm:min-h-64">
                        <ImageLink game={game} >
                            <h3 className="text-sm xl:text-lg 2xl:text-xl w-fit m-auto font-medium bg-zinc-700/25 rounded-lg px-2 mb-2">
                                {game.release_dates?.[0].human}
                            </h3>
                        </ImageLink>
                    </div>
                )}
            </section>
        </main>
    )
}

export default Upcoming;