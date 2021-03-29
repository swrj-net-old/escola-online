import * as dayjs from 'dayjs';
import { IDebito } from 'app/entities/debito/debito.model';
import { IDetalheUsuario } from 'app/entities/detalhe-usuario/detalhe-usuario.model';
import { SituacaoDebito } from 'app/entities/enumerations/situacao-debito.model';

export interface IHistoricoDebito {
  id?: number;
  dataLancamento?: dayjs.Dayjs | null;
  situacaoDebito?: SituacaoDebito | null;
  dataVencimento?: dayjs.Dayjs | null;
  dataPagamento?: dayjs.Dayjs | null;
  valorOriginal?: number | null;
  totalPago?: number | null;
  totalDesconto?: number | null;
  totalDevido?: number | null;
  observacoes?: string | null;
  debitoHistoricoDebito?: IDebito | null;
  detalheUsuarioLancamento?: IDetalheUsuario | null;
}

export class HistoricoDebito implements IHistoricoDebito {
  constructor(
    public id?: number,
    public dataLancamento?: dayjs.Dayjs | null,
    public situacaoDebito?: SituacaoDebito | null,
    public dataVencimento?: dayjs.Dayjs | null,
    public dataPagamento?: dayjs.Dayjs | null,
    public valorOriginal?: number | null,
    public totalPago?: number | null,
    public totalDesconto?: number | null,
    public totalDevido?: number | null,
    public observacoes?: string | null,
    public debitoHistoricoDebito?: IDebito | null,
    public detalheUsuarioLancamento?: IDetalheUsuario | null
  ) {}
}

export function getHistoricoDebitoIdentifier(historicoDebito: IHistoricoDebito): number | undefined {
  return historicoDebito.id;
}
