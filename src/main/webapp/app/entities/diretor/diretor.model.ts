import * as dayjs from 'dayjs';
import { IPessoa } from 'app/entities/pessoa/pessoa.model';
import { IUnidade } from 'app/entities/unidade/unidade.model';

export interface IDiretor {
  id?: number;
  anoLetivo?: number | null;
  dataInicio?: dayjs.Dayjs | null;
  dataFim?: dayjs.Dayjs | null;
  pessoaDiretor?: IPessoa | null;
  unidadeDiretor?: IUnidade | null;
}

export class Diretor implements IDiretor {
  constructor(
    public id?: number,
    public anoLetivo?: number | null,
    public dataInicio?: dayjs.Dayjs | null,
    public dataFim?: dayjs.Dayjs | null,
    public pessoaDiretor?: IPessoa | null,
    public unidadeDiretor?: IUnidade | null
  ) {}
}

export function getDiretorIdentifier(diretor: IDiretor): number | undefined {
  return diretor.id;
}
