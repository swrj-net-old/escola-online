import { IAluno } from 'app/shared/model/aluno.model';
import { IUnidade } from 'app/shared/model/unidade.model';

export interface IEscola {
  id?: number;
  nome?: string;
  alunos?: IAluno[];
  unidades?: IUnidade[];
}

export class Escola implements IEscola {
  constructor(public id?: number, public nome?: string, public alunos?: IAluno[], public unidades?: IUnidade[]) {}
}
