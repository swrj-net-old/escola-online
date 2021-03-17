import { IMatricula } from 'app/shared/model/matricula.model';
import { IUnidade } from 'app/shared/model/unidade.model';

export interface ITurma {
  id?: number;
  nome?: string;
  matriculas?: IMatricula[];
  unidadeTurma?: IUnidade;
}

export class Turma implements ITurma {
  constructor(public id?: number, public nome?: string, public matriculas?: IMatricula[], public unidadeTurma?: IUnidade) {}
}
