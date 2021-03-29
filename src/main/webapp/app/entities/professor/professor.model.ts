import * as dayjs from 'dayjs';
import { IChamada } from 'app/entities/chamada/chamada.model';
import { IConteudo } from 'app/entities/conteudo/conteudo.model';
import { IPessoa } from 'app/entities/pessoa/pessoa.model';
import { IUnidade } from 'app/entities/unidade/unidade.model';

export interface IProfessor {
  id?: number;
  anoLetivo?: number | null;
  dataInicio?: dayjs.Dayjs | null;
  dataFim?: dayjs.Dayjs | null;
  chamadas?: IChamada[] | null;
  conteudos?: IConteudo[] | null;
  pessoaProfessor?: IPessoa | null;
  unidadeProfessor?: IUnidade | null;
}

export class Professor implements IProfessor {
  constructor(
    public id?: number,
    public anoLetivo?: number | null,
    public dataInicio?: dayjs.Dayjs | null,
    public dataFim?: dayjs.Dayjs | null,
    public chamadas?: IChamada[] | null,
    public conteudos?: IConteudo[] | null,
    public pessoaProfessor?: IPessoa | null,
    public unidadeProfessor?: IUnidade | null
  ) {}
}

export function getProfessorIdentifier(professor: IProfessor): number | undefined {
  return professor.id;
}
