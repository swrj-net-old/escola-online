import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import Unidade from './unidade';
import UnidadeDetail from './unidade-detail';
import UnidadeUpdate from './unidade-update';
import UnidadeDeleteDialog from './unidade-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={UnidadeUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={UnidadeUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={UnidadeDetail} />
      <ErrorBoundaryRoute path={match.url} component={Unidade} />
    </Switch>
    <ErrorBoundaryRoute exact path={`${match.url}/:id/delete`} component={UnidadeDeleteDialog} />
  </>
);

export default Routes;
