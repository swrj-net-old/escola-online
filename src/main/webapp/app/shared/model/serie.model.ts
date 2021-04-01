import { IGrade } from 'app/shared/model/grade.model';
import { ITurma } from 'app/shared/model/turma.model';

export interface ISerie {
  id?: number;
  nome?: string;
  grades?: IGrade[];
  turmas?: ITurma[];
}

export class Serie implements ISerie {
  constructor(public id?: number, public nome?: string, public grades?: IGrade[], public turmas?: ITurma[]) {}
}
