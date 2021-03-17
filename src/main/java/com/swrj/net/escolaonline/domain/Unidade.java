package com.swrj.net.escolaonline.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;

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

    @OneToMany(mappedBy = "unidadeDiretor")
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    private Set<Diretor> diretors = new HashSet<>();

    @OneToMany(mappedBy = "unidadeProfessor")
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    private Set<Professor> professors = new HashSet<>();

    @OneToMany(mappedBy = "unidadeTurma")
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    private Set<Turma> turmas = new HashSet<>();

    @ManyToOne
    @JsonIgnoreProperties(value = "unidades", allowSetters = true)
    private Escola escolaUnidade;

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

    public Unidade nome(String nome) {
        this.nome = nome;
        return this;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public Set<Diretor> getDiretors() {
        return diretors;
    }

    public Unidade diretors(Set<Diretor> diretors) {
        this.diretors = diretors;
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
        this.diretors = diretors;
    }

    public Set<Professor> getProfessors() {
        return professors;
    }

    public Unidade professors(Set<Professor> professors) {
        this.professors = professors;
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
        this.professors = professors;
    }

    public Set<Turma> getTurmas() {
        return turmas;
    }

    public Unidade turmas(Set<Turma> turmas) {
        this.turmas = turmas;
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
        this.turmas = turmas;
    }

    public Escola getEscolaUnidade() {
        return escolaUnidade;
    }

    public Unidade escolaUnidade(Escola escola) {
        this.escolaUnidade = escola;
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
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Unidade{" +
            "id=" + getId() +
            ", nome='" + getNome() + "'" +
            "}";
    }
}
