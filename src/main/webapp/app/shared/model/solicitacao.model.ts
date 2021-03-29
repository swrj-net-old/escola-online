import { Moment } from 'moment';
import { ITipoSolicitacao } from 'app/shared/model/tipo-solicitacao.model';
import { IAluno } from 'app/shared/model/aluno.model';
import { SituacaoSolicitacao } from 'app/shared/model/enumerations/situacao-solicitacao.model';

export interface ISolicitacao {
  id?: number;
  situacaoSolicitacao?: SituacaoSolicitacao;
  dataSolicitacao?: Moment;
  observacoesSolicitante?: string;
  observacoesAtendimento?: string;
  tipoSolicitacaoSolicitacao?: ITipoSolicitacao;
  alunoSolicitacao?: IAluno;
}

export class Solicitacao implements ISolicitacao {
  constructor(
    public id?: number,
    public situacaoSolicitacao?: SituacaoSolicitacao,
    public dataSolicitacao?: Moment,
    public observacoesSolicitante?: string,
    public observacoesAtendimento?: string,
    public tipoSolicitacaoSolicitacao?: ITipoSolicitacao,
    public alunoSolicitacao?: IAluno
  ) {}
}
