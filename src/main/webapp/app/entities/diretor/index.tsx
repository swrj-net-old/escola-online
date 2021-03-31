import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import Diretor from './diretor';
import DiretorDetail from './diretor-detail';
import DiretorUpdate from './diretor-update';
import DiretorDeleteDialog from './diretor-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={DiretorUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={DiretorUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={DiretorDetail} />
      <ErrorBoundaryRoute path={match.url} component={Diretor} />
    </Switch>
    <ErrorBoundaryRoute exact path={`${match.url}/:id/delete`} component={DiretorDeleteDialog} />
  </>
);

export default Routes;
