import { ISerie } from 'app/shared/model/serie.model';
import { IMateria } from 'app/shared/model/materia.model';
import { IEscola } from 'app/shared/model/escola.model';

export interface IGrade {
  id?: number;
  anoLetivo?: number | null;
  serieGrade?: ISerie | null;
  materiaGrade?: IMateria | null;
  escolaGrade?: IEscola | null;
}

export const defaultValue: Readonly<IGrade> = {};
