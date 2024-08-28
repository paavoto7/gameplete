import GameList from "./GameList"

const Home = () => {

    return (
        <main className="flex flex-col min-h-screen m-auto">
            <section className="h-fit mb-8">
                <p className="w-4/5 sm:w-1/2 m-auto mt-8 text-white font-medium text-xl leading-relaxed">
                    Ever felt like <strong>finding</strong> exhaustive <strong>information</strong> about upcoming 
                    <strong> video games</strong> was hard? Welcome to the club. 
                    You are not alone and that is precisely why this website exists.
                </p>
                <p className="w-4/5 sm:w-1/2 m-auto mt-8 text-white font-medium text-xl leading-relaxed">
                    On top of upcoming games, find information about top rated games etc. All this is powered
                    by the awesome <a className="font-bold" href="igdb.com">IGDB</a> api!
                </p>
            </section>
            <section className="flex flex-col sm:flex-row">
                <GameList name={"Most popular"} />
                <GameList name={"Top rated"} />
            </section>
        </main>
    )
}

export default Home