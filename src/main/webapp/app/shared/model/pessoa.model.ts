import { IDiretor } from 'app/shared/model/diretor.model';
import { IProfessor } from 'app/shared/model/professor.model';
import { IAluno } from 'app/shared/model/aluno.model';
import { ICidade } from 'app/shared/model/cidade.model';
import { IEscola } from 'app/shared/model/escola.model';

export interface IPessoa {
  id?: number;
  nome?: string | null;
  cpf?: string | null;
  rg?: string | null;
  endereco?: string | null;
  complemento?: string | null;
  bairro?: string | null;
  cidade?: string | null;
  cep?: string | null;
  telefoneCelular?: string | null;
  telefoneResidencial?: string | null;
  telefoneComercial?: string | null;
  email?: string | null;
  observacoes?: string | null;
  diretors?: IDiretor[] | null;
  professors?: IProfessor[] | null;
  alunos?: IAluno[] | null;
  cidadePessoa?: ICidade | null;
  escolaPessoa?: IEscola | null;
}

export const defaultValue: Readonly<IPessoa> = {};
