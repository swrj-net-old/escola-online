import { ISolicitacao } from 'app/entities/solicitacao/solicitacao.model';

export interface ITipoSolicitacao {
  id?: number;
  nome?: string | null;
  prazoAtendimento?: number | null;
  valorEmissao?: number | null;
  solicitacaos?: ISolicitacao[] | null;
}

export class TipoSolicitacao implements ITipoSolicitacao {
  constructor(
    public id?: number,
    public nome?: string | null,
    public prazoAtendimento?: number | null,
    public valorEmissao?: number | null,
    public solicitacaos?: ISolicitacao[] | null
  ) {}
}

export function getTipoSolicitacaoIdentifier(tipoSolicitacao: ITipoSolicitacao): number | undefined {
  return tipoSolicitacao.id;
}
