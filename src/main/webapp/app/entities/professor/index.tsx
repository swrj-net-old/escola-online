import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import Professor from './professor';
import ProfessorDetail from './professor-detail';
import ProfessorUpdate from './professor-update';
import ProfessorDeleteDialog from './professor-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={ProfessorUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={ProfessorUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={ProfessorDetail} />
      <ErrorBoundaryRoute path={match.url} component={Professor} />
    </Switch>
    <ErrorBoundaryRoute exact path={`${match.url}/:id/delete`} component={ProfessorDeleteDialog} />
  </>
);

export default Routes;
