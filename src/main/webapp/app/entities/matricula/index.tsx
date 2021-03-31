import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import Matricula from './matricula';
import MatriculaDetail from './matricula-detail';
import MatriculaUpdate from './matricula-update';
import MatriculaDeleteDialog from './matricula-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={MatriculaUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={MatriculaUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={MatriculaDetail} />
      <ErrorBoundaryRoute path={match.url} component={Matricula} />
    </Switch>
    <ErrorBoundaryRoute exact path={`${match.url}/:id/delete`} component={MatriculaDeleteDialog} />
  </>
);

export default Routes;
