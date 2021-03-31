import { IDiretor } from 'app/shared/model/diretor.model';
import { IProfessor } from 'app/shared/model/professor.model';
import { ITurma } from 'app/shared/model/turma.model';
import { IEscola } from 'app/shared/model/escola.model';

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

export const defaultValue: Readonly<IUnidade> = {};
