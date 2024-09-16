import { useQuery } from "@tanstack/react-query";
import games from "../services/games";
import ContentGrid from "./ContentGrid";
import LoadDiv from "./LoadDiv";

const Anticipated = () => {

    const result = useQuery({
        queryKey: ["anticipated-games"],
        queryFn: games.getAnticipated,
        staleTime: 4 * 60 * 1000
    })

    if (result.isLoading || result.isError) {
        return <LoadDiv status={result.status} />
    }

    const gamedata = result.data;

    return (
        <main className="flex flex-col text-white pb-16">
            <div className="my-6 inline-flex justify-center">
                <h1 className="w-44 sm:w-80 text-center text-3xl sm:text-4xl font-bold border-b-2 pb-2">Most Anticipated</h1>
            </div>
            <ContentGrid gamedata={gamedata} />
        </main>
    )
}

export default Anticipated;