package com.swrj.net.escolaonline.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.time.LocalDate;

/**
 * A Diretor.
 */
@Entity
@Table(name = "diretor")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class Diretor implements Serializable {

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
    @JsonIgnoreProperties(value = "diretors", allowSetters = true)
    private Pessoa pessoaDiretor;

    @ManyToOne
    @JsonIgnoreProperties(value = "diretors", allowSetters = true)
    private Unidade unidadeDiretor;

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

    public Diretor anoLetivo(Integer anoLetivo) {
        this.anoLetivo = anoLetivo;
        return this;
    }

    public void setAnoLetivo(Integer anoLetivo) {
        this.anoLetivo = anoLetivo;
    }

    public LocalDate getDataInicio() {
        return dataInicio;
    }

    public Diretor dataInicio(LocalDate dataInicio) {
        this.dataInicio = dataInicio;
        return this;
    }

    public void setDataInicio(LocalDate dataInicio) {
        this.dataInicio = dataInicio;
    }

    public LocalDate getDataFim() {
        return dataFim;
    }

    public Diretor dataFim(LocalDate dataFim) {
        this.dataFim = dataFim;
        return this;
    }

    public void setDataFim(LocalDate dataFim) {
        this.dataFim = dataFim;
    }

    public Pessoa getPessoaDiretor() {
        return pessoaDiretor;
    }

    public Diretor pessoaDiretor(Pessoa pessoa) {
        this.pessoaDiretor = pessoa;
        return this;
    }

    public void setPessoaDiretor(Pessoa pessoa) {
        this.pessoaDiretor = pessoa;
    }

    public Unidade getUnidadeDiretor() {
        return unidadeDiretor;
    }

    public Diretor unidadeDiretor(Unidade unidade) {
        this.unidadeDiretor = unidade;
        return this;
    }

    public void setUnidadeDiretor(Unidade unidade) {
        this.unidadeDiretor = unidade;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Diretor)) {
            return false;
        }
        return id != null && id.equals(((Diretor) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Diretor{" +
            "id=" + getId() +
            ", anoLetivo=" + getAnoLetivo() +
            ", dataInicio='" + getDataInicio() + "'" +
            ", dataFim='" + getDataFim() + "'" +
            "}";
    }
}
