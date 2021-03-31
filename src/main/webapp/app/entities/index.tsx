import React from 'react';
import { Switch } from 'react-router-dom';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import Cidade from './cidade';
import Escola from './escola';
import Pessoa from './pessoa';
import Diretor from './diretor';
import Unidade from './unidade';
import Serie from './serie';
import Materia from './materia';
import Grade from './grade';
import Turma from './turma';
import Professor from './professor';
import Chamada from './chamada';
import Conteudo from './conteudo';
import Aluno from './aluno';
import Matricula from './matricula';
import Debito from './debito';
import HistoricoDebito from './historico-debito';
import DetalheUsuario from './detalhe-usuario';
import TipoSolicitacao from './tipo-solicitacao';
import Solicitacao from './solicitacao';
/* jhipster-needle-add-route-import - JHipster will add routes here */

const Routes = ({ match }) => (
  <div>
    <Switch>
      {/* prettier-ignore */}
      <ErrorBoundaryRoute path={`${match.url}cidade`} component={Cidade} />
      <ErrorBoundaryRoute path={`${match.url}escola`} component={Escola} />
      <ErrorBoundaryRoute path={`${match.url}pessoa`} component={Pessoa} />
      <ErrorBoundaryRoute path={`${match.url}diretor`} component={Diretor} />
      <ErrorBoundaryRoute path={`${match.url}unidade`} component={Unidade} />
      <ErrorBoundaryRoute path={`${match.url}serie`} component={Serie} />
      <ErrorBoundaryRoute path={`${match.url}materia`} component={Materia} />
      <ErrorBoundaryRoute path={`${match.url}grade`} component={Grade} />
      <ErrorBoundaryRoute path={`${match.url}turma`} component={Turma} />
      <ErrorBoundaryRoute path={`${match.url}professor`} component={Professor} />
      <ErrorBoundaryRoute path={`${match.url}chamada`} component={Chamada} />
      <ErrorBoundaryRoute path={`${match.url}conteudo`} component={Conteudo} />
      <ErrorBoundaryRoute path={`${match.url}aluno`} component={Aluno} />
      <ErrorBoundaryRoute path={`${match.url}matricula`} component={Matricula} />
      <ErrorBoundaryRoute path={`${match.url}debito`} component={Debito} />
      <ErrorBoundaryRoute path={`${match.url}historico-debito`} component={HistoricoDebito} />
      <ErrorBoundaryRoute path={`${match.url}detalhe-usuario`} component={DetalheUsuario} />
      <ErrorBoundaryRoute path={`${match.url}tipo-solicitacao`} component={TipoSolicitacao} />
      <ErrorBoundaryRoute path={`${match.url}solicitacao`} component={Solicitacao} />
      {/* jhipster-needle-add-route-path - JHipster will add routes here */}
    </Switch>
  </div>
);

export default Routes;
