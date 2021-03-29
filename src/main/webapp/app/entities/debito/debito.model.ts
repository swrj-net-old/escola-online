import * as dayjs from 'dayjs';
import { IHistoricoDebito } from 'app/entities/historico-debito/historico-debito.model';
import { IAluno } from 'app/entities/aluno/aluno.model';
import { TipoDebito } from 'app/entities/enumerations/tipo-debito.model';
import { SituacaoDebito } from 'app/entities/enumerations/situacao-debito.model';

export interface IDebito {
  id?: number;
  tipoDebito?: TipoDebito | null;
  situacaoDebito?: SituacaoDebito | null;
  dataVencimento?: dayjs.Dayjs | null;
  dataPagamento?: dayjs.Dayjs | null;
  valorOriginal?: number | null;
  totalPago?: number | null;
  totalDesconto?: number | null;
  totalDevido?: number | null;
  observacoes?: string | null;
  historicoDebitos?: IHistoricoDebito[] | null;
  alunoDebito?: IAluno | null;
}

export class Debito implements IDebito {
  constructor(
    public id?: number,
    public tipoDebito?: TipoDebito | null,
    public situacaoDebito?: SituacaoDebito | null,
    public dataVencimento?: dayjs.Dayjs | null,
    public dataPagamento?: dayjs.Dayjs | null,
    public valorOriginal?: number | null,
    public totalPago?: number | null,
    public totalDesconto?: number | null,
    public totalDevido?: number | null,
    public observacoes?: string | null,
    public historicoDebitos?: IHistoricoDebito[] | null,
    public alunoDebito?: IAluno | null
  ) {}
}

export function getDebitoIdentifier(debito: IDebito): number | undefined {
  return debito.id;
}
