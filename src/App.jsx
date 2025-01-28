import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Nav, NavItem } from './components/common/Nav';
import Home from './components/Home/Home';
import Game from './components/Game/Game';
import Upcoming from './components/GameListPages/Upcoming';
import Anticipated from './components/GameListPages/Anticipated';
import Search from './components/Search/Search';
import SearchBar from './components/Search/SearchBar';
import NotFound from './components/common/NotFound';

const App = () => {

    return (
        <Router>
            <header className="[scrollbar-gutter:stable]">
                <h1 className="text-6xl 2xl:text-8xl font-bold text-white pt-4 w-fit m-auto">Gameplete</h1>
                <Nav>
                    <NavItem route="/" text="Home" />
                    <NavItem route="/upcoming" text="Upcoming" />
                    <NavItem route="/anticipated" text="Anticipated" />
                </Nav>
                <SearchBar />
            </header>
            <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/game/:id' element={<Game />} />
                <Route path='/upcoming' element={<Upcoming />} />
                <Route path='/anticipated' element={<Anticipated />} />
                <Route path='/search' element={<Search />} />
                <Route path='*' element={<NotFound />} />
            </Routes>
        </Router>
    )
}


export default App;
