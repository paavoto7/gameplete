

const LoadDiv = ({ status }) => {

    return (
        <div className="w-fit m-auto mt-10 text-4xl text-white font-bold">
            {status === "error" ? "Error loading data" : "Loading data..."}
        </div>
    )
}

export default LoadDiv