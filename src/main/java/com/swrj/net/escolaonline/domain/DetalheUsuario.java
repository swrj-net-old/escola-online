package com.swrj.net.escolaonline.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import javax.persistence.*;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

/**
 * A DetalheUsuario.
 */
@Entity
@Table(name = "detalhe_usuario")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class DetalheUsuario implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "cpf")
    private String cpf;

    @Column(name = "celular")
    private String celular;

    @OneToOne
    @JoinColumn(unique = true)
    private User usuario;

    @OneToMany(mappedBy = "detalheUsuarioLancamento")
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    @JsonIgnoreProperties(value = { "debitoHistoricoDebito", "detalheUsuarioLancamento" }, allowSetters = true)
    private Set<HistoricoDebito> historicoDebitos = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public DetalheUsuario id(Long id) {
        this.id = id;
        return this;
    }

    public String getCpf() {
        return this.cpf;
    }

    public DetalheUsuario cpf(String cpf) {
        this.cpf = cpf;
        return this;
    }

    public void setCpf(String cpf) {
        this.cpf = cpf;
    }

    public String getCelular() {
        return this.celular;
    }

    public DetalheUsuario celular(String celular) {
        this.celular = celular;
        return this;
    }

    public void setCelular(String celular) {
        this.celular = celular;
    }

    public User getUsuario() {
        return this.usuario;
    }

    public DetalheUsuario usuario(User user) {
        this.setUsuario(user);
        return this;
    }

    public void setUsuario(User user) {
        this.usuario = user;
    }

    public Set<HistoricoDebito> getHistoricoDebitos() {
        return this.historicoDebitos;
    }

    public DetalheUsuario historicoDebitos(Set<HistoricoDebito> historicoDebitos) {
        this.setHistoricoDebitos(historicoDebitos);
        return this;
    }

    public DetalheUsuario addHistoricoDebito(HistoricoDebito historicoDebito) {
        this.historicoDebitos.add(historicoDebito);
        historicoDebito.setDetalheUsuarioLancamento(this);
        return this;
    }

    public DetalheUsuario removeHistoricoDebito(HistoricoDebito historicoDebito) {
        this.historicoDebitos.remove(historicoDebito);
        historicoDebito.setDetalheUsuarioLancamento(null);
        return this;
    }

    public void setHistoricoDebitos(Set<HistoricoDebito> historicoDebitos) {
        if (this.historicoDebitos != null) {
            this.historicoDebitos.forEach(i -> i.setDetalheUsuarioLancamento(null));
        }
        if (historicoDebitos != null) {
            historicoDebitos.forEach(i -> i.setDetalheUsuarioLancamento(this));
        }
        this.historicoDebitos = historicoDebitos;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof DetalheUsuario)) {
            return false;
        }
        return id != null && id.equals(((DetalheUsuario) o).id);
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "DetalheUsuario{" +
            "id=" + getId() +
            ", cpf='" + getCpf() + "'" +
            ", celular='" + getCelular() + "'" +
            "}";
    }
}
