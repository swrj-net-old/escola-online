import { IChamada } from 'app/entities/chamada/chamada.model';
import { IConteudo } from 'app/entities/conteudo/conteudo.model';
import { IMatricula } from 'app/entities/matricula/matricula.model';
import { ISerie } from 'app/entities/serie/serie.model';
import { IUnidade } from 'app/entities/unidade/unidade.model';

export interface ITurma {
  id?: number;
  nome?: string | null;
  chamadas?: IChamada[] | null;
  conteudos?: IConteudo[] | null;
  matriculas?: IMatricula[] | null;
  serieTurma?: ISerie | null;
  unidadeTurma?: IUnidade | null;
}

export class Turma implements ITurma {
  constructor(
    public id?: number,
    public nome?: string | null,
    public chamadas?: IChamada[] | null,
    public conteudos?: IConteudo[] | null,
    public matriculas?: IMatricula[] | null,
    public serieTurma?: ISerie | null,
    public unidadeTurma?: IUnidade | null
  ) {}
}

export function getTurmaIdentifier(turma: ITurma): number | undefined {
  return turma.id;
}
