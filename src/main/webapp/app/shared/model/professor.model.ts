import { Moment } from 'moment';
import { IChamada } from 'app/shared/model/chamada.model';
import { IConteudo } from 'app/shared/model/conteudo.model';
import { IPessoa } from 'app/shared/model/pessoa.model';
import { IUnidade } from 'app/shared/model/unidade.model';

export interface IProfessor {
  id?: number;
  anoLetivo?: number;
  dataInicio?: Moment;
  dataFim?: Moment;
  chamadas?: IChamada[];
  conteudos?: IConteudo[];
  pessoaProfessor?: IPessoa;
  unidadeProfessor?: IUnidade;
}

export class Professor implements IProfessor {
  constructor(
    public id?: number,
    public anoLetivo?: number,
    public dataInicio?: Moment,
    public dataFim?: Moment,
    public chamadas?: IChamada[],
    public conteudos?: IConteudo[],
    public pessoaProfessor?: IPessoa,
    public unidadeProfessor?: IUnidade
  ) {}
}
