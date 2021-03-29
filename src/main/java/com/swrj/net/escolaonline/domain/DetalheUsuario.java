package com.swrj.net.escolaonline.domain;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;

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
    private Set<HistoricoDebito> historicoDebitos = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getCpf() {
        return cpf;
    }

    public DetalheUsuario cpf(String cpf) {
        this.cpf = cpf;
        return this;
    }

    public void setCpf(String cpf) {
        this.cpf = cpf;
    }

    public String getCelular() {
        return celular;
    }

    public DetalheUsuario celular(String celular) {
        this.celular = celular;
        return this;
    }

    public void setCelular(String celular) {
        this.celular = celular;
    }

    public User getUsuario() {
        return usuario;
    }

    public DetalheUsuario usuario(User user) {
        this.usuario = user;
        return this;
    }

    public void setUsuario(User user) {
        this.usuario = user;
    }

    public Set<HistoricoDebito> getHistoricoDebitos() {
        return historicoDebitos;
    }

    public DetalheUsuario historicoDebitos(Set<HistoricoDebito> historicoDebitos) {
        this.historicoDebitos = historicoDebitos;
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
        return 31;
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
