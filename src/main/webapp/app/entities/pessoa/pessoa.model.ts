import { IDiretor } from 'app/entities/diretor/diretor.model';
import { IProfessor } from 'app/entities/professor/professor.model';
import { IAluno } from 'app/entities/aluno/aluno.model';
import { ICidade } from 'app/entities/cidade/cidade.model';
import { IEscola } from 'app/entities/escola/escola.model';

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

export class Pessoa implements IPessoa {
  constructor(
    public id?: number,
    public nome?: string | null,
    public cpf?: string | null,
    public rg?: string | null,
    public endereco?: string | null,
    public complemento?: string | null,
    public bairro?: string | null,
    public cidade?: string | null,
    public cep?: string | null,
    public telefoneCelular?: string | null,
    public telefoneResidencial?: string | null,
    public telefoneComercial?: string | null,
    public email?: string | null,
    public observacoes?: string | null,
    public diretors?: IDiretor[] | null,
    public professors?: IProfessor[] | null,
    public alunos?: IAluno[] | null,
    public cidadePessoa?: ICidade | null,
    public escolaPessoa?: IEscola | null
  ) {}
}

export function getPessoaIdentifier(pessoa: IPessoa): number | undefined {
  return pessoa.id;
}
