package com.swrj.net.escolaonline.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import java.io.Serializable;
import java.math.BigDecimal;
import java.util.HashSet;
import java.util.Set;
import javax.persistence.*;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

/**
 * A TipoSolicitacao.
 */
@Entity
@Table(name = "tipo_solicitacao")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class TipoSolicitacao implements Serializable {
    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "nome")
    private String nome;

    @Column(name = "prazo_atendimento")
    private Integer prazoAtendimento;

    @Column(name = "valor_emissao", precision = 21, scale = 2)
    private BigDecimal valorEmissao;

    @OneToMany(mappedBy = "tipoSolicitacaoSolicitacao")
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    private Set<Solicitacao> solicitacaos = new HashSet<>();

    @ManyToOne
    @JsonIgnoreProperties(value = "tipoSolicitacaos", allowSetters = true)
    private Escola escolaTipoSolicitacao;

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

    public TipoSolicitacao nome(String nome) {
        this.nome = nome;
        return this;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public Integer getPrazoAtendimento() {
        return prazoAtendimento;
    }

    public TipoSolicitacao prazoAtendimento(Integer prazoAtendimento) {
        this.prazoAtendimento = prazoAtendimento;
        return this;
    }

    public void setPrazoAtendimento(Integer prazoAtendimento) {
        this.prazoAtendimento = prazoAtendimento;
    }

    public BigDecimal getValorEmissao() {
        return valorEmissao;
    }

    public TipoSolicitacao valorEmissao(BigDecimal valorEmissao) {
        this.valorEmissao = valorEmissao;
        return this;
    }

    public void setValorEmissao(BigDecimal valorEmissao) {
        this.valorEmissao = valorEmissao;
    }

    public Set<Solicitacao> getSolicitacaos() {
        return solicitacaos;
    }

    public TipoSolicitacao solicitacaos(Set<Solicitacao> solicitacaos) {
        this.solicitacaos = solicitacaos;
        return this;
    }

    public TipoSolicitacao addSolicitacao(Solicitacao solicitacao) {
        this.solicitacaos.add(solicitacao);
        solicitacao.setTipoSolicitacaoSolicitacao(this);
        return this;
    }

    public TipoSolicitacao removeSolicitacao(Solicitacao solicitacao) {
        this.solicitacaos.remove(solicitacao);
        solicitacao.setTipoSolicitacaoSolicitacao(null);
        return this;
    }

    public void setSolicitacaos(Set<Solicitacao> solicitacaos) {
        this.solicitacaos = solicitacaos;
    }

    public Escola getEscolaTipoSolicitacao() {
        return escolaTipoSolicitacao;
    }

    public TipoSolicitacao escolaTipoSolicitacao(Escola escola) {
        this.escolaTipoSolicitacao = escola;
        return this;
    }

    public void setEscolaTipoSolicitacao(Escola escola) {
        this.escolaTipoSolicitacao = escola;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof TipoSolicitacao)) {
            return false;
        }
        return id != null && id.equals(((TipoSolicitacao) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "TipoSolicitacao{" +
            "id=" + getId() +
            ", nome='" + getNome() + "'" +
            ", prazoAtendimento=" + getPrazoAtendimento() +
            ", valorEmissao=" + getValorEmissao() +
            "}";
    }
}
