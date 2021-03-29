package com.swrj.net.escolaonline.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import javax.persistence.*;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

/**
 * A Turma.
 */
@Entity
@Table(name = "turma")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class Turma implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "nome")
    private String nome;

    @OneToMany(mappedBy = "turmaChamada")
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    @JsonIgnoreProperties(value = { "alunoChamada", "turmaChamada", "professorChamada" }, allowSetters = true)
    private Set<Chamada> chamadas = new HashSet<>();

    @OneToMany(mappedBy = "turmaConteudo")
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    @JsonIgnoreProperties(value = { "turmaConteudo", "professorConteudo", "materiaConteudo" }, allowSetters = true)
    private Set<Conteudo> conteudos = new HashSet<>();

    @OneToMany(mappedBy = "turmaMatricula")
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    @JsonIgnoreProperties(value = { "turmaMatricula", "alunoMatricula" }, allowSetters = true)
    private Set<Matricula> matriculas = new HashSet<>();

    @ManyToOne
    @JsonIgnoreProperties(value = { "grades", "turmas" }, allowSetters = true)
    private Serie serieTurma;

    @ManyToOne
    @JsonIgnoreProperties(value = { "diretors", "professors", "turmas", "escolaUnidade" }, allowSetters = true)
    private Unidade unidadeTurma;

    // jhipster-needle-entity-add-field - JHipster will add fields here
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Turma id(Long id) {
        this.id = id;
        return this;
    }

    public String getNome() {
        return this.nome;
    }

    public Turma nome(String nome) {
        this.nome = nome;
        return this;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public Set<Chamada> getChamadas() {
        return this.chamadas;
    }

    public Turma chamadas(Set<Chamada> chamadas) {
        this.setChamadas(chamadas);
        return this;
    }

    public Turma addChamada(Chamada chamada) {
        this.chamadas.add(chamada);
        chamada.setTurmaChamada(this);
        return this;
    }

    public Turma removeChamada(Chamada chamada) {
        this.chamadas.remove(chamada);
        chamada.setTurmaChamada(null);
        return this;
    }

    public void setChamadas(Set<Chamada> chamadas) {
        if (this.chamadas != null) {
            this.chamadas.forEach(i -> i.setTurmaChamada(null));
        }
        if (chamadas != null) {
            chamadas.forEach(i -> i.setTurmaChamada(this));
        }
        this.chamadas = chamadas;
    }

    public Set<Conteudo> getConteudos() {
        return this.conteudos;
    }

    public Turma conteudos(Set<Conteudo> conteudos) {
        this.setConteudos(conteudos);
        return this;
    }

    public Turma addConteudo(Conteudo conteudo) {
        this.conteudos.add(conteudo);
        conteudo.setTurmaConteudo(this);
        return this;
    }

    public Turma removeConteudo(Conteudo conteudo) {
        this.conteudos.remove(conteudo);
        conteudo.setTurmaConteudo(null);
        return this;
    }

    public void setConteudos(Set<Conteudo> conteudos) {
        if (this.conteudos != null) {
            this.conteudos.forEach(i -> i.setTurmaConteudo(null));
        }
        if (conteudos != null) {
            conteudos.forEach(i -> i.setTurmaConteudo(this));
        }
        this.conteudos = conteudos;
    }

    public Set<Matricula> getMatriculas() {
        return this.matriculas;
    }

    public Turma matriculas(Set<Matricula> matriculas) {
        this.setMatriculas(matriculas);
        return this;
    }

    public Turma addMatricula(Matricula matricula) {
        this.matriculas.add(matricula);
        matricula.setTurmaMatricula(this);
        return this;
    }

    public Turma removeMatricula(Matricula matricula) {
        this.matriculas.remove(matricula);
        matricula.setTurmaMatricula(null);
        return this;
    }

    public void setMatriculas(Set<Matricula> matriculas) {
        if (this.matriculas != null) {
            this.matriculas.forEach(i -> i.setTurmaMatricula(null));
        }
        if (matriculas != null) {
            matriculas.forEach(i -> i.setTurmaMatricula(this));
        }
        this.matriculas = matriculas;
    }

    public Serie getSerieTurma() {
        return this.serieTurma;
    }

    public Turma serieTurma(Serie serie) {
        this.setSerieTurma(serie);
        return this;
    }

    public void setSerieTurma(Serie serie) {
        this.serieTurma = serie;
    }

    public Unidade getUnidadeTurma() {
        return this.unidadeTurma;
    }

    public Turma unidadeTurma(Unidade unidade) {
        this.setUnidadeTurma(unidade);
        return this;
    }

    public void setUnidadeTurma(Unidade unidade) {
        this.unidadeTurma = unidade;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Turma)) {
            return false;
        }
        return id != null && id.equals(((Turma) o).id);
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Turma{" +
            "id=" + getId() +
            ", nome='" + getNome() + "'" +
            "}";
    }
}
