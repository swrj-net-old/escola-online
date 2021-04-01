import { IGrade } from 'app/shared/model/grade.model';
import { IConteudo } from 'app/shared/model/conteudo.model';

export interface IMateria {
  id?: number;
  nome?: string;
  sigla?: string;
  grades?: IGrade[];
  conteudos?: IConteudo[];
}

export class Materia implements IMateria {
  constructor(public id?: number, public nome?: string, public sigla?: string, public grades?: IGrade[], public conteudos?: IConteudo[]) {}
}
