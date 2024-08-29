import InfoCategory from "./InfoCategory";
import { Link } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";

const CategorySection = ({ id }) => {
    const client = useQueryClient();

    const gamedata = client.getQueryData([`game-${id}`])[0];

    const developers = gamedata?.involved_companies
        ?.filter(company => company.developer)
        .map(developer => developer.company);
    
    const expansions = gamedata?.expansions
        ?.map(expansion => ({
            ...expansion,
            "name": <Link to={`/game/${expansion.id}`} className="text-[#8CB4FF] hover:border-b-2">{expansion.name}</Link>
        }));

    return (
        <>
            {gamedata &&
            <div className="grid grid-cols-2 gap-x-4 lg:grid-cols-3 lg:gap-x-0 mt-4 2xl:w-4/5">
                <InfoCategory className="row-span-2" header="Platforms" name={gamedata.platforms} loop={true} />
                <InfoCategory header="Expansions" name={expansions} loop={true} />
                <InfoCategory header="Genres" name={gamedata?.genres} loop={true} />
                <InfoCategory header="Developer(s)" name={developers} loop={true} />
                <InfoCategory header="Game engine(s)" name={gamedata?.game_engines} loop={true} />
                <InfoCategory header="Game modes" name={gamedata?.game_modes} loop={true} />
            </div>}
        </>
    );
};

export default CategorySection;