import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import Turma from './turma';
import TurmaDetail from './turma-detail';
import TurmaUpdate from './turma-update';
import TurmaDeleteDialog from './turma-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={TurmaUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={TurmaUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={TurmaDetail} />
      <ErrorBoundaryRoute path={match.url} component={Turma} />
    </Switch>
    <ErrorBoundaryRoute exact path={`${match.url}/:id/delete`} component={TurmaDeleteDialog} />
  </>
);

export default Routes;
