import { IPessoa } from 'app/shared/model/pessoa.model';
import { UF } from 'app/shared/model/enumerations/uf.model';

export interface ICidade {
  id?: number;
  nome?: string;
  uf?: UF;
  pessoas?: IPessoa[];
}

export class Cidade implements ICidade {
  constructor(public id?: number, public nome?: string, public uf?: UF, public pessoas?: IPessoa[]) {}
}
