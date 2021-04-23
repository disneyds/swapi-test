import React from 'react'
import { Redirect, Route, Switch } from 'react-router-dom';
import paths from './paths'
import HomePage from '../views/HomePage'
import CharacterPage from '../views/CharacterPage'
import Favorites from '../views/Favorites'

export default function Routes() {
    return (
        <Switch>
          <Route path={paths.HOME} exact component={HomePage} />

          <Route
            path={paths.CHARACTER(':name')}
            component={CharacterPage}
          />
        
          <Route path={paths.FAVORITES} exact component={Favorites} />

          
          <Redirect to={paths.HOME} />
        </Switch>
    )
}
