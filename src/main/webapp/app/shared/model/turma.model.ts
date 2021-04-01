import { IChamada } from 'app/shared/model/chamada.model';
import { IConteudo } from 'app/shared/model/conteudo.model';
import { IMatricula } from 'app/shared/model/matricula.model';
import { ISerie } from 'app/shared/model/serie.model';
import { IUnidade } from 'app/shared/model/unidade.model';

export interface ITurma {
  id?: number;
  nome?: string;
  chamadas?: IChamada[];
  conteudos?: IConteudo[];
  matriculas?: IMatricula[];
  serieTurma?: ISerie;
  unidadeTurma?: IUnidade;
}

export class Turma implements ITurma {
  constructor(
    public id?: number,
    public nome?: string,
    public chamadas?: IChamada[],
    public conteudos?: IConteudo[],
    public matriculas?: IMatricula[],
    public serieTurma?: ISerie,
    public unidadeTurma?: IUnidade
  ) {}
}
