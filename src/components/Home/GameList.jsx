import { useQuery } from "@tanstack/react-query";
import games from "../../services/games";
import ImageLinkGrid from "../Game/ImageLinkGrid";
import ImageLink from "../common/ImageLink";
import LoadDiv from "../common/LoadDiv";

const GameList = ({ name }) => {
    // Used on home page for the most rated and popular lists
    const queryFn = name === "Most popular" ? games.getPopular : games.getTop;
    const result = useQuery({
        queryKey: [`${name}-games`],
        queryFn: queryFn,
        staleTime: 4 * 60 * 1000
    })

    if (result.isLoading || result.isError) {
        return <LoadDiv status={result.status} />
    }

    const gamedata = result.data;

    return (
        <div className="flex flex-col w-11/12 sm:w-[45%] m-auto sm:mb-14 text-white sm:mt-20">
            <ImageLinkGrid name={name} >
                {gamedata?.map(game =>
                        <ImageLink key={game.id} game={game} />
                    )}
            </ImageLinkGrid>
        </div>
    );
};

export default GameList;