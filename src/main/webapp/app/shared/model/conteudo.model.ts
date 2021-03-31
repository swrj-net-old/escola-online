import dayjs from 'dayjs';
import { ITurma } from 'app/shared/model/turma.model';
import { IProfessor } from 'app/shared/model/professor.model';
import { IMateria } from 'app/shared/model/materia.model';

export interface IConteudo {
  id?: number;
  dataAula?: string | null;
  habilidadesCompetencias?: string | null;
  observacoes?: string | null;
  turmaConteudo?: ITurma | null;
  professorConteudo?: IProfessor | null;
  materiaConteudo?: IMateria | null;
}

export const defaultValue: Readonly<IConteudo> = {};
