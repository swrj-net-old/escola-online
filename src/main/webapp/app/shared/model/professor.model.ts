import dayjs from 'dayjs';
import { IChamada } from 'app/shared/model/chamada.model';
import { IConteudo } from 'app/shared/model/conteudo.model';
import { IPessoa } from 'app/shared/model/pessoa.model';
import { IUnidade } from 'app/shared/model/unidade.model';

export interface IProfessor {
  id?: number;
  anoLetivo?: number | null;
  dataInicio?: string | null;
  dataFim?: string | null;
  chamadas?: IChamada[] | null;
  conteudos?: IConteudo[] | null;
  pessoaProfessor?: IPessoa | null;
  unidadeProfessor?: IUnidade | null;
}

export const defaultValue: Readonly<IProfessor> = {};
