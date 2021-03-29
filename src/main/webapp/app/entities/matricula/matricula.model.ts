import * as dayjs from 'dayjs';
import { ITurma } from 'app/entities/turma/turma.model';
import { IAluno } from 'app/entities/aluno/aluno.model';

export interface IMatricula {
  id?: number;
  anoLetivo?: number | null;
  dataInicio?: dayjs.Dayjs | null;
  dataFim?: dayjs.Dayjs | null;
  turmaMatricula?: ITurma | null;
  alunoMatricula?: IAluno | null;
}

export class Matricula implements IMatricula {
  constructor(
    public id?: number,
    public anoLetivo?: number | null,
    public dataInicio?: dayjs.Dayjs | null,
    public dataFim?: dayjs.Dayjs | null,
    public turmaMatricula?: ITurma | null,
    public alunoMatricula?: IAluno | null
  ) {}
}

export function getMatriculaIdentifier(matricula: IMatricula): number | undefined {
  return matricula.id;
}
