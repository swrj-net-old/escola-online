import dayjs from 'dayjs';
import { IAluno } from 'app/shared/model/aluno.model';
import { ITurma } from 'app/shared/model/turma.model';
import { IProfessor } from 'app/shared/model/professor.model';

export interface IChamada {
  id?: number;
  dataAula?: string | null;
  observacoes?: string | null;
  alunoChamada?: IAluno | null;
  turmaChamada?: ITurma | null;
  professorChamada?: IProfessor | null;
}

export const defaultValue: Readonly<IChamada> = {};
