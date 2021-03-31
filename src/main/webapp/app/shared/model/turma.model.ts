import { IChamada } from 'app/shared/model/chamada.model';
import { IConteudo } from 'app/shared/model/conteudo.model';
import { IMatricula } from 'app/shared/model/matricula.model';
import { ISerie } from 'app/shared/model/serie.model';
import { IUnidade } from 'app/shared/model/unidade.model';

export interface ITurma {
  id?: number;
  nome?: string | null;
  chamadas?: IChamada[] | null;
  conteudos?: IConteudo[] | null;
  matriculas?: IMatricula[] | null;
  serieTurma?: ISerie | null;
  unidadeTurma?: IUnidade | null;
}

export const defaultValue: Readonly<ITurma> = {};
