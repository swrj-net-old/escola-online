import { ISolicitacao } from 'app/shared/model/solicitacao.model';
import { IEscola } from 'app/shared/model/escola.model';

export interface ITipoSolicitacao {
  id?: number;
  nome?: string | null;
  prazoAtendimento?: number | null;
  valorEmissao?: number | null;
  solicitacaos?: ISolicitacao[] | null;
  escolaTipoSolicitacao?: IEscola | null;
}

export const defaultValue: Readonly<ITipoSolicitacao> = {};
