import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import HistoricoDebito from './historico-debito';
import HistoricoDebitoDetail from './historico-debito-detail';
import HistoricoDebitoUpdate from './historico-debito-update';
import HistoricoDebitoDeleteDialog from './historico-debito-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={HistoricoDebitoUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={HistoricoDebitoUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={HistoricoDebitoDetail} />
      <ErrorBoundaryRoute path={match.url} component={HistoricoDebito} />
    </Switch>
    <ErrorBoundaryRoute exact path={`${match.url}/:id/delete`} component={HistoricoDebitoDeleteDialog} />
  </>
);

export default Routes;
