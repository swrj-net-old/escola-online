package com.swrj.net.escolaonline.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.swrj.net.escolaonline.domain.enumeration.SituacaoSolicitacao;
import java.io.Serializable;
import java.time.LocalDate;
import javax.persistence.*;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

/**
 * A Solicitacao.
 */
@Entity
@Table(name = "solicitacao")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class Solicitacao implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Enumerated(EnumType.STRING)
    @Column(name = "situacao_solicitacao")
    private SituacaoSolicitacao situacaoSolicitacao;

    @Column(name = "data_solicitacao")
    private LocalDate dataSolicitacao;

    @Column(name = "observacoes_solicitante")
    private String observacoesSolicitante;

    @Column(name = "observacoes_atendimento")
    private String observacoesAtendimento;

    @ManyToOne
    @JsonIgnoreProperties(value = { "solicitacaos" }, allowSetters = true)
    private TipoSolicitacao tipoSolicitacaoSolicitacao;

    @ManyToOne
    @JsonIgnoreProperties(
        value = { "solicitacaos", "debitos", "chamadas", "matriculas", "pessoaAluno", "escolaAluno" },
        allowSetters = true
    )
    private Aluno alunoSolicitacao;

    // jhipster-needle-entity-add-field - JHipster will add fields here
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Solicitacao id(Long id) {
        this.id = id;
        return this;
    }

    public SituacaoSolicitacao getSituacaoSolicitacao() {
        return this.situacaoSolicitacao;
    }

    public Solicitacao situacaoSolicitacao(SituacaoSolicitacao situacaoSolicitacao) {
        this.situacaoSolicitacao = situacaoSolicitacao;
        return this;
    }

    public void setSituacaoSolicitacao(SituacaoSolicitacao situacaoSolicitacao) {
        this.situacaoSolicitacao = situacaoSolicitacao;
    }

    public LocalDate getDataSolicitacao() {
        return this.dataSolicitacao;
    }

    public Solicitacao dataSolicitacao(LocalDate dataSolicitacao) {
        this.dataSolicitacao = dataSolicitacao;
        return this;
    }

    public void setDataSolicitacao(LocalDate dataSolicitacao) {
        this.dataSolicitacao = dataSolicitacao;
    }

    public String getObservacoesSolicitante() {
        return this.observacoesSolicitante;
    }

    public Solicitacao observacoesSolicitante(String observacoesSolicitante) {
        this.observacoesSolicitante = observacoesSolicitante;
        return this;
    }

    public void setObservacoesSolicitante(String observacoesSolicitante) {
        this.observacoesSolicitante = observacoesSolicitante;
    }

    public String getObservacoesAtendimento() {
        return this.observacoesAtendimento;
    }

    public Solicitacao observacoesAtendimento(String observacoesAtendimento) {
        this.observacoesAtendimento = observacoesAtendimento;
        return this;
    }

    public void setObservacoesAtendimento(String observacoesAtendimento) {
        this.observacoesAtendimento = observacoesAtendimento;
    }

    public TipoSolicitacao getTipoSolicitacaoSolicitacao() {
        return this.tipoSolicitacaoSolicitacao;
    }

    public Solicitacao tipoSolicitacaoSolicitacao(TipoSolicitacao tipoSolicitacao) {
        this.setTipoSolicitacaoSolicitacao(tipoSolicitacao);
        return this;
    }

    public void setTipoSolicitacaoSolicitacao(TipoSolicitacao tipoSolicitacao) {
        this.tipoSolicitacaoSolicitacao = tipoSolicitacao;
    }

    public Aluno getAlunoSolicitacao() {
        return this.alunoSolicitacao;
    }

    public Solicitacao alunoSolicitacao(Aluno aluno) {
        this.setAlunoSolicitacao(aluno);
        return this;
    }

    public void setAlunoSolicitacao(Aluno aluno) {
        this.alunoSolicitacao = aluno;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Solicitacao)) {
            return false;
        }
        return id != null && id.equals(((Solicitacao) o).id);
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Solicitacao{" +
            "id=" + getId() +
            ", situacaoSolicitacao='" + getSituacaoSolicitacao() + "'" +
            ", dataSolicitacao='" + getDataSolicitacao() + "'" +
            ", observacoesSolicitante='" + getObservacoesSolicitante() + "'" +
            ", observacoesAtendimento='" + getObservacoesAtendimento() + "'" +
            "}";
    }
}
