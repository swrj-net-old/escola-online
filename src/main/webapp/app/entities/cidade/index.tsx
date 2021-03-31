import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import Cidade from './cidade';
import CidadeDetail from './cidade-detail';
import CidadeUpdate from './cidade-update';
import CidadeDeleteDialog from './cidade-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={CidadeUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={CidadeUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={CidadeDetail} />
      <ErrorBoundaryRoute path={match.url} component={Cidade} />
    </Switch>
    <ErrorBoundaryRoute exact path={`${match.url}/:id/delete`} component={CidadeDeleteDialog} />
  </>
);

export default Routes;
