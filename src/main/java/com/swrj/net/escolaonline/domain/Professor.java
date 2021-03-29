package com.swrj.net.escolaonline.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.time.LocalDate;
import java.util.HashSet;
import java.util.Set;

/**
 * A Professor.
 */
@Entity
@Table(name = "professor")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class Professor implements Serializable {

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

    @OneToMany(mappedBy = "professorChamada")
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    private Set<Chamada> chamadas = new HashSet<>();

    @OneToMany(mappedBy = "professorConteudo")
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    private Set<Conteudo> conteudos = new HashSet<>();

    @ManyToOne
    @JsonIgnoreProperties(value = "professors", allowSetters = true)
    private Pessoa pessoaProfessor;

    @ManyToOne
    @JsonIgnoreProperties(value = "professors", allowSetters = true)
    private Unidade unidadeProfessor;

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

    public Professor anoLetivo(Integer anoLetivo) {
        this.anoLetivo = anoLetivo;
        return this;
    }

    public void setAnoLetivo(Integer anoLetivo) {
        this.anoLetivo = anoLetivo;
    }

    public LocalDate getDataInicio() {
        return dataInicio;
    }

    public Professor dataInicio(LocalDate dataInicio) {
        this.dataInicio = dataInicio;
        return this;
    }

    public void setDataInicio(LocalDate dataInicio) {
        this.dataInicio = dataInicio;
    }

    public LocalDate getDataFim() {
        return dataFim;
    }

    public Professor dataFim(LocalDate dataFim) {
        this.dataFim = dataFim;
        return this;
    }

    public void setDataFim(LocalDate dataFim) {
        this.dataFim = dataFim;
    }

    public Set<Chamada> getChamadas() {
        return chamadas;
    }

    public Professor chamadas(Set<Chamada> chamadas) {
        this.chamadas = chamadas;
        return this;
    }

    public Professor addChamada(Chamada chamada) {
        this.chamadas.add(chamada);
        chamada.setProfessorChamada(this);
        return this;
    }

    public Professor removeChamada(Chamada chamada) {
        this.chamadas.remove(chamada);
        chamada.setProfessorChamada(null);
        return this;
    }

    public void setChamadas(Set<Chamada> chamadas) {
        this.chamadas = chamadas;
    }

    public Set<Conteudo> getConteudos() {
        return conteudos;
    }

    public Professor conteudos(Set<Conteudo> conteudos) {
        this.conteudos = conteudos;
        return this;
    }

    public Professor addConteudo(Conteudo conteudo) {
        this.conteudos.add(conteudo);
        conteudo.setProfessorConteudo(this);
        return this;
    }

    public Professor removeConteudo(Conteudo conteudo) {
        this.conteudos.remove(conteudo);
        conteudo.setProfessorConteudo(null);
        return this;
    }

    public void setConteudos(Set<Conteudo> conteudos) {
        this.conteudos = conteudos;
    }

    public Pessoa getPessoaProfessor() {
        return pessoaProfessor;
    }

    public Professor pessoaProfessor(Pessoa pessoa) {
        this.pessoaProfessor = pessoa;
        return this;
    }

    public void setPessoaProfessor(Pessoa pessoa) {
        this.pessoaProfessor = pessoa;
    }

    public Unidade getUnidadeProfessor() {
        return unidadeProfessor;
    }

    public Professor unidadeProfessor(Unidade unidade) {
        this.unidadeProfessor = unidade;
        return this;
    }

    public void setUnidadeProfessor(Unidade unidade) {
        this.unidadeProfessor = unidade;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Professor)) {
            return false;
        }
        return id != null && id.equals(((Professor) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Professor{" +
            "id=" + getId() +
            ", anoLetivo=" + getAnoLetivo() +
            ", dataInicio='" + getDataInicio() + "'" +
            ", dataFim='" + getDataFim() + "'" +
            "}";
    }
}
