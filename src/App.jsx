import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Nav, NavItem } from './components/Nav';
import Home from './components/Home';
import Game from './components/Game';
import Upcoming from './components/Upcoming';
import Search from './components/Search';
import SearchBar from './components/SearchBar';
import NotFound from './components/NotFound';

const App = () => {

    return (
        <Router>
            <header className="[scrollbar-gutter:stable]">
                <h1 className="text-6xl 2xl:text-8xl font-bold text-white pt-4 w-fit m-auto">Gameplete</h1>
                <Nav>
                    <NavItem route="/" text="Home" />
                    <NavItem route="/upcoming" text="Upcoming" />
                    <NavItem route="/popular" text="Popular" />
                </Nav>
                <SearchBar />
            </header>
            <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/game/:id' element={<Game />} />
                <Route path='/upcoming' element={<Upcoming />} />
                <Route path='/search' element={<Search />} />
                <Route path='*' element={<NotFound />} />
            </Routes>
        </Router>
    )
}


export default App;
