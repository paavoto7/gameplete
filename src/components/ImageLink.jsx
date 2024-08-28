import { Link } from "react-router-dom";
import { Image } from "./Image";

const ImageLink = ({ game, img_size="hd" }) => {

    return(
        <Link className="flex flex-col justify-center h-fit pt-6" to={`/game/${game.id}`}>
            <h2 className="font-medium text-lg xl:text-xl 2xl:text-2xl mb-2 truncate text-center">{game.name}</h2>
            <Image
                cover={game.cover}
                className={"object-contain w-full h-full hover:brightness-[.80] rounded-lg"}
                size={img_size}
                name={game.name}
            />
        </Link>
    )
}

export default ImageLink