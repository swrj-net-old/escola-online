import { IGrade } from 'app/shared/model/grade.model';
import { IConteudo } from 'app/shared/model/conteudo.model';

export interface IMateria {
  id?: number;
  nome?: string | null;
  sigla?: string | null;
  grades?: IGrade[] | null;
  conteudos?: IConteudo[] | null;
}

export const defaultValue: Readonly<IMateria> = {};
