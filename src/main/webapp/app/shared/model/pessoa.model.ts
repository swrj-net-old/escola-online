import { IDiretor } from 'app/shared/model/diretor.model';
import { IProfessor } from 'app/shared/model/professor.model';
import { IAluno } from 'app/shared/model/aluno.model';
import { ICidade } from 'app/shared/model/cidade.model';
import { IEscola } from 'app/shared/model/escola.model';

export interface IPessoa {
  id?: number;
  nome?: string;
  cpf?: string;
  rg?: string;
  endereco?: string;
  complemento?: string;
  bairro?: string;
  cidade?: string;
  cep?: string;
  telefoneCelular?: string;
  telefoneResidencial?: string;
  telefoneComercial?: string;
  email?: string;
  observacoes?: string;
  diretors?: IDiretor[];
  professors?: IProfessor[];
  alunos?: IAluno[];
  cidadePessoa?: ICidade;
  escolaPessoa?: IEscola;
}

export class Pessoa implements IPessoa {
  constructor(
    public id?: number,
    public nome?: string,
    public cpf?: string,
    public rg?: string,
    public endereco?: string,
    public complemento?: string,
    public bairro?: string,
    public cidade?: string,
    public cep?: string,
    public telefoneCelular?: string,
    public telefoneResidencial?: string,
    public telefoneComercial?: string,
    public email?: string,
    public observacoes?: string,
    public diretors?: IDiretor[],
    public professors?: IProfessor[],
    public alunos?: IAluno[],
    public cidadePessoa?: ICidade,
    public escolaPessoa?: IEscola
  ) {}
}
