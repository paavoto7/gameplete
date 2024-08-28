import { NavLink } from "react-router-dom"

const Nav = ({ children }) => {
    return(
        <nav className="min-w-fit w-1/3 m-auto text-center my-5 sm:mb-0 pb-2 border-b-2">
            <ul className="inline list-none text-lg xl:text-xl 2xl:text-2xl text-white font-semibold">
                {children}
            </ul>
        </nav>
    )
}

const NavItem = ({ route, text }) => {
    
    return (
        <NavLink className="inline mx-2 hover:text-blue-400" to={`${route}`}>{text}</NavLink>
    )
}

export {Nav, NavItem }