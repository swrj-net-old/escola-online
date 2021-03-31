import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import DetalheUsuario from './detalhe-usuario';
import DetalheUsuarioDetail from './detalhe-usuario-detail';
import DetalheUsuarioUpdate from './detalhe-usuario-update';
import DetalheUsuarioDeleteDialog from './detalhe-usuario-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={DetalheUsuarioUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={DetalheUsuarioUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={DetalheUsuarioDetail} />
      <ErrorBoundaryRoute path={match.url} component={DetalheUsuario} />
    </Switch>
    <ErrorBoundaryRoute exact path={`${match.url}/:id/delete`} component={DetalheUsuarioDeleteDialog} />
  </>
);

export default Routes;
