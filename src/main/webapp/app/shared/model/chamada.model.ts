import { Moment } from 'moment';
import { IAluno } from 'app/shared/model/aluno.model';
import { ITurma } from 'app/shared/model/turma.model';
import { IProfessor } from 'app/shared/model/professor.model';

export interface IChamada {
  id?: number;
  dataAula?: Moment;
  observacoes?: string;
  alunoChamada?: IAluno;
  turmaChamada?: ITurma;
  professorChamada?: IProfessor;
}

export class Chamada implements IChamada {
  constructor(
    public id?: number,
    public dataAula?: Moment,
    public observacoes?: string,
    public alunoChamada?: IAluno,
    public turmaChamada?: ITurma,
    public professorChamada?: IProfessor
  ) {}
}
