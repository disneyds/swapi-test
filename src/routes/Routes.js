import { LinearProgress } from '@material-ui/core';
import React, { lazy, Suspense } from 'react'
import { Redirect, Route, Switch } from 'react-router-dom';
import paths from './paths'
// import HomePage from '../views/HomePage'
// import CharacterPage from '../views/CharacterPage'
// import Favorites from '../views/Favorites'

const HomePage = lazy(() =>
  import('../views/HomePage' /* webpackChunkName: "HomePage" */),
);
const CharacterPage = lazy(() =>
  import('../views/CharacterPage' /* webpackChunkName: "CharacterPage" */),
);
const Favorites = lazy(() =>
  import('../views/Favorites' /* webpackChunkName: "Favorites" */),
);

export default function Routes() {
  return (
      <Suspense fallback={<LinearProgress />}>
        <Switch>
          <Route path={paths.HOME} exact component={HomePage} />

          <Route
            path={paths.CHARACTER(':name')}
            component={CharacterPage}
          />
        
          <Route path={paths.FAVORITES} exact component={Favorites} />

          
          <Redirect to={paths.HOME} />
        </Switch>
      </Suspense>
    )
}
