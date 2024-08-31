import { useState } from "react";
import { Image } from "./Image";

const ImageViewer = ({ artworks }) => {
    const [currentImage, setCurrentImage] = useState(artworks[0]);

    const handleChange = (dir) => {
        let index = artworks.indexOf(currentImage) + dir;
        const len = artworks.length;

        if (index < 0) {
            index = len - 1;
        } else if (index >= len) {
            index = 0;
        }

        setCurrentImage(artworks[index]);
    }
 
    return (
        <div className="pb-10">
            <div tabIndex={0} className="flex relative m-auto mt-6 mx-2 sm:mx-auto h-72 sm:h-[40rem] sm:w-5/6 2xl:w-3/4 text-white focus:size-full">
                <Button id="left" dir={-1} handleChange={handleChange} />
                <Image
                    className="max-h-[90%] max-w-[75%] sm:max-w-[85%] xl:max-w-[90%] m-auto rounded-md border-2"
                    cover={currentImage}
                    name={currentImage.image_id}
                    size="full_hd"
                />
                <Button id="right" dir={1} handleChange={handleChange} />
            </div>
            <ThumbnailGallery
                artworks={artworks}
                currentImage={currentImage}
                setCurrentImage={setCurrentImage}
            />
        </div>
    )
}

const ThumbnailGallery = ({ artworks, currentImage, setCurrentImage }) => {
    // Provides the small images under the one being viewed

    const sliceInd = () => {
        const currentIndex = artworks.indexOf(currentImage);
        const len = artworks.length;

        if (len <= 6) {
            return artworks;
        } 

        const startInd = Math.max(0, Math.min(currentIndex-3, len-6));
        return artworks.slice(startInd, startInd+6);
    }

    return (
        <div className="flex flex-wrap gap-6 justify-center mt-6">
            <span className="p-2 text-2xl bg-zinc-600/50 self-center rounded-xl text-white">
                {artworks.indexOf(currentImage)+1}/{artworks.length}
            </span>
            {sliceInd().map(image => (
                <div key={image.image_id} onClick={() => setCurrentImage(image)}>
                    <Image
                        className={`w-28 sm:w-40 hover:brightness-[.80] cursor-pointer rounded-md transition ease-in-out duration-500
                            ${image.image_id === currentImage.image_id ? " shadow-[5px_5px_40px_-7px_#ccc]" : ""}`}
                        cover={image}
                        size="full_hd"
                    />
                </div>
                )
            )}
        </div>
    )
}

const Button = ({ id, dir, handleChange }) => {
    const arrow = id === "right" ? <>&rarr;</> : <>&larr;</>;

    return (
        <button
            className={`absolute ${id === "right" ? "right-0" : "left-0"} top-[45%] sm:top-1/2 text-center border-2 p-1.5 rounded-lg border-gray-300/50 hover:bg-gray-800/75`}
            id={id}
            onClick={() => handleChange(dir)}
        >
            <span className="font-bold text-2xl md:text-3xl xl:text-4xl text-center">{arrow}</span>
        </button>
    )
}

export default ImageViewer