package com.swrj.net.escolaonline.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import java.io.Serializable;
import javax.persistence.*;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

/**
 * A Grade.
 */
@Entity
@Table(name = "grade")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class Grade implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "ano_letivo")
    private Integer anoLetivo;

    @ManyToOne
    @JsonIgnoreProperties(value = { "grades", "turmas" }, allowSetters = true)
    private Serie serieGrade;

    @ManyToOne
    @JsonIgnoreProperties(value = { "grades", "conteudos" }, allowSetters = true)
    private Materia materiaGrade;

    @ManyToOne
    @JsonIgnoreProperties(value = { "pessoas", "alunos", "unidades", "grades", "tipoSolicitacaos" }, allowSetters = true)
    private Escola escolaGrade;

    // jhipster-needle-entity-add-field - JHipster will add fields here
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Grade id(Long id) {
        this.id = id;
        return this;
    }

    public Integer getAnoLetivo() {
        return this.anoLetivo;
    }

    public Grade anoLetivo(Integer anoLetivo) {
        this.anoLetivo = anoLetivo;
        return this;
    }

    public void setAnoLetivo(Integer anoLetivo) {
        this.anoLetivo = anoLetivo;
    }

    public Serie getSerieGrade() {
        return this.serieGrade;
    }

    public Grade serieGrade(Serie serie) {
        this.setSerieGrade(serie);
        return this;
    }

    public void setSerieGrade(Serie serie) {
        this.serieGrade = serie;
    }

    public Materia getMateriaGrade() {
        return this.materiaGrade;
    }

    public Grade materiaGrade(Materia materia) {
        this.setMateriaGrade(materia);
        return this;
    }

    public void setMateriaGrade(Materia materia) {
        this.materiaGrade = materia;
    }

    public Escola getEscolaGrade() {
        return this.escolaGrade;
    }

    public Grade escolaGrade(Escola escola) {
        this.setEscolaGrade(escola);
        return this;
    }

    public void setEscolaGrade(Escola escola) {
        this.escolaGrade = escola;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Grade)) {
            return false;
        }
        return id != null && id.equals(((Grade) o).id);
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Grade{" +
            "id=" + getId() +
            ", anoLetivo=" + getAnoLetivo() +
            "}";
    }
}
