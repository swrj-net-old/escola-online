import { Moment } from 'moment';
import { IHistoricoDebito } from 'app/shared/model/historico-debito.model';
import { IAluno } from 'app/shared/model/aluno.model';
import { TipoDebito } from 'app/shared/model/enumerations/tipo-debito.model';
import { SituacaoDebito } from 'app/shared/model/enumerations/situacao-debito.model';

export interface IDebito {
  id?: number;
  tipoDebito?: TipoDebito;
  situacaoDebito?: SituacaoDebito;
  dataVencimento?: Moment;
  dataPagamento?: Moment;
  valorOriginal?: number;
  totalPago?: number;
  totalDesconto?: number;
  totalDevido?: number;
  observacoes?: string;
  historicoDebitos?: IHistoricoDebito[];
  alunoDebito?: IAluno;
}

export class Debito implements IDebito {
  constructor(
    public id?: number,
    public tipoDebito?: TipoDebito,
    public situacaoDebito?: SituacaoDebito,
    public dataVencimento?: Moment,
    public dataPagamento?: Moment,
    public valorOriginal?: number,
    public totalPago?: number,
    public totalDesconto?: number,
    public totalDevido?: number,
    public observacoes?: string,
    public historicoDebitos?: IHistoricoDebito[],
    public alunoDebito?: IAluno
  ) {}
}
