import { ISolicitacao } from 'app/shared/model/solicitacao.model';

export interface ITipoSolicitacao {
  id?: number;
  nome?: string;
  prazoAtendimento?: number;
  valorEmissao?: number;
  solicitacaos?: ISolicitacao[];
}

export class TipoSolicitacao implements ITipoSolicitacao {
  constructor(
    public id?: number,
    public nome?: string,
    public prazoAtendimento?: number,
    public valorEmissao?: number,
    public solicitacaos?: ISolicitacao[]
  ) {}
}
