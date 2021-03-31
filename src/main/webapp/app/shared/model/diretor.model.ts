import dayjs from 'dayjs';
import { IPessoa } from 'app/shared/model/pessoa.model';
import { IUnidade } from 'app/shared/model/unidade.model';

export interface IDiretor {
  id?: number;
  anoLetivo?: number | null;
  dataInicio?: string | null;
  dataFim?: string | null;
  pessoaDiretor?: IPessoa | null;
  unidadeDiretor?: IUnidade | null;
}

export const defaultValue: Readonly<IDiretor> = {};
