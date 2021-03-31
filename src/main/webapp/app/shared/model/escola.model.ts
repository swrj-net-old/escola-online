import { IPessoa } from 'app/shared/model/pessoa.model';
import { IAluno } from 'app/shared/model/aluno.model';
import { IUnidade } from 'app/shared/model/unidade.model';
import { IGrade } from 'app/shared/model/grade.model';
import { ITipoSolicitacao } from 'app/shared/model/tipo-solicitacao.model';

export interface IEscola {
  id?: number;
  nome?: string | null;
  razaoSocial?: string | null;
  cnpjPrincipal?: string | null;
  url?: string | null;
  prefixo?: string | null;
  responsavelNome?: string | null;
  responsavelCpf?: string | null;
  responsavelEmail?: string | null;
  responsavelCelular?: string | null;
  pessoas?: IPessoa[] | null;
  alunos?: IAluno[] | null;
  unidades?: IUnidade[] | null;
  grades?: IGrade[] | null;
  tipoSolicitacaos?: ITipoSolicitacao[] | null;
}

export const defaultValue: Readonly<IEscola> = {};
