package com.swrj.net.escolaonline.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import javax.persistence.*;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

/**
 * A Materia.
 */
@Entity
@Table(name = "materia")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class Materia implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "nome")
    private String nome;

    @Column(name = "sigla")
    private String sigla;

    @OneToMany(mappedBy = "materiaGrade")
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    @JsonIgnoreProperties(value = { "serieGrade", "materiaGrade", "escolaGrade" }, allowSetters = true)
    private Set<Grade> grades = new HashSet<>();

    @OneToMany(mappedBy = "materiaConteudo")
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    @JsonIgnoreProperties(value = { "turmaConteudo", "professorConteudo", "materiaConteudo" }, allowSetters = true)
    private Set<Conteudo> conteudos = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Materia id(Long id) {
        this.id = id;
        return this;
    }

    public String getNome() {
        return this.nome;
    }

    public Materia nome(String nome) {
        this.nome = nome;
        return this;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public String getSigla() {
        return this.sigla;
    }

    public Materia sigla(String sigla) {
        this.sigla = sigla;
        return this;
    }

    public void setSigla(String sigla) {
        this.sigla = sigla;
    }

    public Set<Grade> getGrades() {
        return this.grades;
    }

    public Materia grades(Set<Grade> grades) {
        this.setGrades(grades);
        return this;
    }

    public Materia addGrade(Grade grade) {
        this.grades.add(grade);
        grade.setMateriaGrade(this);
        return this;
    }

    public Materia removeGrade(Grade grade) {
        this.grades.remove(grade);
        grade.setMateriaGrade(null);
        return this;
    }

    public void setGrades(Set<Grade> grades) {
        if (this.grades != null) {
            this.grades.forEach(i -> i.setMateriaGrade(null));
        }
        if (grades != null) {
            grades.forEach(i -> i.setMateriaGrade(this));
        }
        this.grades = grades;
    }

    public Set<Conteudo> getConteudos() {
        return this.conteudos;
    }

    public Materia conteudos(Set<Conteudo> conteudos) {
        this.setConteudos(conteudos);
        return this;
    }

    public Materia addConteudo(Conteudo conteudo) {
        this.conteudos.add(conteudo);
        conteudo.setMateriaConteudo(this);
        return this;
    }

    public Materia removeConteudo(Conteudo conteudo) {
        this.conteudos.remove(conteudo);
        conteudo.setMateriaConteudo(null);
        return this;
    }

    public void setConteudos(Set<Conteudo> conteudos) {
        if (this.conteudos != null) {
            this.conteudos.forEach(i -> i.setMateriaConteudo(null));
        }
        if (conteudos != null) {
            conteudos.forEach(i -> i.setMateriaConteudo(this));
        }
        this.conteudos = conteudos;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Materia)) {
            return false;
        }
        return id != null && id.equals(((Materia) o).id);
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Materia{" +
            "id=" + getId() +
            ", nome='" + getNome() + "'" +
            ", sigla='" + getSigla() + "'" +
            "}";
    }
}
