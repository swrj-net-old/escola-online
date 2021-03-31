import { IGrade } from 'app/shared/model/grade.model';
import { ITurma } from 'app/shared/model/turma.model';

export interface ISerie {
  id?: number;
  nome?: string | null;
  grades?: IGrade[] | null;
  turmas?: ITurma[] | null;
}

export const defaultValue: Readonly<ISerie> = {};
