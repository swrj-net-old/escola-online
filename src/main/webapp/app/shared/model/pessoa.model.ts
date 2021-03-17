import { IDiretor } from 'app/shared/model/diretor.model';
import { IProfessor } from 'app/shared/model/professor.model';
import { IAluno } from 'app/shared/model/aluno.model';

export interface IPessoa {
  id?: number;
  nome?: string;
  diretors?: IDiretor[];
  professors?: IProfessor[];
  alunos?: IAluno[];
}

export class Pessoa implements IPessoa {
  constructor(
    public id?: number,
    public nome?: string,
    public diretors?: IDiretor[],
    public professors?: IProfessor[],
    public alunos?: IAluno[]
  ) {}
}
