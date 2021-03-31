import dayjs from 'dayjs';
import { IDebito } from 'app/shared/model/debito.model';
import { IDetalheUsuario } from 'app/shared/model/detalhe-usuario.model';
import { SituacaoDebito } from 'app/shared/model/enumerations/situacao-debito.model';

export interface IHistoricoDebito {
  id?: number;
  dataLancamento?: string | null;
  situacaoDebito?: SituacaoDebito | null;
  dataVencimento?: string | null;
  dataPagamento?: string | null;
  valorOriginal?: number | null;
  totalPago?: number | null;
  totalDesconto?: number | null;
  totalDevido?: number | null;
  observacoes?: string | null;
  debitoHistoricoDebito?: IDebito | null;
  detalheUsuarioLancamento?: IDetalheUsuario | null;
}

export const defaultValue: Readonly<IHistoricoDebito> = {};
