import { IPessoa } from 'app/entities/pessoa/pessoa.model';
import { UF } from 'app/entities/enumerations/uf.model';

export interface ICidade {
  id?: number;
  nome?: string | null;
  uf?: UF | null;
  pessoas?: IPessoa[] | null;
}

export class Cidade implements ICidade {
  constructor(public id?: number, public nome?: string | null, public uf?: UF | null, public pessoas?: IPessoa[] | null) {}
}

export function getCidadeIdentifier(cidade: ICidade): number | undefined {
  return cidade.id;
}
