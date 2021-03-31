package com.swrj.net.escolaonline.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.swrj.net.escolaonline.domain.enumeration.UF;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import javax.persistence.*;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

/**
 * A Cidade.
 */
@Entity
@Table(name = "cidade")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class Cidade implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "nome")
    private String nome;

    @Enumerated(EnumType.STRING)
    @Column(name = "uf")
    private UF uf;

    @OneToMany(mappedBy = "cidadePessoa")
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    @JsonIgnoreProperties(value = { "diretors", "professors", "alunos", "cidadePessoa", "escolaPessoa" }, allowSetters = true)
    private Set<Pessoa> pessoas = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Cidade id(Long id) {
        this.id = id;
        return this;
    }

    public String getNome() {
        return this.nome;
    }

    public Cidade nome(String nome) {
        this.nome = nome;
        return this;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public UF getUf() {
        return this.uf;
    }

    public Cidade uf(UF uf) {
        this.uf = uf;
        return this;
    }

    public void setUf(UF uf) {
        this.uf = uf;
    }

    public Set<Pessoa> getPessoas() {
        return this.pessoas;
    }

    public Cidade pessoas(Set<Pessoa> pessoas) {
        this.setPessoas(pessoas);
        return this;
    }

    public Cidade addPessoa(Pessoa pessoa) {
        this.pessoas.add(pessoa);
        pessoa.setCidadePessoa(this);
        return this;
    }

    public Cidade removePessoa(Pessoa pessoa) {
        this.pessoas.remove(pessoa);
        pessoa.setCidadePessoa(null);
        return this;
    }

    public void setPessoas(Set<Pessoa> pessoas) {
        if (this.pessoas != null) {
            this.pessoas.forEach(i -> i.setCidadePessoa(null));
        }
        if (pessoas != null) {
            pessoas.forEach(i -> i.setCidadePessoa(this));
        }
        this.pessoas = pessoas;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Cidade)) {
            return false;
        }
        return id != null && id.equals(((Cidade) o).id);
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Cidade{" +
            "id=" + getId() +
            ", nome='" + getNome() + "'" +
            ", uf='" + getUf() + "'" +
            "}";
    }
}
