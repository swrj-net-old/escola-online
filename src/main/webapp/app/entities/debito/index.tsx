import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import Debito from './debito';
import DebitoDetail from './debito-detail';
import DebitoUpdate from './debito-update';
import DebitoDeleteDialog from './debito-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={DebitoUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={DebitoUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={DebitoDetail} />
      <ErrorBoundaryRoute path={match.url} component={Debito} />
    </Switch>
    <ErrorBoundaryRoute exact path={`${match.url}/:id/delete`} component={DebitoDeleteDialog} />
  </>
);

export default Routes;
