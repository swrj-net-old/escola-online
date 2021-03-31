import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import Serie from './serie';
import SerieDetail from './serie-detail';
import SerieUpdate from './serie-update';
import SerieDeleteDialog from './serie-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={SerieUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={SerieUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={SerieDetail} />
      <ErrorBoundaryRoute path={match.url} component={Serie} />
    </Switch>
    <ErrorBoundaryRoute exact path={`${match.url}/:id/delete`} component={SerieDeleteDialog} />
  </>
);

export default Routes;
