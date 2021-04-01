package com.swrj.net.escolaonline.domain;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;

/**
 * A Serie.
 */
@Entity
@Table(name = "serie")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class Serie implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "nome")
    private String nome;

    @OneToMany(mappedBy = "serieGrade")
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    private Set<Grade> grades = new HashSet<>();

    @OneToMany(mappedBy = "serieTurma")
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    private Set<Turma> turmas = new HashSet<>();

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

    public Serie nome(String nome) {
        this.nome = nome;
        return this;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public Set<Grade> getGrades() {
        return grades;
    }

    public Serie grades(Set<Grade> grades) {
        this.grades = grades;
        return this;
    }

    public Serie addGrade(Grade grade) {
        this.grades.add(grade);
        grade.setSerieGrade(this);
        return this;
    }

    public Serie removeGrade(Grade grade) {
        this.grades.remove(grade);
        grade.setSerieGrade(null);
        return this;
    }

    public void setGrades(Set<Grade> grades) {
        this.grades = grades;
    }

    public Set<Turma> getTurmas() {
        return turmas;
    }

    public Serie turmas(Set<Turma> turmas) {
        this.turmas = turmas;
        return this;
    }

    public Serie addTurma(Turma turma) {
        this.turmas.add(turma);
        turma.setSerieTurma(this);
        return this;
    }

    public Serie removeTurma(Turma turma) {
        this.turmas.remove(turma);
        turma.setSerieTurma(null);
        return this;
    }

    public void setTurmas(Set<Turma> turmas) {
        this.turmas = turmas;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Serie)) {
            return false;
        }
        return id != null && id.equals(((Serie) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Serie{" +
            "id=" + getId() +
            ", nome='" + getNome() + "'" +
            "}";
    }
}
