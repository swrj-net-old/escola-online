import { ISerie } from 'app/entities/serie/serie.model';
import { IMateria } from 'app/entities/materia/materia.model';

export interface IGrade {
  id?: number;
  anoLetivo?: number | null;
  serieGrade?: ISerie | null;
  materiaGrade?: IMateria | null;
}

export class Grade implements IGrade {
  constructor(
    public id?: number,
    public anoLetivo?: number | null,
    public serieGrade?: ISerie | null,
    public materiaGrade?: IMateria | null
  ) {}
}

export function getGradeIdentifier(grade: IGrade): number | undefined {
  return grade.id;
}
