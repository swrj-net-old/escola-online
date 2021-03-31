package com.swrj.net.escolaonline.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import java.io.Serializable;
import java.time.LocalDate;
import java.util.HashSet;
import java.util.Set;
import javax.persistence.*;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

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
    @JsonIgnoreProperties(value = { "alunoChamada", "turmaChamada", "professorChamada" }, allowSetters = true)
    private Set<Chamada> chamadas = new HashSet<>();

    @OneToMany(mappedBy = "professorConteudo")
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    @JsonIgnoreProperties(value = { "turmaConteudo", "professorConteudo", "materiaConteudo" }, allowSetters = true)
    private Set<Conteudo> conteudos = new HashSet<>();

    @ManyToOne
    @JsonIgnoreProperties(value = { "diretors", "professors", "alunos", "cidadePessoa", "escolaPessoa" }, allowSetters = true)
    private Pessoa pessoaProfessor;

    @ManyToOne
    @JsonIgnoreProperties(value = { "diretors", "professors", "turmas", "escolaUnidade" }, allowSetters = true)
    private Unidade unidadeProfessor;

    // jhipster-needle-entity-add-field - JHipster will add fields here
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Professor id(Long id) {
        this.id = id;
        return this;
    }

    public Integer getAnoLetivo() {
        return this.anoLetivo;
    }

    public Professor anoLetivo(Integer anoLetivo) {
        this.anoLetivo = anoLetivo;
        return this;
    }

    public void setAnoLetivo(Integer anoLetivo) {
        this.anoLetivo = anoLetivo;
    }

    public LocalDate getDataInicio() {
        return this.dataInicio;
    }

    public Professor dataInicio(LocalDate dataInicio) {
        this.dataInicio = dataInicio;
        return this;
    }

    public void setDataInicio(LocalDate dataInicio) {
        this.dataInicio = dataInicio;
    }

    public LocalDate getDataFim() {
        return this.dataFim;
    }

    public Professor dataFim(LocalDate dataFim) {
        this.dataFim = dataFim;
        return this;
    }

    public void setDataFim(LocalDate dataFim) {
        this.dataFim = dataFim;
    }

    public Set<Chamada> getChamadas() {
        return this.chamadas;
    }

    public Professor chamadas(Set<Chamada> chamadas) {
        this.setChamadas(chamadas);
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
        if (this.chamadas != null) {
            this.chamadas.forEach(i -> i.setProfessorChamada(null));
        }
        if (chamadas != null) {
            chamadas.forEach(i -> i.setProfessorChamada(this));
        }
        this.chamadas = chamadas;
    }

    public Set<Conteudo> getConteudos() {
        return this.conteudos;
    }

    public Professor conteudos(Set<Conteudo> conteudos) {
        this.setConteudos(conteudos);
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
        if (this.conteudos != null) {
            this.conteudos.forEach(i -> i.setProfessorConteudo(null));
        }
        if (conteudos != null) {
            conteudos.forEach(i -> i.setProfessorConteudo(this));
        }
        this.conteudos = conteudos;
    }

    public Pessoa getPessoaProfessor() {
        return this.pessoaProfessor;
    }

    public Professor pessoaProfessor(Pessoa pessoa) {
        this.setPessoaProfessor(pessoa);
        return this;
    }

    public void setPessoaProfessor(Pessoa pessoa) {
        this.pessoaProfessor = pessoa;
    }

    public Unidade getUnidadeProfessor() {
        return this.unidadeProfessor;
    }

    public Professor unidadeProfessor(Unidade unidade) {
        this.setUnidadeProfessor(unidade);
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
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
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
