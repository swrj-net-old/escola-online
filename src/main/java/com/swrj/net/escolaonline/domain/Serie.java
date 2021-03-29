package com.swrj.net.escolaonline.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import javax.persistence.*;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

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
    @JsonIgnoreProperties(value = { "serieGrade", "materiaGrade" }, allowSetters = true)
    private Set<Grade> grades = new HashSet<>();

    @OneToMany(mappedBy = "serieTurma")
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    @JsonIgnoreProperties(value = { "chamadas", "conteudos", "matriculas", "serieTurma", "unidadeTurma" }, allowSetters = true)
    private Set<Turma> turmas = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Serie id(Long id) {
        this.id = id;
        return this;
    }

    public String getNome() {
        return this.nome;
    }

    public Serie nome(String nome) {
        this.nome = nome;
        return this;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public Set<Grade> getGrades() {
        return this.grades;
    }

    public Serie grades(Set<Grade> grades) {
        this.setGrades(grades);
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
        if (this.grades != null) {
            this.grades.forEach(i -> i.setSerieGrade(null));
        }
        if (grades != null) {
            grades.forEach(i -> i.setSerieGrade(this));
        }
        this.grades = grades;
    }

    public Set<Turma> getTurmas() {
        return this.turmas;
    }

    public Serie turmas(Set<Turma> turmas) {
        this.setTurmas(turmas);
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
        if (this.turmas != null) {
            this.turmas.forEach(i -> i.setSerieTurma(null));
        }
        if (turmas != null) {
            turmas.forEach(i -> i.setSerieTurma(this));
        }
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
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
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
