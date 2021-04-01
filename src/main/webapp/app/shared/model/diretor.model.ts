import { Moment } from 'moment';
import { IPessoa } from 'app/shared/model/pessoa.model';
import { IUnidade } from 'app/shared/model/unidade.model';

export interface IDiretor {
  id?: number;
  anoLetivo?: number;
  dataInicio?: Moment;
  dataFim?: Moment;
  pessoaDiretor?: IPessoa;
  unidadeDiretor?: IUnidade;
}

export class Diretor implements IDiretor {
  constructor(
    public id?: number,
    public anoLetivo?: number,
    public dataInicio?: Moment,
    public dataFim?: Moment,
    public pessoaDiretor?: IPessoa,
    public unidadeDiretor?: IUnidade
  ) {}
}
