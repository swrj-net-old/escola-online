import dayjs from 'dayjs';
import { ITipoSolicitacao } from 'app/shared/model/tipo-solicitacao.model';
import { IAluno } from 'app/shared/model/aluno.model';
import { SituacaoSolicitacao } from 'app/shared/model/enumerations/situacao-solicitacao.model';

export interface ISolicitacao {
  id?: number;
  situacaoSolicitacao?: SituacaoSolicitacao | null;
  dataSolicitacao?: string | null;
  observacoesSolicitante?: string | null;
  observacoesAtendimento?: string | null;
  tipoSolicitacaoSolicitacao?: ITipoSolicitacao | null;
  alunoSolicitacao?: IAluno | null;
}

export const defaultValue: Readonly<ISolicitacao> = {};
