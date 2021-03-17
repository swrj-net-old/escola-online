package com.swrj.net.escolaonline.domain;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;

/**
 * A Escola.
 */
@Entity
@Table(name = "escola")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class Escola implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "nome")
    private String nome;

    @OneToMany(mappedBy = "escolaAluno")
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    private Set<Aluno> alunos = new HashSet<>();

    @OneToMany(mappedBy = "escolaUnidade")
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    private Set<Unidade> unidades = new HashSet<>();

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

    public Escola nome(String nome) {
        this.nome = nome;
        return this;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public Set<Aluno> getAlunos() {
        return alunos;
    }

    public Escola alunos(Set<Aluno> alunos) {
        this.alunos = alunos;
        return this;
    }

    public Escola addAluno(Aluno aluno) {
        this.alunos.add(aluno);
        aluno.setEscolaAluno(this);
        return this;
    }

    public Escola removeAluno(Aluno aluno) {
        this.alunos.remove(aluno);
        aluno.setEscolaAluno(null);
        return this;
    }

    public void setAlunos(Set<Aluno> alunos) {
        this.alunos = alunos;
    }

    public Set<Unidade> getUnidades() {
        return unidades;
    }

    public Escola unidades(Set<Unidade> unidades) {
        this.unidades = unidades;
        return this;
    }

    public Escola addUnidade(Unidade unidade) {
        this.unidades.add(unidade);
        unidade.setEscolaUnidade(this);
        return this;
    }

    public Escola removeUnidade(Unidade unidade) {
        this.unidades.remove(unidade);
        unidade.setEscolaUnidade(null);
        return this;
    }

    public void setUnidades(Set<Unidade> unidades) {
        this.unidades = unidades;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Escola)) {
            return false;
        }
        return id != null && id.equals(((Escola) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Escola{" +
            "id=" + getId() +
            ", nome='" + getNome() + "'" +
            "}";
    }
}
