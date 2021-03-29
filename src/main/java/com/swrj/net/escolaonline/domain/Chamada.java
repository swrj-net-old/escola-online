package com.swrj.net.escolaonline.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.time.LocalDate;

/**
 * A Chamada.
 */
@Entity
@Table(name = "chamada")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class Chamada implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "data_aula")
    private LocalDate dataAula;

    @Column(name = "observacoes")
    private String observacoes;

    @ManyToOne
    @JsonIgnoreProperties(value = "chamadas", allowSetters = true)
    private Aluno alunoChamada;

    @ManyToOne
    @JsonIgnoreProperties(value = "chamadas", allowSetters = true)
    private Turma turmaChamada;

    @ManyToOne
    @JsonIgnoreProperties(value = "chamadas", allowSetters = true)
    private Professor professorChamada;

    // jhipster-needle-entity-add-field - JHipster will add fields here
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public LocalDate getDataAula() {
        return dataAula;
    }

    public Chamada dataAula(LocalDate dataAula) {
        this.dataAula = dataAula;
        return this;
    }

    public void setDataAula(LocalDate dataAula) {
        this.dataAula = dataAula;
    }

    public String getObservacoes() {
        return observacoes;
    }

    public Chamada observacoes(String observacoes) {
        this.observacoes = observacoes;
        return this;
    }

    public void setObservacoes(String observacoes) {
        this.observacoes = observacoes;
    }

    public Aluno getAlunoChamada() {
        return alunoChamada;
    }

    public Chamada alunoChamada(Aluno aluno) {
        this.alunoChamada = aluno;
        return this;
    }

    public void setAlunoChamada(Aluno aluno) {
        this.alunoChamada = aluno;
    }

    public Turma getTurmaChamada() {
        return turmaChamada;
    }

    public Chamada turmaChamada(Turma turma) {
        this.turmaChamada = turma;
        return this;
    }

    public void setTurmaChamada(Turma turma) {
        this.turmaChamada = turma;
    }

    public Professor getProfessorChamada() {
        return professorChamada;
    }

    public Chamada professorChamada(Professor professor) {
        this.professorChamada = professor;
        return this;
    }

    public void setProfessorChamada(Professor professor) {
        this.professorChamada = professor;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Chamada)) {
            return false;
        }
        return id != null && id.equals(((Chamada) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Chamada{" +
            "id=" + getId() +
            ", dataAula='" + getDataAula() + "'" +
            ", observacoes='" + getObservacoes() + "'" +
            "}";
    }
}
