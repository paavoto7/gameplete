import { useQuery } from "@tanstack/react-query";
import games from "../../services/games";
import ContentGrid from "./ContentGrid";
import LoadDiv from "../common/LoadDiv";
import { useState } from "react";

const platforms = [
    {"id":"6","name":"PC (Microsoft Windows)"},
    {"id":"167","name":"PlayStation 5"},
    {"id":"169","name":"Xbox Series X|S"},
    {"id":"48","name":"PlayStation 4"},
    {"id":"49","name":"Xbox One"},
    {"id":"130","name":"Nintendo Switch"}
]

const Upcoming = () => {
    const [platid, setPlatid] = useState();

    const result = useQuery({
        queryKey: [`upcoming-games-${platid ?? 0}`],
        queryFn: () => games.getUpcoming(platid),
        staleTime: 4 * 60 * 1000
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
                <div className="flex w-11/12 m-auto justify-center">
                    <h2 className="text-xl font-bold pt-2 mt-2">Sort by:</h2>
                    <ul className="list-none flex overflow-x-auto">
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
            <ContentGrid gamedata={gamedata} />
        </main>
    )
}

export default Upcoming;