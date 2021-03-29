import * as dayjs from 'dayjs';
import { IAluno } from 'app/entities/aluno/aluno.model';
import { ITurma } from 'app/entities/turma/turma.model';
import { IProfessor } from 'app/entities/professor/professor.model';

export interface IChamada {
  id?: number;
  dataAula?: dayjs.Dayjs | null;
  observacoes?: string | null;
  alunoChamada?: IAluno | null;
  turmaChamada?: ITurma | null;
  professorChamada?: IProfessor | null;
}

export class Chamada implements IChamada {
  constructor(
    public id?: number,
    public dataAula?: dayjs.Dayjs | null,
    public observacoes?: string | null,
    public alunoChamada?: IAluno | null,
    public turmaChamada?: ITurma | null,
    public professorChamada?: IProfessor | null
  ) {}
}

export function getChamadaIdentifier(chamada: IChamada): number | undefined {
  return chamada.id;
}
