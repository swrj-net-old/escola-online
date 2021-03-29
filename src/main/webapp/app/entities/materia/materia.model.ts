import { IGrade } from 'app/entities/grade/grade.model';
import { IConteudo } from 'app/entities/conteudo/conteudo.model';

export interface IMateria {
  id?: number;
  nome?: string | null;
  sigla?: string | null;
  grades?: IGrade[] | null;
  conteudos?: IConteudo[] | null;
}

export class Materia implements IMateria {
  constructor(
    public id?: number,
    public nome?: string | null,
    public sigla?: string | null,
    public grades?: IGrade[] | null,
    public conteudos?: IConteudo[] | null
  ) {}
}

export function getMateriaIdentifier(materia: IMateria): number | undefined {
  return materia.id;
}
