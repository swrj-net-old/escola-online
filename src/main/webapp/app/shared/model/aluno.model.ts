import { Moment } from 'moment';
import { ISolicitacao } from 'app/shared/model/solicitacao.model';
import { IDebito } from 'app/shared/model/debito.model';
import { IChamada } from 'app/shared/model/chamada.model';
import { IMatricula } from 'app/shared/model/matricula.model';
import { IPessoa } from 'app/shared/model/pessoa.model';
import { IEscola } from 'app/shared/model/escola.model';
import { TipoSanguineo } from 'app/shared/model/enumerations/tipo-sanguineo.model';

export interface IAluno {
  id?: number;
  dataNascimento?: Moment;
  tipoSanguineo?: TipoSanguineo;
  nomePai?: string;
  telefonePai?: string;
  nomeMae?: string;
  telefoneMae?: string;
  nomeResponsavel?: string;
  cpfResponsavel?: string;
  observacoes?: string;
  solicitacaos?: ISolicitacao[];
  debitos?: IDebito[];
  chamadas?: IChamada[];
  matriculas?: IMatricula[];
  pessoaAluno?: IPessoa;
  escolaAluno?: IEscola;
}

export class Aluno implements IAluno {
  constructor(
    public id?: number,
    public dataNascimento?: Moment,
    public tipoSanguineo?: TipoSanguineo,
    public nomePai?: string,
    public telefonePai?: string,
    public nomeMae?: string,
    public telefoneMae?: string,
    public nomeResponsavel?: string,
    public cpfResponsavel?: string,
    public observacoes?: string,
    public solicitacaos?: ISolicitacao[],
    public debitos?: IDebito[],
    public chamadas?: IChamada[],
    public matriculas?: IMatricula[],
    public pessoaAluno?: IPessoa,
    public escolaAluno?: IEscola
  ) {}
}
