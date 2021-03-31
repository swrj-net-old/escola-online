import dayjs from 'dayjs';
import { ISolicitacao } from 'app/shared/model/solicitacao.model';
import { IDebito } from 'app/shared/model/debito.model';
import { IChamada } from 'app/shared/model/chamada.model';
import { IMatricula } from 'app/shared/model/matricula.model';
import { IPessoa } from 'app/shared/model/pessoa.model';
import { IEscola } from 'app/shared/model/escola.model';
import { TipoSanguineo } from 'app/shared/model/enumerations/tipo-sanguineo.model';

export interface IAluno {
  id?: number;
  dataNascimento?: string | null;
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

export const defaultValue: Readonly<IAluno> = {};
