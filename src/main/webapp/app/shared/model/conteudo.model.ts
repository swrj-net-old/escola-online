import { Moment } from 'moment';
import { ITurma } from 'app/shared/model/turma.model';
import { IProfessor } from 'app/shared/model/professor.model';
import { IMateria } from 'app/shared/model/materia.model';

export interface IConteudo {
  id?: number;
  dataAula?: Moment;
  habilidadesCompetencias?: string;
  observacoes?: string;
  turmaConteudo?: ITurma;
  professorConteudo?: IProfessor;
  materiaConteudo?: IMateria;
}

export class Conteudo implements IConteudo {
  constructor(
    public id?: number,
    public dataAula?: Moment,
    public habilidadesCompetencias?: string,
    public observacoes?: string,
    public turmaConteudo?: ITurma,
    public professorConteudo?: IProfessor,
    public materiaConteudo?: IMateria
  ) {}
}
