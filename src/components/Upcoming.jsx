import { useQuery } from "@tanstack/react-query";
import games from "../services/games";
import ImageLink from "./ImageLink";
import LoadDiv from "./LoadDiv";
import { useState } from "react";

const platforms = [
    {"id":"6","name":"PC (Microsoft Windows)"},
    {"id":"48","name":"PlayStation 4"},
    {"id":"49","name":"Xbox One"},
    {"id":"130","name":"Nintendo Switch"},
    {"id":"167","name":"PlayStation 5"},
    {"id":"169","name":"Xbox Series X|S"}
]

const Upcoming = () => {
    const [platid, setPlatid] = useState();

    const result = useQuery({
        queryKey: [`upcoming-games-${platid ?? 0}`],
        queryFn: () => games.getUpcoming(platid)
    });

    if (result.isLoading || result.isError) {
        return <LoadDiv status={result.status} />
    }

    const gamedata = result.data;

    const handleClick = (e) => {
        const newId = e.target.value;
        platid !== newId ? setPlatid(newId) : setPlatid();
    }

    return (
        <main className="flex flex-col text-white pb-16">
            <div className="my-6 flex-col justify-center">
                <h1 className="w-44 sm:w-48 text-center text-3xl sm:text-4xl font-bold border-b-2 pb-2 m-auto">Upcoming</h1>
                <div className="flex w-fit m-auto">
                    <h2 className="text-xl font-bold pt-2 mt-2">Sort by:</h2>
                    <ul className="list-none flex">
                        {platforms.map(platform => 
                            <li key={platform.id}>
                                <button
                                    onClick={handleClick}
                                    value={platform.id}
                                    className={`p-2 m-2 font-semibold border-b-2 hover:text-blue-400${platform.id === platid ? " border-blue-400" : ""}`}
                                >
                                    {platform.name}
                                </button>
                            </li>
                        )}
                    </ul>
                </div>
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