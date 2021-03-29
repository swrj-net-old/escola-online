import * as dayjs from 'dayjs';
import { ITipoSolicitacao } from 'app/entities/tipo-solicitacao/tipo-solicitacao.model';
import { IAluno } from 'app/entities/aluno/aluno.model';
import { SituacaoSolicitacao } from 'app/entities/enumerations/situacao-solicitacao.model';

export interface ISolicitacao {
  id?: number;
  situacaoSolicitacao?: SituacaoSolicitacao | null;
  dataSolicitacao?: dayjs.Dayjs | null;
  observacoesSolicitante?: string | null;
  observacoesAtendimento?: string | null;
  tipoSolicitacaoSolicitacao?: ITipoSolicitacao | null;
  alunoSolicitacao?: IAluno | null;
}

export class Solicitacao implements ISolicitacao {
  constructor(
    public id?: number,
    public situacaoSolicitacao?: SituacaoSolicitacao | null,
    public dataSolicitacao?: dayjs.Dayjs | null,
    public observacoesSolicitante?: string | null,
    public observacoesAtendimento?: string | null,
    public tipoSolicitacaoSolicitacao?: ITipoSolicitacao | null,
    public alunoSolicitacao?: IAluno | null
  ) {}
}

export function getSolicitacaoIdentifier(solicitacao: ISolicitacao): number | undefined {
  return solicitacao.id;
}
