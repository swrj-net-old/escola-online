import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import Chamada from './chamada';
import ChamadaDetail from './chamada-detail';
import ChamadaUpdate from './chamada-update';
import ChamadaDeleteDialog from './chamada-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={ChamadaUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={ChamadaUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={ChamadaDetail} />
      <ErrorBoundaryRoute path={match.url} component={Chamada} />
    </Switch>
    <ErrorBoundaryRoute exact path={`${match.url}/:id/delete`} component={ChamadaDeleteDialog} />
  </>
);

export default Routes;
