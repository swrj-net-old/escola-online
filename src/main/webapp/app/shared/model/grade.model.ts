import { ISerie } from 'app/shared/model/serie.model';
import { IMateria } from 'app/shared/model/materia.model';
import { IEscola } from 'app/shared/model/escola.model';

export interface IGrade {
  id?: number;
  anoLetivo?: number;
  serieGrade?: ISerie;
  materiaGrade?: IMateria;
  escolaGrade?: IEscola;
}

export class Grade implements IGrade {
  constructor(
    public id?: number,
    public anoLetivo?: number,
    public serieGrade?: ISerie,
    public materiaGrade?: IMateria,
    public escolaGrade?: IEscola
  ) {}
}
