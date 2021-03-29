package com.swrj.net.escolaonline.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.swrj.net.escolaonline.domain.enumeration.SituacaoDebito;
import com.swrj.net.escolaonline.domain.enumeration.TipoDebito;
import java.io.Serializable;
import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.HashSet;
import java.util.Set;
import javax.persistence.*;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

/**
 * A Debito.
 */
@Entity
@Table(name = "debito")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class Debito implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Enumerated(EnumType.STRING)
    @Column(name = "tipo_debito")
    private TipoDebito tipoDebito;

    @Enumerated(EnumType.STRING)
    @Column(name = "situacao_debito")
    private SituacaoDebito situacaoDebito;

    @Column(name = "data_vencimento")
    private LocalDate dataVencimento;

    @Column(name = "data_pagamento")
    private LocalDate dataPagamento;

    @Column(name = "valor_original", precision = 21, scale = 2)
    private BigDecimal valorOriginal;

    @Column(name = "total_pago", precision = 21, scale = 2)
    private BigDecimal totalPago;

    @Column(name = "total_desconto", precision = 21, scale = 2)
    private BigDecimal totalDesconto;

    @Column(name = "total_devido", precision = 21, scale = 2)
    private BigDecimal totalDevido;

    @Column(name = "observacoes")
    private String observacoes;

    @OneToMany(mappedBy = "debitoHistoricoDebito")
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    @JsonIgnoreProperties(value = { "debitoHistoricoDebito", "detalheUsuarioLancamento" }, allowSetters = true)
    private Set<HistoricoDebito> historicoDebitos = new HashSet<>();

    @ManyToOne
    @JsonIgnoreProperties(
        value = { "solicitacaos", "debitos", "chamadas", "matriculas", "pessoaAluno", "escolaAluno" },
        allowSetters = true
    )
    private Aluno alunoDebito;

    // jhipster-needle-entity-add-field - JHipster will add fields here
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Debito id(Long id) {
        this.id = id;
        return this;
    }

    public TipoDebito getTipoDebito() {
        return this.tipoDebito;
    }

    public Debito tipoDebito(TipoDebito tipoDebito) {
        this.tipoDebito = tipoDebito;
        return this;
    }

    public void setTipoDebito(TipoDebito tipoDebito) {
        this.tipoDebito = tipoDebito;
    }

    public SituacaoDebito getSituacaoDebito() {
        return this.situacaoDebito;
    }

    public Debito situacaoDebito(SituacaoDebito situacaoDebito) {
        this.situacaoDebito = situacaoDebito;
        return this;
    }

    public void setSituacaoDebito(SituacaoDebito situacaoDebito) {
        this.situacaoDebito = situacaoDebito;
    }

    public LocalDate getDataVencimento() {
        return this.dataVencimento;
    }

    public Debito dataVencimento(LocalDate dataVencimento) {
        this.dataVencimento = dataVencimento;
        return this;
    }

    public void setDataVencimento(LocalDate dataVencimento) {
        this.dataVencimento = dataVencimento;
    }

    public LocalDate getDataPagamento() {
        return this.dataPagamento;
    }

    public Debito dataPagamento(LocalDate dataPagamento) {
        this.dataPagamento = dataPagamento;
        return this;
    }

    public void setDataPagamento(LocalDate dataPagamento) {
        this.dataPagamento = dataPagamento;
    }

    public BigDecimal getValorOriginal() {
        return this.valorOriginal;
    }

    public Debito valorOriginal(BigDecimal valorOriginal) {
        this.valorOriginal = valorOriginal;
        return this;
    }

    public void setValorOriginal(BigDecimal valorOriginal) {
        this.valorOriginal = valorOriginal;
    }

    public BigDecimal getTotalPago() {
        return this.totalPago;
    }

    public Debito totalPago(BigDecimal totalPago) {
        this.totalPago = totalPago;
        return this;
    }

    public void setTotalPago(BigDecimal totalPago) {
        this.totalPago = totalPago;
    }

    public BigDecimal getTotalDesconto() {
        return this.totalDesconto;
    }

    public Debito totalDesconto(BigDecimal totalDesconto) {
        this.totalDesconto = totalDesconto;
        return this;
    }

    public void setTotalDesconto(BigDecimal totalDesconto) {
        this.totalDesconto = totalDesconto;
    }

    public BigDecimal getTotalDevido() {
        return this.totalDevido;
    }

    public Debito totalDevido(BigDecimal totalDevido) {
        this.totalDevido = totalDevido;
        return this;
    }

    public void setTotalDevido(BigDecimal totalDevido) {
        this.totalDevido = totalDevido;
    }

    public String getObservacoes() {
        return this.observacoes;
    }

    public Debito observacoes(String observacoes) {
        this.observacoes = observacoes;
        return this;
    }

    public void setObservacoes(String observacoes) {
        this.observacoes = observacoes;
    }

    public Set<HistoricoDebito> getHistoricoDebitos() {
        return this.historicoDebitos;
    }

    public Debito historicoDebitos(Set<HistoricoDebito> historicoDebitos) {
        this.setHistoricoDebitos(historicoDebitos);
        return this;
    }

    public Debito addHistoricoDebito(HistoricoDebito historicoDebito) {
        this.historicoDebitos.add(historicoDebito);
        historicoDebito.setDebitoHistoricoDebito(this);
        return this;
    }

    public Debito removeHistoricoDebito(HistoricoDebito historicoDebito) {
        this.historicoDebitos.remove(historicoDebito);
        historicoDebito.setDebitoHistoricoDebito(null);
        return this;
    }

    public void setHistoricoDebitos(Set<HistoricoDebito> historicoDebitos) {
        if (this.historicoDebitos != null) {
            this.historicoDebitos.forEach(i -> i.setDebitoHistoricoDebito(null));
        }
        if (historicoDebitos != null) {
            historicoDebitos.forEach(i -> i.setDebitoHistoricoDebito(this));
        }
        this.historicoDebitos = historicoDebitos;
    }

    public Aluno getAlunoDebito() {
        return this.alunoDebito;
    }

    public Debito alunoDebito(Aluno aluno) {
        this.setAlunoDebito(aluno);
        return this;
    }

    public void setAlunoDebito(Aluno aluno) {
        this.alunoDebito = aluno;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Debito)) {
            return false;
        }
        return id != null && id.equals(((Debito) o).id);
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Debito{" +
            "id=" + getId() +
            ", tipoDebito='" + getTipoDebito() + "'" +
            ", situacaoDebito='" + getSituacaoDebito() + "'" +
            ", dataVencimento='" + getDataVencimento() + "'" +
            ", dataPagamento='" + getDataPagamento() + "'" +
            ", valorOriginal=" + getValorOriginal() +
            ", totalPago=" + getTotalPago() +
            ", totalDesconto=" + getTotalDesconto() +
            ", totalDevido=" + getTotalDevido() +
            ", observacoes='" + getObservacoes() + "'" +
            "}";
    }
}
