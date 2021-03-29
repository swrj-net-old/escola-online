import * as dayjs from 'dayjs';
import { ITurma } from 'app/entities/turma/turma.model';
import { IProfessor } from 'app/entities/professor/professor.model';
import { IMateria } from 'app/entities/materia/materia.model';

export interface IConteudo {
  id?: number;
  dataAula?: dayjs.Dayjs | null;
  habilidadesCompetencias?: string | null;
  observacoes?: string | null;
  turmaConteudo?: ITurma | null;
  professorConteudo?: IProfessor | null;
  materiaConteudo?: IMateria | null;
}

export class Conteudo implements IConteudo {
  constructor(
    public id?: number,
    public dataAula?: dayjs.Dayjs | null,
    public habilidadesCompetencias?: string | null,
    public observacoes?: string | null,
    public turmaConteudo?: ITurma | null,
    public professorConteudo?: IProfessor | null,
    public materiaConteudo?: IMateria | null
  ) {}
}

export function getConteudoIdentifier(conteudo: IConteudo): number | undefined {
  return conteudo.id;
}
