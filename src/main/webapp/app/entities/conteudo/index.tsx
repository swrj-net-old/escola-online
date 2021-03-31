import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import Conteudo from './conteudo';
import ConteudoDetail from './conteudo-detail';
import ConteudoUpdate from './conteudo-update';
import ConteudoDeleteDialog from './conteudo-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={ConteudoUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={ConteudoUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={ConteudoDetail} />
      <ErrorBoundaryRoute path={match.url} component={Conteudo} />
    </Switch>
    <ErrorBoundaryRoute exact path={`${match.url}/:id/delete`} component={ConteudoDeleteDialog} />
  </>
);

export default Routes;
