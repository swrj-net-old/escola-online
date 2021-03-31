import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import TipoSolicitacao from './tipo-solicitacao';
import TipoSolicitacaoDetail from './tipo-solicitacao-detail';
import TipoSolicitacaoUpdate from './tipo-solicitacao-update';
import TipoSolicitacaoDeleteDialog from './tipo-solicitacao-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={TipoSolicitacaoUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={TipoSolicitacaoUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={TipoSolicitacaoDetail} />
      <ErrorBoundaryRoute path={match.url} component={TipoSolicitacao} />
    </Switch>
    <ErrorBoundaryRoute exact path={`${match.url}/:id/delete`} component={TipoSolicitacaoDeleteDialog} />
  </>
);

export default Routes;
