const IMAGE_URL = "https://images.igdb.com/igdb/image/upload/t_"

const IMAGE_SIZES = {
    "cvr_sml":" cover_small",
    "s_med": "screenshot_med",
    "cvr_big": "cover_big",
    "logo": "logo_med",
    "s_big": "screenshot_big",
    "s_hug": "screenshot_hug",
    "thumb": "thumb",
    "micro": "micro",
    "hd": "720p",
    "full_hd": "1080p"
}

const Image = ({ cover, name, className="", size="cvr_big" }) => {
    
    return (
        <img
            alt={name}
            className={className}
            src={`${IMAGE_URL}${IMAGE_SIZES[size]}/${cover.image_id}.webp`}
        />
    )
}

const BackgroundImage = ({ image_id, size="cvr_big" }) => {
    // Adding the bg this way makes fading possible

    // Didn't seem to work as Tailwind class so using style here instead
    const bg = `linear-gradient(0deg,rgba(0,0,26,1)20%,rgba(0,0,26,0.8),rgba(0,0,26,0.5),rgba(0,0,0,0))
                ,url(${IMAGE_URL}${IMAGE_SIZES[size]}/${image_id}.webp)`

    return (
        <div
            alt="background_image"
            style={{ backgroundImage: bg }}
            className={`h-1/2 object-cover w-screen brightness-50 fixed top-0 left-0 -z-50 blur-sm bg-no-repeat bg-cover`}
        />
    )
}

export { Image, BackgroundImage }