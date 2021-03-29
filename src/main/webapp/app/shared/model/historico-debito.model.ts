import { Moment } from 'moment';
import { IDebito } from 'app/shared/model/debito.model';
import { IDetalheUsuario } from 'app/shared/model/detalhe-usuario.model';
import { SituacaoDebito } from 'app/shared/model/enumerations/situacao-debito.model';

export interface IHistoricoDebito {
  id?: number;
  dataLancamento?: Moment;
  situacaoDebito?: SituacaoDebito;
  dataVencimento?: Moment;
  dataPagamento?: Moment;
  valorOriginal?: number;
  totalPago?: number;
  totalDesconto?: number;
  totalDevido?: number;
  observacoes?: string;
  debitoHistoricoDebito?: IDebito;
  detalheUsuarioLancamento?: IDetalheUsuario;
}

export class HistoricoDebito implements IHistoricoDebito {
  constructor(
    public id?: number,
    public dataLancamento?: Moment,
    public situacaoDebito?: SituacaoDebito,
    public dataVencimento?: Moment,
    public dataPagamento?: Moment,
    public valorOriginal?: number,
    public totalPago?: number,
    public totalDesconto?: number,
    public totalDevido?: number,
    public observacoes?: string,
    public debitoHistoricoDebito?: IDebito,
    public detalheUsuarioLancamento?: IDetalheUsuario
  ) {}
}
