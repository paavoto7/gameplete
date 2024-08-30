import { Link } from "react-router-dom";
import { Image } from "./Image";

const ImageLink = ({ children, game, img_size="hd" }) => {

    return(
        <Link className="flex flex-col justify-center h-fit mt-6 border border-zinc-700/75 rounded-lg" to={`/game/${game.id}`}>
            <div className="p-2">
                <h2 className="font-medium text-lg xl:text-xl 2xl:text-2xl pb-2 truncate text-center">{game.name}</h2>
                {children}
            </div>
            <Image
                cover={game.cover}
                className={"object-contain w-full h-full hover:brightness-[.80] rounded-b-lg"}
                size={img_size}
                name={game.name}
            />
        </Link>
    )
}

export default ImageLink;