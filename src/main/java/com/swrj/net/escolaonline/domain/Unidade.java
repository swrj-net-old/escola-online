package com.swrj.net.escolaonline.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import javax.persistence.*;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

/**
 * A Unidade.
 */
@Entity
@Table(name = "unidade")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class Unidade implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "nome")
    private String nome;

    @Column(name = "cnpj")
    private String cnpj;

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

    @Column(name = "telefone_comercial")
    private String telefoneComercial;

    @Column(name = "telefone_whatsapp")
    private String telefoneWhatsapp;

    @Column(name = "email")
    private String email;

    @Column(name = "facebook")
    private String facebook;

    @Column(name = "observacoes")
    private String observacoes;

    @OneToMany(mappedBy = "unidadeDiretor")
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    @JsonIgnoreProperties(value = { "pessoaDiretor", "unidadeDiretor" }, allowSetters = true)
    private Set<Diretor> diretors = new HashSet<>();

    @OneToMany(mappedBy = "unidadeProfessor")
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    @JsonIgnoreProperties(value = { "chamadas", "conteudos", "pessoaProfessor", "unidadeProfessor" }, allowSetters = true)
    private Set<Professor> professors = new HashSet<>();

    @OneToMany(mappedBy = "unidadeTurma")
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    @JsonIgnoreProperties(value = { "chamadas", "conteudos", "matriculas", "serieTurma", "unidadeTurma" }, allowSetters = true)
    private Set<Turma> turmas = new HashSet<>();

    @ManyToOne
    @JsonIgnoreProperties(value = { "pessoas", "alunos", "unidades" }, allowSetters = true)
    private Escola escolaUnidade;

    // jhipster-needle-entity-add-field - JHipster will add fields here
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Unidade id(Long id) {
        this.id = id;
        return this;
    }

    public String getNome() {
        return this.nome;
    }

    public Unidade nome(String nome) {
        this.nome = nome;
        return this;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public String getCnpj() {
        return this.cnpj;
    }

    public Unidade cnpj(String cnpj) {
        this.cnpj = cnpj;
        return this;
    }

    public void setCnpj(String cnpj) {
        this.cnpj = cnpj;
    }

    public String getEndereco() {
        return this.endereco;
    }

    public Unidade endereco(String endereco) {
        this.endereco = endereco;
        return this;
    }

    public void setEndereco(String endereco) {
        this.endereco = endereco;
    }

    public String getComplemento() {
        return this.complemento;
    }

    public Unidade complemento(String complemento) {
        this.complemento = complemento;
        return this;
    }

    public void setComplemento(String complemento) {
        this.complemento = complemento;
    }

    public String getBairro() {
        return this.bairro;
    }

    public Unidade bairro(String bairro) {
        this.bairro = bairro;
        return this;
    }

    public void setBairro(String bairro) {
        this.bairro = bairro;
    }

    public String getCidade() {
        return this.cidade;
    }

    public Unidade cidade(String cidade) {
        this.cidade = cidade;
        return this;
    }

    public void setCidade(String cidade) {
        this.cidade = cidade;
    }

    public String getCep() {
        return this.cep;
    }

    public Unidade cep(String cep) {
        this.cep = cep;
        return this;
    }

    public void setCep(String cep) {
        this.cep = cep;
    }

    public String getTelefoneComercial() {
        return this.telefoneComercial;
    }

    public Unidade telefoneComercial(String telefoneComercial) {
        this.telefoneComercial = telefoneComercial;
        return this;
    }

    public void setTelefoneComercial(String telefoneComercial) {
        this.telefoneComercial = telefoneComercial;
    }

    public String getTelefoneWhatsapp() {
        return this.telefoneWhatsapp;
    }

    public Unidade telefoneWhatsapp(String telefoneWhatsapp) {
        this.telefoneWhatsapp = telefoneWhatsapp;
        return this;
    }

    public void setTelefoneWhatsapp(String telefoneWhatsapp) {
        this.telefoneWhatsapp = telefoneWhatsapp;
    }

    public String getEmail() {
        return this.email;
    }

    public Unidade email(String email) {
        this.email = email;
        return this;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getFacebook() {
        return this.facebook;
    }

    public Unidade facebook(String facebook) {
        this.facebook = facebook;
        return this;
    }

    public void setFacebook(String facebook) {
        this.facebook = facebook;
    }

    public String getObservacoes() {
        return this.observacoes;
    }

    public Unidade observacoes(String observacoes) {
        this.observacoes = observacoes;
        return this;
    }

    public void setObservacoes(String observacoes) {
        this.observacoes = observacoes;
    }

    public Set<Diretor> getDiretors() {
        return this.diretors;
    }

    public Unidade diretors(Set<Diretor> diretors) {
        this.setDiretors(diretors);
        return this;
    }

    public Unidade addDiretor(Diretor diretor) {
        this.diretors.add(diretor);
        diretor.setUnidadeDiretor(this);
        return this;
    }

    public Unidade removeDiretor(Diretor diretor) {
        this.diretors.remove(diretor);
        diretor.setUnidadeDiretor(null);
        return this;
    }

    public void setDiretors(Set<Diretor> diretors) {
        if (this.diretors != null) {
            this.diretors.forEach(i -> i.setUnidadeDiretor(null));
        }
        if (diretors != null) {
            diretors.forEach(i -> i.setUnidadeDiretor(this));
        }
        this.diretors = diretors;
    }

    public Set<Professor> getProfessors() {
        return this.professors;
    }

    public Unidade professors(Set<Professor> professors) {
        this.setProfessors(professors);
        return this;
    }

    public Unidade addProfessor(Professor professor) {
        this.professors.add(professor);
        professor.setUnidadeProfessor(this);
        return this;
    }

    public Unidade removeProfessor(Professor professor) {
        this.professors.remove(professor);
        professor.setUnidadeProfessor(null);
        return this;
    }

    public void setProfessors(Set<Professor> professors) {
        if (this.professors != null) {
            this.professors.forEach(i -> i.setUnidadeProfessor(null));
        }
        if (professors != null) {
            professors.forEach(i -> i.setUnidadeProfessor(this));
        }
        this.professors = professors;
    }

    public Set<Turma> getTurmas() {
        return this.turmas;
    }

    public Unidade turmas(Set<Turma> turmas) {
        this.setTurmas(turmas);
        return this;
    }

    public Unidade addTurma(Turma turma) {
        this.turmas.add(turma);
        turma.setUnidadeTurma(this);
        return this;
    }

    public Unidade removeTurma(Turma turma) {
        this.turmas.remove(turma);
        turma.setUnidadeTurma(null);
        return this;
    }

    public void setTurmas(Set<Turma> turmas) {
        if (this.turmas != null) {
            this.turmas.forEach(i -> i.setUnidadeTurma(null));
        }
        if (turmas != null) {
            turmas.forEach(i -> i.setUnidadeTurma(this));
        }
        this.turmas = turmas;
    }

    public Escola getEscolaUnidade() {
        return this.escolaUnidade;
    }

    public Unidade escolaUnidade(Escola escola) {
        this.setEscolaUnidade(escola);
        return this;
    }

    public void setEscolaUnidade(Escola escola) {
        this.escolaUnidade = escola;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Unidade)) {
            return false;
        }
        return id != null && id.equals(((Unidade) o).id);
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Unidade{" +
            "id=" + getId() +
            ", nome='" + getNome() + "'" +
            ", cnpj='" + getCnpj() + "'" +
            ", endereco='" + getEndereco() + "'" +
            ", complemento='" + getComplemento() + "'" +
            ", bairro='" + getBairro() + "'" +
            ", cidade='" + getCidade() + "'" +
            ", cep='" + getCep() + "'" +
            ", telefoneComercial='" + getTelefoneComercial() + "'" +
            ", telefoneWhatsapp='" + getTelefoneWhatsapp() + "'" +
            ", email='" + getEmail() + "'" +
            ", facebook='" + getFacebook() + "'" +
            ", observacoes='" + getObservacoes() + "'" +
            "}";
    }
}
