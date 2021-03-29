package com.swrj.net.escolaonline.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import java.io.Serializable;
import java.time.LocalDate;
import javax.persistence.*;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

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
    @JsonIgnoreProperties(value = { "chamadas", "conteudos", "matriculas", "serieTurma", "unidadeTurma" }, allowSetters = true)
    private Turma turmaConteudo;

    @ManyToOne
    @JsonIgnoreProperties(value = { "chamadas", "conteudos", "pessoaProfessor", "unidadeProfessor" }, allowSetters = true)
    private Professor professorConteudo;

    @ManyToOne
    @JsonIgnoreProperties(value = { "grades", "conteudos" }, allowSetters = true)
    private Materia materiaConteudo;

    // jhipster-needle-entity-add-field - JHipster will add fields here
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Conteudo id(Long id) {
        this.id = id;
        return this;
    }

    public LocalDate getDataAula() {
        return this.dataAula;
    }

    public Conteudo dataAula(LocalDate dataAula) {
        this.dataAula = dataAula;
        return this;
    }

    public void setDataAula(LocalDate dataAula) {
        this.dataAula = dataAula;
    }

    public String getHabilidadesCompetencias() {
        return this.habilidadesCompetencias;
    }

    public Conteudo habilidadesCompetencias(String habilidadesCompetencias) {
        this.habilidadesCompetencias = habilidadesCompetencias;
        return this;
    }

    public void setHabilidadesCompetencias(String habilidadesCompetencias) {
        this.habilidadesCompetencias = habilidadesCompetencias;
    }

    public String getObservacoes() {
        return this.observacoes;
    }

    public Conteudo observacoes(String observacoes) {
        this.observacoes = observacoes;
        return this;
    }

    public void setObservacoes(String observacoes) {
        this.observacoes = observacoes;
    }

    public Turma getTurmaConteudo() {
        return this.turmaConteudo;
    }

    public Conteudo turmaConteudo(Turma turma) {
        this.setTurmaConteudo(turma);
        return this;
    }

    public void setTurmaConteudo(Turma turma) {
        this.turmaConteudo = turma;
    }

    public Professor getProfessorConteudo() {
        return this.professorConteudo;
    }

    public Conteudo professorConteudo(Professor professor) {
        this.setProfessorConteudo(professor);
        return this;
    }

    public void setProfessorConteudo(Professor professor) {
        this.professorConteudo = professor;
    }

    public Materia getMateriaConteudo() {
        return this.materiaConteudo;
    }

    public Conteudo materiaConteudo(Materia materia) {
        this.setMateriaConteudo(materia);
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
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
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
