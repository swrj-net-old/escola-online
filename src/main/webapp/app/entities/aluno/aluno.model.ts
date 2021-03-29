import * as dayjs from 'dayjs';
import { ISolicitacao } from 'app/entities/solicitacao/solicitacao.model';
import { IDebito } from 'app/entities/debito/debito.model';
import { IChamada } from 'app/entities/chamada/chamada.model';
import { IMatricula } from 'app/entities/matricula/matricula.model';
import { IPessoa } from 'app/entities/pessoa/pessoa.model';
import { IEscola } from 'app/entities/escola/escola.model';
import { TipoSanguineo } from 'app/entities/enumerations/tipo-sanguineo.model';

export interface IAluno {
  id?: number;
  dataNascimento?: dayjs.Dayjs | null;
  tipoSanguineo?: TipoSanguineo | null;
  nomePai?: string | null;
  telefonePai?: string | null;
  nomeMae?: string | null;
  telefoneMae?: string | null;
  nomeResponsavel?: string | null;
  cpfResponsavel?: string | null;
  observacoes?: string | null;
  solicitacaos?: ISolicitacao[] | null;
  debitos?: IDebito[] | null;
  chamadas?: IChamada[] | null;
  matriculas?: IMatricula[] | null;
  pessoaAluno?: IPessoa | null;
  escolaAluno?: IEscola | null;
}

export class Aluno implements IAluno {
  constructor(
    public id?: number,
    public dataNascimento?: dayjs.Dayjs | null,
    public tipoSanguineo?: TipoSanguineo | null,
    public nomePai?: string | null,
    public telefonePai?: string | null,
    public nomeMae?: string | null,
    public telefoneMae?: string | null,
    public nomeResponsavel?: string | null,
    public cpfResponsavel?: string | null,
    public observacoes?: string | null,
    public solicitacaos?: ISolicitacao[] | null,
    public debitos?: IDebito[] | null,
    public chamadas?: IChamada[] | null,
    public matriculas?: IMatricula[] | null,
    public pessoaAluno?: IPessoa | null,
    public escolaAluno?: IEscola | null
  ) {}
}

export function getAlunoIdentifier(aluno: IAluno): number | undefined {
  return aluno.id;
}
