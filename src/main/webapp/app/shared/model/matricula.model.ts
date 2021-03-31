import dayjs from 'dayjs';
import { ITurma } from 'app/shared/model/turma.model';
import { IAluno } from 'app/shared/model/aluno.model';

export interface IMatricula {
  id?: number;
  anoLetivo?: number | null;
  dataInicio?: string | null;
  dataFim?: string | null;
  turmaMatricula?: ITurma | null;
  alunoMatricula?: IAluno | null;
}

export const defaultValue: Readonly<IMatricula> = {};
