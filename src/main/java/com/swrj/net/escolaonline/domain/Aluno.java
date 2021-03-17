package com.swrj.net.escolaonline.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;

/**
 * A Aluno.
 */
@Entity
@Table(name = "aluno")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class Aluno implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @OneToMany(mappedBy = "alunoMatricula")
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    private Set<Matricula> matriculas = new HashSet<>();

    @ManyToOne
    @JsonIgnoreProperties(value = "alunos", allowSetters = true)
    private Pessoa pessoaAluno;

    @ManyToOne
    @JsonIgnoreProperties(value = "alunos", allowSetters = true)
    private Escola escolaAluno;

    // jhipster-needle-entity-add-field - JHipster will add fields here
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Set<Matricula> getMatriculas() {
        return matriculas;
    }

    public Aluno matriculas(Set<Matricula> matriculas) {
        this.matriculas = matriculas;
        return this;
    }

    public Aluno addMatricula(Matricula matricula) {
        this.matriculas.add(matricula);
        matricula.setAlunoMatricula(this);
        return this;
    }

    public Aluno removeMatricula(Matricula matricula) {
        this.matriculas.remove(matricula);
        matricula.setAlunoMatricula(null);
        return this;
    }

    public void setMatriculas(Set<Matricula> matriculas) {
        this.matriculas = matriculas;
    }

    public Pessoa getPessoaAluno() {
        return pessoaAluno;
    }

    public Aluno pessoaAluno(Pessoa pessoa) {
        this.pessoaAluno = pessoa;
        return this;
    }

    public void setPessoaAluno(Pessoa pessoa) {
        this.pessoaAluno = pessoa;
    }

    public Escola getEscolaAluno() {
        return escolaAluno;
    }

    public Aluno escolaAluno(Escola escola) {
        this.escolaAluno = escola;
        return this;
    }

    public void setEscolaAluno(Escola escola) {
        this.escolaAluno = escola;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Aluno)) {
            return false;
        }
        return id != null && id.equals(((Aluno) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Aluno{" +
            "id=" + getId() +
            "}";
    }
}
