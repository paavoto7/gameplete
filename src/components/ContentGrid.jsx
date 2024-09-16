import ImageLink from "./ImageLink";

const ContentGrid = ({ gamedata }) => {

    return (
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
    )
}

export default ContentGrid;