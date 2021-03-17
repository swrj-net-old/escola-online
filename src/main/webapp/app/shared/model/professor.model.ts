import { Moment } from 'moment';
import { IPessoa } from 'app/shared/model/pessoa.model';
import { IUnidade } from 'app/shared/model/unidade.model';

export interface IProfessor {
  id?: number;
  anoLetivo?: number;
  dataInicio?: Moment;
  dataFim?: Moment;
  pessoaProfessor?: IPessoa;
  unidadeProfessor?: IUnidade;
}

export class Professor implements IProfessor {
  constructor(
    public id?: number,
    public anoLetivo?: number,
    public dataInicio?: Moment,
    public dataFim?: Moment,
    public pessoaProfessor?: IPessoa,
    public unidadeProfessor?: IUnidade
  ) {}
}
