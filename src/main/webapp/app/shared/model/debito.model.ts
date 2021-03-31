import dayjs from 'dayjs';
import { IHistoricoDebito } from 'app/shared/model/historico-debito.model';
import { IAluno } from 'app/shared/model/aluno.model';
import { TipoDebito } from 'app/shared/model/enumerations/tipo-debito.model';
import { SituacaoDebito } from 'app/shared/model/enumerations/situacao-debito.model';

export interface IDebito {
  id?: number;
  tipoDebito?: TipoDebito | null;
  situacaoDebito?: SituacaoDebito | null;
  dataVencimento?: string | null;
  dataPagamento?: string | null;
  valorOriginal?: number | null;
  totalPago?: number | null;
  totalDesconto?: number | null;
  totalDevido?: number | null;
  observacoes?: string | null;
  historicoDebitos?: IHistoricoDebito[] | null;
  alunoDebito?: IAluno | null;
}

export const defaultValue: Readonly<IDebito> = {};
