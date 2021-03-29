package com.swrj.net.escolaonline.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;

/**
 * A Pessoa.
 */
@Entity
@Table(name = "pessoa")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class Pessoa implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "nome")
    private String nome;

    @Column(name = "cpf")
    private String cpf;

    @Column(name = "rg")
    private String rg;

    @Column(name = "endereco")
    private String endereco;

    @Column(name = "complemento")
    private String complemento;

    @Column(name = "bairro")
    private String bairro;

    @Column(name = "cidade")
    private String cidade;

    @Column(name = "cep")
    private String cep;

    @Column(name = "telefone_celular")
    private String telefoneCelular;

    @Column(name = "telefone_residencial")
    private String telefoneResidencial;

    @Column(name = "telefone_comercial")
    private String telefoneComercial;

    @Column(name = "email")
    private String email;

    @Column(name = "observacoes")
    private String observacoes;

    @OneToMany(mappedBy = "pessoaDiretor")
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    private Set<Diretor> diretors = new HashSet<>();

    @OneToMany(mappedBy = "pessoaProfessor")
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    private Set<Professor> professors = new HashSet<>();

    @OneToMany(mappedBy = "pessoaAluno")
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    private Set<Aluno> alunos = new HashSet<>();

    @ManyToOne
    @JsonIgnoreProperties(value = "pessoas", allowSetters = true)
    private Cidade cidadePessoa;

    @ManyToOne
    @JsonIgnoreProperties(value = "pessoas", allowSetters = true)
    private Escola escolaPessoa;

    // jhipster-needle-entity-add-field - JHipster will add fields here
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNome() {
        return nome;
    }

    public Pessoa nome(String nome) {
        this.nome = nome;
        return this;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public String getCpf() {
        return cpf;
    }

    public Pessoa cpf(String cpf) {
        this.cpf = cpf;
        return this;
    }

    public void setCpf(String cpf) {
        this.cpf = cpf;
    }

    public String getRg() {
        return rg;
    }

    public Pessoa rg(String rg) {
        this.rg = rg;
        return this;
    }

    public void setRg(String rg) {
        this.rg = rg;
    }

    public String getEndereco() {
        return endereco;
    }

    public Pessoa endereco(String endereco) {
        this.endereco = endereco;
        return this;
    }

    public void setEndereco(String endereco) {
        this.endereco = endereco;
    }

    public String getComplemento() {
        return complemento;
    }

    public Pessoa complemento(String complemento) {
        this.complemento = complemento;
        return this;
    }

    public void setComplemento(String complemento) {
        this.complemento = complemento;
    }

    public String getBairro() {
        return bairro;
    }

    public Pessoa bairro(String bairro) {
        this.bairro = bairro;
        return this;
    }

    public void setBairro(String bairro) {
        this.bairro = bairro;
    }

    public String getCidade() {
        return cidade;
    }

    public Pessoa cidade(String cidade) {
        this.cidade = cidade;
        return this;
    }

    public void setCidade(String cidade) {
        this.cidade = cidade;
    }

    public String getCep() {
        return cep;
    }

    public Pessoa cep(String cep) {
        this.cep = cep;
        return this;
    }

    public void setCep(String cep) {
        this.cep = cep;
    }

    public String getTelefoneCelular() {
        return telefoneCelular;
    }

    public Pessoa telefoneCelular(String telefoneCelular) {
        this.telefoneCelular = telefoneCelular;
        return this;
    }

    public void setTelefoneCelular(String telefoneCelular) {
        this.telefoneCelular = telefoneCelular;
    }

    public String getTelefoneResidencial() {
        return telefoneResidencial;
    }

    public Pessoa telefoneResidencial(String telefoneResidencial) {
        this.telefoneResidencial = telefoneResidencial;
        return this;
    }

    public void setTelefoneResidencial(String telefoneResidencial) {
        this.telefoneResidencial = telefoneResidencial;
    }

    public String getTelefoneComercial() {
        return telefoneComercial;
    }

    public Pessoa telefoneComercial(String telefoneComercial) {
        this.telefoneComercial = telefoneComercial;
        return this;
    }

    public void setTelefoneComercial(String telefoneComercial) {
        this.telefoneComercial = telefoneComercial;
    }

    public String getEmail() {
        return email;
    }

    public Pessoa email(String email) {
        this.email = email;
        return this;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getObservacoes() {
        return observacoes;
    }

    public Pessoa observacoes(String observacoes) {
        this.observacoes = observacoes;
        return this;
    }

    public void setObservacoes(String observacoes) {
        this.observacoes = observacoes;
    }

    public Set<Diretor> getDiretors() {
        return diretors;
    }

    public Pessoa diretors(Set<Diretor> diretors) {
        this.diretors = diretors;
        return this;
    }

    public Pessoa addDiretor(Diretor diretor) {
        this.diretors.add(diretor);
        diretor.setPessoaDiretor(this);
        return this;
    }

    public Pessoa removeDiretor(Diretor diretor) {
        this.diretors.remove(diretor);
        diretor.setPessoaDiretor(null);
        return this;
    }

    public void setDiretors(Set<Diretor> diretors) {
        this.diretors = diretors;
    }

    public Set<Professor> getProfessors() {
        return professors;
    }

    public Pessoa professors(Set<Professor> professors) {
        this.professors = professors;
        return this;
    }

    public Pessoa addProfessor(Professor professor) {
        this.professors.add(professor);
        professor.setPessoaProfessor(this);
        return this;
    }

    public Pessoa removeProfessor(Professor professor) {
        this.professors.remove(professor);
        professor.setPessoaProfessor(null);
        return this;
    }

    public void setProfessors(Set<Professor> professors) {
        this.professors = professors;
    }

    public Set<Aluno> getAlunos() {
        return alunos;
    }

    public Pessoa alunos(Set<Aluno> alunos) {
        this.alunos = alunos;
        return this;
    }

    public Pessoa addAluno(Aluno aluno) {
        this.alunos.add(aluno);
        aluno.setPessoaAluno(this);
        return this;
    }

    public Pessoa removeAluno(Aluno aluno) {
        this.alunos.remove(aluno);
        aluno.setPessoaAluno(null);
        return this;
    }

    public void setAlunos(Set<Aluno> alunos) {
        this.alunos = alunos;
    }

    public Cidade getCidadePessoa() {
        return cidadePessoa;
    }

    public Pessoa cidadePessoa(Cidade cidade) {
        this.cidadePessoa = cidade;
        return this;
    }

    public void setCidadePessoa(Cidade cidade) {
        this.cidadePessoa = cidade;
    }

    public Escola getEscolaPessoa() {
        return escolaPessoa;
    }

    public Pessoa escolaPessoa(Escola escola) {
        this.escolaPessoa = escola;
        return this;
    }

    public void setEscolaPessoa(Escola escola) {
        this.escolaPessoa = escola;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Pessoa)) {
            return false;
        }
        return id != null && id.equals(((Pessoa) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Pessoa{" +
            "id=" + getId() +
            ", nome='" + getNome() + "'" +
            ", cpf='" + getCpf() + "'" +
            ", rg='" + getRg() + "'" +
            ", endereco='" + getEndereco() + "'" +
            ", complemento='" + getComplemento() + "'" +
            ", bairro='" + getBairro() + "'" +
            ", cidade='" + getCidade() + "'" +
            ", cep='" + getCep() + "'" +
            ", telefoneCelular='" + getTelefoneCelular() + "'" +
            ", telefoneResidencial='" + getTelefoneResidencial() + "'" +
            ", telefoneComercial='" + getTelefoneComercial() + "'" +
            ", email='" + getEmail() + "'" +
            ", observacoes='" + getObservacoes() + "'" +
            "}";
    }
}
