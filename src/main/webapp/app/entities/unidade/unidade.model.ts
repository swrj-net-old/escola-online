import { IDiretor } from 'app/entities/diretor/diretor.model';
import { IProfessor } from 'app/entities/professor/professor.model';
import { ITurma } from 'app/entities/turma/turma.model';
import { IEscola } from 'app/entities/escola/escola.model';

export interface IUnidade {
  id?: number;
  nome?: string | null;
  cnpj?: string | null;
  endereco?: string | null;
  complemento?: string | null;
  bairro?: string | null;
  cidade?: string | null;
  cep?: string | null;
  telefoneComercial?: string | null;
  telefoneWhatsapp?: string | null;
  email?: string | null;
  facebook?: string | null;
  observacoes?: string | null;
  diretors?: IDiretor[] | null;
  professors?: IProfessor[] | null;
  turmas?: ITurma[] | null;
  escolaUnidade?: IEscola | null;
}

export class Unidade implements IUnidade {
  constructor(
    public id?: number,
    public nome?: string | null,
    public cnpj?: string | null,
    public endereco?: string | null,
    public complemento?: string | null,
    public bairro?: string | null,
    public cidade?: string | null,
    public cep?: string | null,
    public telefoneComercial?: string | null,
    public telefoneWhatsapp?: string | null,
    public email?: string | null,
    public facebook?: string | null,
    public observacoes?: string | null,
    public diretors?: IDiretor[] | null,
    public professors?: IProfessor[] | null,
    public turmas?: ITurma[] | null,
    public escolaUnidade?: IEscola | null
  ) {}
}

export function getUnidadeIdentifier(unidade: IUnidade): number | undefined {
  return unidade.id;
}
