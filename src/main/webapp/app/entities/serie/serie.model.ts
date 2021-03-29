import { IGrade } from 'app/entities/grade/grade.model';
import { ITurma } from 'app/entities/turma/turma.model';

export interface ISerie {
  id?: number;
  nome?: string | null;
  grades?: IGrade[] | null;
  turmas?: ITurma[] | null;
}

export class Serie implements ISerie {
  constructor(public id?: number, public nome?: string | null, public grades?: IGrade[] | null, public turmas?: ITurma[] | null) {}
}

export function getSerieIdentifier(serie: ISerie): number | undefined {
  return serie.id;
}
