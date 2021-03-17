package com.swrj.net.escolaonline.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;

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

    @OneToMany(mappedBy = "turmaMatricula")
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    private Set<Matricula> matriculas = new HashSet<>();

    @ManyToOne
    @JsonIgnoreProperties(value = "turmas", allowSetters = true)
    private Unidade unidadeTurma;

    // jhipster-needle-entity-add-field - JHipster will add fields here
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNome() {
        return nome;
    }

    public Turma nome(String nome) {
        this.nome = nome;
        return this;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public Set<Matricula> getMatriculas() {
        return matriculas;
    }

    public Turma matriculas(Set<Matricula> matriculas) {
        this.matriculas = matriculas;
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
        this.matriculas = matriculas;
    }

    public Unidade getUnidadeTurma() {
        return unidadeTurma;
    }

    public Turma unidadeTurma(Unidade unidade) {
        this.unidadeTurma = unidade;
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
        return 31;
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
