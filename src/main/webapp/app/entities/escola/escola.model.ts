import { IPessoa } from 'app/entities/pessoa/pessoa.model';
import { IAluno } from 'app/entities/aluno/aluno.model';
import { IUnidade } from 'app/entities/unidade/unidade.model';

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
}

export class Escola implements IEscola {
  constructor(
    public id?: number,
    public nome?: string | null,
    public razaoSocial?: string | null,
    public cnpjPrincipal?: string | null,
    public url?: string | null,
    public prefixo?: string | null,
    public responsavelNome?: string | null,
    public responsavelCpf?: string | null,
    public responsavelEmail?: string | null,
    public responsavelCelular?: string | null,
    public pessoas?: IPessoa[] | null,
    public alunos?: IAluno[] | null,
    public unidades?: IUnidade[] | null
  ) {}
}

export function getEscolaIdentifier(escola: IEscola): number | undefined {
  return escola.id;
}
