import { IDiretor } from 'app/shared/model/diretor.model';
import { IProfessor } from 'app/shared/model/professor.model';
import { ITurma } from 'app/shared/model/turma.model';
import { IEscola } from 'app/shared/model/escola.model';

export interface IUnidade {
  id?: number;
  nome?: string;
  diretors?: IDiretor[];
  professors?: IProfessor[];
  turmas?: ITurma[];
  escolaUnidade?: IEscola;
}

export class Unidade implements IUnidade {
  constructor(
    public id?: number,
    public nome?: string,
    public diretors?: IDiretor[],
    public professors?: IProfessor[],
    public turmas?: ITurma[],
    public escolaUnidade?: IEscola
  ) {}
}
