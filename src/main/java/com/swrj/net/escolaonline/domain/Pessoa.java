package com.swrj.net.escolaonline.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import javax.persistence.*;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

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
    @JsonIgnoreProperties(value = { "pessoaDiretor", "unidadeDiretor" }, allowSetters = true)
    private Set<Diretor> diretors = new HashSet<>();

    @OneToMany(mappedBy = "pessoaProfessor")
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    @JsonIgnoreProperties(value = { "chamadas", "conteudos", "pessoaProfessor", "unidadeProfessor" }, allowSetters = true)
    private Set<Professor> professors = new HashSet<>();

    @OneToMany(mappedBy = "pessoaAluno")
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    @JsonIgnoreProperties(
        value = { "solicitacaos", "debitos", "chamadas", "matriculas", "pessoaAluno", "escolaAluno" },
        allowSetters = true
    )
    private Set<Aluno> alunos = new HashSet<>();

    @ManyToOne
    @JsonIgnoreProperties(value = { "pessoas" }, allowSetters = true)
    private Cidade cidadePessoa;

    @ManyToOne
    @JsonIgnoreProperties(value = { "pessoas", "alunos", "unidades" }, allowSetters = true)
    private Escola escolaPessoa;

    // jhipster-needle-entity-add-field - JHipster will add fields here
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Pessoa id(Long id) {
        this.id = id;
        return this;
    }

    public String getNome() {
        return this.nome;
    }

    public Pessoa nome(String nome) {
        this.nome = nome;
        return this;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public String getCpf() {
        return this.cpf;
    }

    public Pessoa cpf(String cpf) {
        this.cpf = cpf;
        return this;
    }

    public void setCpf(String cpf) {
        this.cpf = cpf;
    }

    public String getRg() {
        return this.rg;
    }

    public Pessoa rg(String rg) {
        this.rg = rg;
        return this;
    }

    public void setRg(String rg) {
        this.rg = rg;
    }

    public String getEndereco() {
        return this.endereco;
    }

    public Pessoa endereco(String endereco) {
        this.endereco = endereco;
        return this;
    }

    public void setEndereco(String endereco) {
        this.endereco = endereco;
    }

    public String getComplemento() {
        return this.complemento;
    }

    public Pessoa complemento(String complemento) {
        this.complemento = complemento;
        return this;
    }

    public void setComplemento(String complemento) {
        this.complemento = complemento;
    }

    public String getBairro() {
        return this.bairro;
    }

    public Pessoa bairro(String bairro) {
        this.bairro = bairro;
        return this;
    }

    public void setBairro(String bairro) {
        this.bairro = bairro;
    }

    public String getCidade() {
        return this.cidade;
    }

    public Pessoa cidade(String cidade) {
        this.cidade = cidade;
        return this;
    }

    public void setCidade(String cidade) {
        this.cidade = cidade;
    }

    public String getCep() {
        return this.cep;
    }

    public Pessoa cep(String cep) {
        this.cep = cep;
        return this;
    }

    public void setCep(String cep) {
        this.cep = cep;
    }

    public String getTelefoneCelular() {
        return this.telefoneCelular;
    }

    public Pessoa telefoneCelular(String telefoneCelular) {
        this.telefoneCelular = telefoneCelular;
        return this;
    }

    public void setTelefoneCelular(String telefoneCelular) {
        this.telefoneCelular = telefoneCelular;
    }

    public String getTelefoneResidencial() {
        return this.telefoneResidencial;
    }

    public Pessoa telefoneResidencial(String telefoneResidencial) {
        this.telefoneResidencial = telefoneResidencial;
        return this;
    }

    public void setTelefoneResidencial(String telefoneResidencial) {
        this.telefoneResidencial = telefoneResidencial;
    }

    public String getTelefoneComercial() {
        return this.telefoneComercial;
    }

    public Pessoa telefoneComercial(String telefoneComercial) {
        this.telefoneComercial = telefoneComercial;
        return this;
    }

    public void setTelefoneComercial(String telefoneComercial) {
        this.telefoneComercial = telefoneComercial;
    }

    public String getEmail() {
        return this.email;
    }

    public Pessoa email(String email) {
        this.email = email;
        return this;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getObservacoes() {
        return this.observacoes;
    }

    public Pessoa observacoes(String observacoes) {
        this.observacoes = observacoes;
        return this;
    }

    public void setObservacoes(String observacoes) {
        this.observacoes = observacoes;
    }

    public Set<Diretor> getDiretors() {
        return this.diretors;
    }

    public Pessoa diretors(Set<Diretor> diretors) {
        this.setDiretors(diretors);
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
        if (this.diretors != null) {
            this.diretors.forEach(i -> i.setPessoaDiretor(null));
        }
        if (diretors != null) {
            diretors.forEach(i -> i.setPessoaDiretor(this));
        }
        this.diretors = diretors;
    }

    public Set<Professor> getProfessors() {
        return this.professors;
    }

    public Pessoa professors(Set<Professor> professors) {
        this.setProfessors(professors);
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
        if (this.professors != null) {
            this.professors.forEach(i -> i.setPessoaProfessor(null));
        }
        if (professors != null) {
            professors.forEach(i -> i.setPessoaProfessor(this));
        }
        this.professors = professors;
    }

    public Set<Aluno> getAlunos() {
        return this.alunos;
    }

    public Pessoa alunos(Set<Aluno> alunos) {
        this.setAlunos(alunos);
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
        if (this.alunos != null) {
            this.alunos.forEach(i -> i.setPessoaAluno(null));
        }
        if (alunos != null) {
            alunos.forEach(i -> i.setPessoaAluno(this));
        }
        this.alunos = alunos;
    }

    public Cidade getCidadePessoa() {
        return this.cidadePessoa;
    }

    public Pessoa cidadePessoa(Cidade cidade) {
        this.setCidadePessoa(cidade);
        return this;
    }

    public void setCidadePessoa(Cidade cidade) {
        this.cidadePessoa = cidade;
    }

    public Escola getEscolaPessoa() {
        return this.escolaPessoa;
    }

    public Pessoa escolaPessoa(Escola escola) {
        this.setEscolaPessoa(escola);
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
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
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
