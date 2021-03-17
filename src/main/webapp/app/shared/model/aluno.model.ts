import { IMatricula } from 'app/shared/model/matricula.model';
import { IPessoa } from 'app/shared/model/pessoa.model';
import { IEscola } from 'app/shared/model/escola.model';

export interface IAluno {
  id?: number;
  matriculas?: IMatricula[];
  pessoaAluno?: IPessoa;
  escolaAluno?: IEscola;
}

export class Aluno implements IAluno {
  constructor(public id?: number, public matriculas?: IMatricula[], public pessoaAluno?: IPessoa, public escolaAluno?: IEscola) {}
}
