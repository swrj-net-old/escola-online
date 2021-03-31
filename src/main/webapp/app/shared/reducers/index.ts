import { combineReducers } from 'redux';
import { loadingBarReducer as loadingBar } from 'react-redux-loading-bar';

import locale, { LocaleState } from './locale';
import authentication, { AuthenticationState } from './authentication';
import applicationProfile, { ApplicationProfileState } from './application-profile';

import administration, { AdministrationState } from 'app/modules/administration/administration.reducer';
import userManagement, { UserManagementState } from 'app/modules/administration/user-management/user-management.reducer';
import register, { RegisterState } from 'app/modules/account/register/register.reducer';
import activate, { ActivateState } from 'app/modules/account/activate/activate.reducer';
import password, { PasswordState } from 'app/modules/account/password/password.reducer';
import settings, { SettingsState } from 'app/modules/account/settings/settings.reducer';
import passwordReset, { PasswordResetState } from 'app/modules/account/password-reset/password-reset.reducer';
// prettier-ignore
import cidade, {
  CidadeState
} from 'app/entities/cidade/cidade.reducer';
// prettier-ignore
import escola, {
  EscolaState
} from 'app/entities/escola/escola.reducer';
// prettier-ignore
import pessoa, {
  PessoaState
} from 'app/entities/pessoa/pessoa.reducer';
// prettier-ignore
import diretor, {
  DiretorState
} from 'app/entities/diretor/diretor.reducer';
// prettier-ignore
import unidade, {
  UnidadeState
} from 'app/entities/unidade/unidade.reducer';
// prettier-ignore
import serie, {
  SerieState
} from 'app/entities/serie/serie.reducer';
// prettier-ignore
import materia, {
  MateriaState
} from 'app/entities/materia/materia.reducer';
// prettier-ignore
import grade, {
  GradeState
} from 'app/entities/grade/grade.reducer';
// prettier-ignore
import turma, {
  TurmaState
} from 'app/entities/turma/turma.reducer';
// prettier-ignore
import professor, {
  ProfessorState
} from 'app/entities/professor/professor.reducer';
// prettier-ignore
import chamada, {
  ChamadaState
} from 'app/entities/chamada/chamada.reducer';
// prettier-ignore
import conteudo, {
  ConteudoState
} from 'app/entities/conteudo/conteudo.reducer';
// prettier-ignore
import aluno, {
  AlunoState
} from 'app/entities/aluno/aluno.reducer';
// prettier-ignore
import matricula, {
  MatriculaState
} from 'app/entities/matricula/matricula.reducer';
// prettier-ignore
import debito, {
  DebitoState
} from 'app/entities/debito/debito.reducer';
// prettier-ignore
import historicoDebito, {
  HistoricoDebitoState
} from 'app/entities/historico-debito/historico-debito.reducer';
// prettier-ignore
import detalheUsuario, {
  DetalheUsuarioState
} from 'app/entities/detalhe-usuario/detalhe-usuario.reducer';
// prettier-ignore
import tipoSolicitacao, {
  TipoSolicitacaoState
} from 'app/entities/tipo-solicitacao/tipo-solicitacao.reducer';
// prettier-ignore
import solicitacao, {
  SolicitacaoState
} from 'app/entities/solicitacao/solicitacao.reducer';
/* jhipster-needle-add-reducer-import - JHipster will add reducer here */

export interface IRootState {
  readonly authentication: AuthenticationState;
  readonly locale: LocaleState;
  readonly applicationProfile: ApplicationProfileState;
  readonly administration: AdministrationState;
  readonly userManagement: UserManagementState;
  readonly register: RegisterState;
  readonly activate: ActivateState;
  readonly passwordReset: PasswordResetState;
  readonly password: PasswordState;
  readonly settings: SettingsState;
  readonly cidade: CidadeState;
  readonly escola: EscolaState;
  readonly pessoa: PessoaState;
  readonly diretor: DiretorState;
  readonly unidade: UnidadeState;
  readonly serie: SerieState;
  readonly materia: MateriaState;
  readonly grade: GradeState;
  readonly turma: TurmaState;
  readonly professor: ProfessorState;
  readonly chamada: ChamadaState;
  readonly conteudo: ConteudoState;
  readonly aluno: AlunoState;
  readonly matricula: MatriculaState;
  readonly debito: DebitoState;
  readonly historicoDebito: HistoricoDebitoState;
  readonly detalheUsuario: DetalheUsuarioState;
  readonly tipoSolicitacao: TipoSolicitacaoState;
  readonly solicitacao: SolicitacaoState;
  /* jhipster-needle-add-reducer-type - JHipster will add reducer type here */
  readonly loadingBar: any;
}

const rootReducer = combineReducers<IRootState>({
  authentication,
  locale,
  applicationProfile,
  administration,
  userManagement,
  register,
  activate,
  passwordReset,
  password,
  settings,
  cidade,
  escola,
  pessoa,
  diretor,
  unidade,
  serie,
  materia,
  grade,
  turma,
  professor,
  chamada,
  conteudo,
  aluno,
  matricula,
  debito,
  historicoDebito,
  detalheUsuario,
  tipoSolicitacao,
  solicitacao,
  /* jhipster-needle-add-reducer-combine - JHipster will add reducer here */
  loadingBar,
});

export default rootReducer;
