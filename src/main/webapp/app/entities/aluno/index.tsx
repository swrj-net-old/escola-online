import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import Aluno from './aluno';
import AlunoDetail from './aluno-detail';
import AlunoUpdate from './aluno-update';
import AlunoDeleteDialog from './aluno-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={AlunoUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={AlunoUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={AlunoDetail} />
      <ErrorBoundaryRoute path={match.url} component={Aluno} />
    </Switch>
    <ErrorBoundaryRoute exact path={`${match.url}/:id/delete`} component={AlunoDeleteDialog} />
  </>
);

export default Routes;
