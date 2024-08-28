

const NotFound = () => {

    return (
        <div className="text-white w-4/5 sm:w-fit mt-20 m-auto">
            <h1 className="text-3xl sm:text-4xl font-bold mb-4">Resource not found</h1>
            <p className="text-xl">
                Sorry, the page you are looking for could not be found.<br/>
                Please double check that the url is typed correctly.
            </p>
        </div>
    )
}

export default NotFound;