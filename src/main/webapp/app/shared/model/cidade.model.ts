import { IPessoa } from 'app/shared/model/pessoa.model';
import { UF } from 'app/shared/model/enumerations/uf.model';

export interface ICidade {
  id?: number;
  nome?: string | null;
  uf?: UF | null;
  pessoas?: IPessoa[] | null;
}

export const defaultValue: Readonly<ICidade> = {};
