package com.swrj.net.escolaonline.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import java.io.Serializable;
import java.time.LocalDate;
import javax.persistence.*;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

/**
 * A Matricula.
 */
@Entity
@Table(name = "matricula")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class Matricula implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "ano_letivo")
    private Integer anoLetivo;

    @Column(name = "data_inicio")
    private LocalDate dataInicio;

    @Column(name = "data_fim")
    private LocalDate dataFim;

    @ManyToOne
    @JsonIgnoreProperties(value = { "chamadas", "conteudos", "matriculas", "serieTurma", "unidadeTurma" }, allowSetters = true)
    private Turma turmaMatricula;

    @ManyToOne
    @JsonIgnoreProperties(
        value = { "solicitacaos", "debitos", "chamadas", "matriculas", "pessoaAluno", "escolaAluno" },
        allowSetters = true
    )
    private Aluno alunoMatricula;

    // jhipster-needle-entity-add-field - JHipster will add fields here
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Matricula id(Long id) {
        this.id = id;
        return this;
    }

    public Integer getAnoLetivo() {
        return this.anoLetivo;
    }

    public Matricula anoLetivo(Integer anoLetivo) {
        this.anoLetivo = anoLetivo;
        return this;
    }

    public void setAnoLetivo(Integer anoLetivo) {
        this.anoLetivo = anoLetivo;
    }

    public LocalDate getDataInicio() {
        return this.dataInicio;
    }

    public Matricula dataInicio(LocalDate dataInicio) {
        this.dataInicio = dataInicio;
        return this;
    }

    public void setDataInicio(LocalDate dataInicio) {
        this.dataInicio = dataInicio;
    }

    public LocalDate getDataFim() {
        return this.dataFim;
    }

    public Matricula dataFim(LocalDate dataFim) {
        this.dataFim = dataFim;
        return this;
    }

    public void setDataFim(LocalDate dataFim) {
        this.dataFim = dataFim;
    }

    public Turma getTurmaMatricula() {
        return this.turmaMatricula;
    }

    public Matricula turmaMatricula(Turma turma) {
        this.setTurmaMatricula(turma);
        return this;
    }

    public void setTurmaMatricula(Turma turma) {
        this.turmaMatricula = turma;
    }

    public Aluno getAlunoMatricula() {
        return this.alunoMatricula;
    }

    public Matricula alunoMatricula(Aluno aluno) {
        this.setAlunoMatricula(aluno);
        return this;
    }

    public void setAlunoMatricula(Aluno aluno) {
        this.alunoMatricula = aluno;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Matricula)) {
            return false;
        }
        return id != null && id.equals(((Matricula) o).id);
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Matricula{" +
            "id=" + getId() +
            ", anoLetivo=" + getAnoLetivo() +
            ", dataInicio='" + getDataInicio() + "'" +
            ", dataFim='" + getDataFim() + "'" +
            "}";
    }
}
