import { IPessoa } from 'app/shared/model/pessoa.model';
import { IAluno } from 'app/shared/model/aluno.model';
import { IUnidade } from 'app/shared/model/unidade.model';
import { IGrade } from 'app/shared/model/grade.model';
import { ITipoSolicitacao } from 'app/shared/model/tipo-solicitacao.model';

export interface IEscola {
  id?: number;
  nome?: string;
  razaoSocial?: string;
  cnpjPrincipal?: string;
  url?: string;
  prefixo?: string;
  responsavelNome?: string;
  responsavelCpf?: string;
  responsavelEmail?: string;
  responsavelCelular?: string;
  pessoas?: IPessoa[];
  alunos?: IAluno[];
  unidades?: IUnidade[];
  grades?: IGrade[];
  tipoSolicitacaos?: ITipoSolicitacao[];
}

export class Escola implements IEscola {
  constructor(
    public id?: number,
    public nome?: string,
    public razaoSocial?: string,
    public cnpjPrincipal?: string,
    public url?: string,
    public prefixo?: string,
    public responsavelNome?: string,
    public responsavelCpf?: string,
    public responsavelEmail?: string,
    public responsavelCelular?: string,
    public pessoas?: IPessoa[],
    public alunos?: IAluno[],
    public unidades?: IUnidade[],
    public grades?: IGrade[],
    public tipoSolicitacaos?: ITipoSolicitacao[]
  ) {}
}
