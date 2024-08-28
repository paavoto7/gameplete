
const ImageLinkGrid = ({ children, name, cols="" }) => {

    return (
        <>
            <h1 className="text-2xl xl:text-4xl font-bold w-fit m-auto pt-6">{name}</h1>
            <div className={"grid grid-cols-2 gap-x-4 p-6 "+cols}>
                {children}
            </div>
        </>
    )
}

export default ImageLinkGrid;