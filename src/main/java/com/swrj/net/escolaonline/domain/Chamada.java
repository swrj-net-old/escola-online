package com.swrj.net.escolaonline.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import java.io.Serializable;
import java.time.LocalDate;
import javax.persistence.*;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

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
    @JsonIgnoreProperties(
        value = { "solicitacaos", "debitos", "chamadas", "matriculas", "pessoaAluno", "escolaAluno" },
        allowSetters = true
    )
    private Aluno alunoChamada;

    @ManyToOne
    @JsonIgnoreProperties(value = { "chamadas", "conteudos", "matriculas", "serieTurma", "unidadeTurma" }, allowSetters = true)
    private Turma turmaChamada;

    @ManyToOne
    @JsonIgnoreProperties(value = { "chamadas", "conteudos", "pessoaProfessor", "unidadeProfessor" }, allowSetters = true)
    private Professor professorChamada;

    // jhipster-needle-entity-add-field - JHipster will add fields here
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Chamada id(Long id) {
        this.id = id;
        return this;
    }

    public LocalDate getDataAula() {
        return this.dataAula;
    }

    public Chamada dataAula(LocalDate dataAula) {
        this.dataAula = dataAula;
        return this;
    }

    public void setDataAula(LocalDate dataAula) {
        this.dataAula = dataAula;
    }

    public String getObservacoes() {
        return this.observacoes;
    }

    public Chamada observacoes(String observacoes) {
        this.observacoes = observacoes;
        return this;
    }

    public void setObservacoes(String observacoes) {
        this.observacoes = observacoes;
    }

    public Aluno getAlunoChamada() {
        return this.alunoChamada;
    }

    public Chamada alunoChamada(Aluno aluno) {
        this.setAlunoChamada(aluno);
        return this;
    }

    public void setAlunoChamada(Aluno aluno) {
        this.alunoChamada = aluno;
    }

    public Turma getTurmaChamada() {
        return this.turmaChamada;
    }

    public Chamada turmaChamada(Turma turma) {
        this.setTurmaChamada(turma);
        return this;
    }

    public void setTurmaChamada(Turma turma) {
        this.turmaChamada = turma;
    }

    public Professor getProfessorChamada() {
        return this.professorChamada;
    }

    public Chamada professorChamada(Professor professor) {
        this.setProfessorChamada(professor);
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
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
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
