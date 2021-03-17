package com.swrj.net.escolaonline.domain;

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

    @OneToMany(mappedBy = "pessoaDiretor")
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    private Set<Diretor> diretors = new HashSet<>();

    @OneToMany(mappedBy = "pessoaProfessor")
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    private Set<Professor> professors = new HashSet<>();

    @OneToMany(mappedBy = "pessoaAluno")
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    private Set<Aluno> alunos = new HashSet<>();

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
            "}";
    }
}
