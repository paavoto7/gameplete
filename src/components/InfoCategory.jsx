

const InfoCategory = ({ header, name, loop=false }) => {
    return (
        <div className="h-fit mt-2 max-sm:mx-auto sm:mr-6 bg-zinc-700/25 rounded-xl p-4 h-fit max-h-full">
            <h2 className="font-bold text-xl mb-2">{header}</h2>

            {loop && name ?
                <ul className="list-none break-words">
                    {name.map(item =>
                        <li key={item.id} className="text-xl mb-2">
                            {item.name}
                        </li>
                    )}
                 </ul>
            :
                <p className="text-xl">{name ? name : "Not available"}</p>
            }
        </div>
    )
}

export default InfoCategory