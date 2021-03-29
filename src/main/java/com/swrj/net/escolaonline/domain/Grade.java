package com.swrj.net.escolaonline.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;

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
    @JsonIgnoreProperties(value = "grades", allowSetters = true)
    private Serie serieGrade;

    @ManyToOne
    @JsonIgnoreProperties(value = "grades", allowSetters = true)
    private Materia materiaGrade;

    // jhipster-needle-entity-add-field - JHipster will add fields here
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Integer getAnoLetivo() {
        return anoLetivo;
    }

    public Grade anoLetivo(Integer anoLetivo) {
        this.anoLetivo = anoLetivo;
        return this;
    }

    public void setAnoLetivo(Integer anoLetivo) {
        this.anoLetivo = anoLetivo;
    }

    public Serie getSerieGrade() {
        return serieGrade;
    }

    public Grade serieGrade(Serie serie) {
        this.serieGrade = serie;
        return this;
    }

    public void setSerieGrade(Serie serie) {
        this.serieGrade = serie;
    }

    public Materia getMateriaGrade() {
        return materiaGrade;
    }

    public Grade materiaGrade(Materia materia) {
        this.materiaGrade = materia;
        return this;
    }

    public void setMateriaGrade(Materia materia) {
        this.materiaGrade = materia;
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
        return 31;
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
