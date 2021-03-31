import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import Escola from './escola';
import EscolaDetail from './escola-detail';
import EscolaUpdate from './escola-update';
import EscolaDeleteDialog from './escola-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={EscolaUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={EscolaUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={EscolaDetail} />
      <ErrorBoundaryRoute path={match.url} component={Escola} />
    </Switch>
    <ErrorBoundaryRoute exact path={`${match.url}/:id/delete`} component={EscolaDeleteDialog} />
  </>
);

export default Routes;
