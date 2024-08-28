

const LoadDiv = ({ status }) => {

    const text = status === "error" ? "Error loading data" : "Loading data...";

    return (
        <div className="w-fit m-auto mt-10 text-4xl text-white font-bold">
            {text}
        </div>
    )
}

export default LoadDiv