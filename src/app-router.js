import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';
import Header from '../src/components/header/header.js';
import Search from '../src/components/search/search.js';
import GameInfo from './components/game-info/game-info.js';
import GameBoxArtDisplay from './components/game-box-art-display/game-box-art-display.js';
import './app-router.css';

function AppRouter() {
    const [game, setGame] = useState(null);
    const [gameBoxArtDisplayShown, setGameBoxArtDisplayShown] = useState(false);

    function updateGame(gameObject) {
        console.log('updateGame running with this gameObject: ', gameObject);
        setGame(gameObject);
    }

    function toggleGameBoxArtDisplayShown() {
        setGameBoxArtDisplayShown(!gameBoxArtDisplayShown);
    }
    return (
        <Router>
            <Header />
            <Search updateGame={(gameObjectArgument) => updateGame(gameObjectArgument)} />
            <GameInfo
                //Data
                game={game}
                //Methods
                toggleGameBoxArtDisplayShown={() => toggleGameBoxArtDisplayShown()}
            />
            {
                gameBoxArtDisplayShown
                    ?
                    <>
                        <h1>Hello world</h1>
                        <GameBoxArtDisplay
                            //Data
                            game={game}
                            gameBoxArtDisplayShown={gameBoxArtDisplayShown}
                            //Methods
                            toggleGameBoxArtDisplayShown={() => toggleGameBoxArtDisplayShown()}
                        />
                    </>
                    :
                    null
            }
            {/* <TwitchFeed /> */}
            {/* <Switch>
            <Route exact path="/">
              <Home />
            </Route>
            <Route>
              <About />
            </Route>
            <Route>
              <Login />
            </Route>
        </Switch> */}
        </Router>
    );
}

export default AppRouter;
