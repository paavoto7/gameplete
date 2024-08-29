import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom"
import games from "../services/games";
import { BackgroundImage} from "./Image";
import GameInfo from "./GameInfo";
import ImageViewer from "./ImageViewer";
import ImageLinkGrid from "./ImageLinkGrid";
import ImageLink from "./ImageLink";
import LoadDiv from "./LoadDiv";

const Game = () => {
    const id = useParams().id;

    const result = useQuery({
        queryKey: [`game-${id}`],
        queryFn: () => games.getGameById(id),
        staleTime: 1 * 60 * 1000
    })

    if (result.isLoading || result.isError) {
        return <LoadDiv status={result.status} />
    }

    const gamedata = result.data[0];

    // Find the widest image for background
    const bg = gamedata.artworks?.reduce(
        (widest, image) => widest.width > image.width ? widest : image);
    
    const images = [...(gamedata.artworks ?? []), ...(gamedata.screenshots ?? [])];
    
    return (
        <main className="mt-6 sm:mt-12 text-white">
            <BackgroundImage
                image_id={bg ? bg?.image_id : gamedata.screenshots?.[0].image_id}
                size="full_hd"
            />
            <GameInfo props={gamedata} />
            
            {(gamedata.artworks || gamedata.screenshots) &&
            <ImageViewer artworks={images} />}

            <div className="w-11/12 sm:w-4/5 m-auto">
                <ImageLinkGrid name="Similar games" cols="sm:grid-cols-5">
                    {gamedata.similar_games?.map(game =>
                        <ImageLink key={game.id} game={game} />
                    )}
                </ImageLinkGrid>
            </div>
        </main>
    )
}

export default Game;