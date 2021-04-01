package com.swrj.net.escolaonline.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.time.LocalDate;

/**
 * A Conteudo.
 */
@Entity
@Table(name = "conteudo")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class Conteudo implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "data_aula")
    private LocalDate dataAula;

    @Column(name = "habilidades_competencias")
    private String habilidadesCompetencias;

    @Column(name = "observacoes")
    private String observacoes;

    @ManyToOne
    @JsonIgnoreProperties(value = "conteudos", allowSetters = true)
    private Turma turmaConteudo;

    @ManyToOne
    @JsonIgnoreProperties(value = "conteudos", allowSetters = true)
    private Professor professorConteudo;

    @ManyToOne
    @JsonIgnoreProperties(value = "conteudos", allowSetters = true)
    private Materia materiaConteudo;

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

    public Conteudo dataAula(LocalDate dataAula) {
        this.dataAula = dataAula;
        return this;
    }

    public void setDataAula(LocalDate dataAula) {
        this.dataAula = dataAula;
    }

    public String getHabilidadesCompetencias() {
        return habilidadesCompetencias;
    }

    public Conteudo habilidadesCompetencias(String habilidadesCompetencias) {
        this.habilidadesCompetencias = habilidadesCompetencias;
        return this;
    }

    public void setHabilidadesCompetencias(String habilidadesCompetencias) {
        this.habilidadesCompetencias = habilidadesCompetencias;
    }

    public String getObservacoes() {
        return observacoes;
    }

    public Conteudo observacoes(String observacoes) {
        this.observacoes = observacoes;
        return this;
    }

    public void setObservacoes(String observacoes) {
        this.observacoes = observacoes;
    }

    public Turma getTurmaConteudo() {
        return turmaConteudo;
    }

    public Conteudo turmaConteudo(Turma turma) {
        this.turmaConteudo = turma;
        return this;
    }

    public void setTurmaConteudo(Turma turma) {
        this.turmaConteudo = turma;
    }

    public Professor getProfessorConteudo() {
        return professorConteudo;
    }

    public Conteudo professorConteudo(Professor professor) {
        this.professorConteudo = professor;
        return this;
    }

    public void setProfessorConteudo(Professor professor) {
        this.professorConteudo = professor;
    }

    public Materia getMateriaConteudo() {
        return materiaConteudo;
    }

    public Conteudo materiaConteudo(Materia materia) {
        this.materiaConteudo = materia;
        return this;
    }

    public void setMateriaConteudo(Materia materia) {
        this.materiaConteudo = materia;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Conteudo)) {
            return false;
        }
        return id != null && id.equals(((Conteudo) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Conteudo{" +
            "id=" + getId() +
            ", dataAula='" + getDataAula() + "'" +
            ", habilidadesCompetencias='" + getHabilidadesCompetencias() + "'" +
            ", observacoes='" + getObservacoes() + "'" +
            "}";
    }
}
