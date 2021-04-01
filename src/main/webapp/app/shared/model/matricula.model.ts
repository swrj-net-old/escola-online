import { Moment } from 'moment';
import { ITurma } from 'app/shared/model/turma.model';
import { IAluno } from 'app/shared/model/aluno.model';

export interface IMatricula {
  id?: number;
  anoLetivo?: number;
  dataInicio?: Moment;
  dataFim?: Moment;
  turmaMatricula?: ITurma;
  alunoMatricula?: IAluno;
}

export class Matricula implements IMatricula {
  constructor(
    public id?: number,
    public anoLetivo?: number,
    public dataInicio?: Moment,
    public dataFim?: Moment,
    public turmaMatricula?: ITurma,
    public alunoMatricula?: IAluno
  ) {}
}
