import { ISolicitacao } from 'app/shared/model/solicitacao.model';
import { IEscola } from 'app/shared/model/escola.model';

export interface ITipoSolicitacao {
  id?: number;
  nome?: string;
  prazoAtendimento?: number;
  valorEmissao?: number;
  solicitacaos?: ISolicitacao[];
  escolaTipoSolicitacao?: IEscola;
}

export class TipoSolicitacao implements ITipoSolicitacao {
  constructor(
    public id?: number,
    public nome?: string,
    public prazoAtendimento?: number,
    public valorEmissao?: number,
    public solicitacaos?: ISolicitacao[],
    public escolaTipoSolicitacao?: IEscola
  ) {}
}
