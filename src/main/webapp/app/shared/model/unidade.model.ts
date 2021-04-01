import { IDiretor } from 'app/shared/model/diretor.model';
import { IProfessor } from 'app/shared/model/professor.model';
import { ITurma } from 'app/shared/model/turma.model';
import { IEscola } from 'app/shared/model/escola.model';

export interface IUnidade {
  id?: number;
  nome?: string;
  cnpj?: string;
  endereco?: string;
  complemento?: string;
  bairro?: string;
  cidade?: string;
  cep?: string;
  telefoneComercial?: string;
  telefoneWhatsapp?: string;
  email?: string;
  facebook?: string;
  observacoes?: string;
  diretors?: IDiretor[];
  professors?: IProfessor[];
  turmas?: ITurma[];
  escolaUnidade?: IEscola;
}

export class Unidade implements IUnidade {
  constructor(
    public id?: number,
    public nome?: string,
    public cnpj?: string,
    public endereco?: string,
    public complemento?: string,
    public bairro?: string,
    public cidade?: string,
    public cep?: string,
    public telefoneComercial?: string,
    public telefoneWhatsapp?: string,
    public email?: string,
    public facebook?: string,
    public observacoes?: string,
    public diretors?: IDiretor[],
    public professors?: IProfessor[],
    public turmas?: ITurma[],
    public escolaUnidade?: IEscola
  ) {}
}
