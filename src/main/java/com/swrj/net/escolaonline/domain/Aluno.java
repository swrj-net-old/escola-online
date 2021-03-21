package com.swrj.net.escolaonline.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.time.LocalDate;
import java.util.HashSet;
import java.util.Set;

import com.swrj.net.escolaonline.domain.enumeration.TipoSanguineo;

/**
 * A Aluno.
 */
@Entity
@Table(name = "aluno")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class Aluno implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "data_nascimento")
    private LocalDate dataNascimento;

    @Enumerated(EnumType.STRING)
    @Column(name = "tipo_sanguineo")
    private TipoSanguineo tipoSanguineo;

    @Column(name = "nome_pai")
    private String nomePai;

    @Column(name = "telefone_pai")
    private String telefonePai;

    @Column(name = "nome_mae")
    private String nomeMae;

    @Column(name = "telefone_mae")
    private String telefoneMae;

    @Column(name = "nome_responsavel")
    private String nomeResponsavel;

    @Column(name = "cpf_responsavel")
    private String cpfResponsavel;

    @Column(name = "observacoes")
    private String observacoes;

    @OneToMany(mappedBy = "alunoSolicitacao")
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    private Set<Solicitacao> solicitacaos = new HashSet<>();

    @OneToMany(mappedBy = "alunoDebito")
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    private Set<Debito> debitos = new HashSet<>();

    @OneToMany(mappedBy = "alunoChamada")
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    private Set<Chamada> chamadas = new HashSet<>();

    @OneToMany(mappedBy = "alunoMatricula")
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    private Set<Matricula> matriculas = new HashSet<>();

    @ManyToOne
    @JsonIgnoreProperties(value = "alunos", allowSetters = true)
    private Pessoa pessoaAluno;

    @ManyToOne
    @JsonIgnoreProperties(value = "alunos", allowSetters = true)
    private Escola escolaAluno;

    // jhipster-needle-entity-add-field - JHipster will add fields here
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public LocalDate getDataNascimento() {
        return dataNascimento;
    }

    public Aluno dataNascimento(LocalDate dataNascimento) {
        this.dataNascimento = dataNascimento;
        return this;
    }

    public void setDataNascimento(LocalDate dataNascimento) {
        this.dataNascimento = dataNascimento;
    }

    public TipoSanguineo getTipoSanguineo() {
        return tipoSanguineo;
    }

    public Aluno tipoSanguineo(TipoSanguineo tipoSanguineo) {
        this.tipoSanguineo = tipoSanguineo;
        return this;
    }

    public void setTipoSanguineo(TipoSanguineo tipoSanguineo) {
        this.tipoSanguineo = tipoSanguineo;
    }

    public String getNomePai() {
        return nomePai;
    }

    public Aluno nomePai(String nomePai) {
        this.nomePai = nomePai;
        return this;
    }

    public void setNomePai(String nomePai) {
        this.nomePai = nomePai;
    }

    public String getTelefonePai() {
        return telefonePai;
    }

    public Aluno telefonePai(String telefonePai) {
        this.telefonePai = telefonePai;
        return this;
    }

    public void setTelefonePai(String telefonePai) {
        this.telefonePai = telefonePai;
    }

    public String getNomeMae() {
        return nomeMae;
    }

    public Aluno nomeMae(String nomeMae) {
        this.nomeMae = nomeMae;
        return this;
    }

    public void setNomeMae(String nomeMae) {
        this.nomeMae = nomeMae;
    }

    public String getTelefoneMae() {
        return telefoneMae;
    }

    public Aluno telefoneMae(String telefoneMae) {
        this.telefoneMae = telefoneMae;
        return this;
    }

    public void setTelefoneMae(String telefoneMae) {
        this.telefoneMae = telefoneMae;
    }

    public String getNomeResponsavel() {
        return nomeResponsavel;
    }

    public Aluno nomeResponsavel(String nomeResponsavel) {
        this.nomeResponsavel = nomeResponsavel;
        return this;
    }

    public void setNomeResponsavel(String nomeResponsavel) {
        this.nomeResponsavel = nomeResponsavel;
    }

    public String getCpfResponsavel() {
        return cpfResponsavel;
    }

    public Aluno cpfResponsavel(String cpfResponsavel) {
        this.cpfResponsavel = cpfResponsavel;
        return this;
    }

    public void setCpfResponsavel(String cpfResponsavel) {
        this.cpfResponsavel = cpfResponsavel;
    }

    public String getObservacoes() {
        return observacoes;
    }

    public Aluno observacoes(String observacoes) {
        this.observacoes = observacoes;
        return this;
    }

    public void setObservacoes(String observacoes) {
        this.observacoes = observacoes;
    }

    public Set<Solicitacao> getSolicitacaos() {
        return solicitacaos;
    }

    public Aluno solicitacaos(Set<Solicitacao> solicitacaos) {
        this.solicitacaos = solicitacaos;
        return this;
    }

    public Aluno addSolicitacao(Solicitacao solicitacao) {
        this.solicitacaos.add(solicitacao);
        solicitacao.setAlunoSolicitacao(this);
        return this;
    }

    public Aluno removeSolicitacao(Solicitacao solicitacao) {
        this.solicitacaos.remove(solicitacao);
        solicitacao.setAlunoSolicitacao(null);
        return this;
    }

    public void setSolicitacaos(Set<Solicitacao> solicitacaos) {
        this.solicitacaos = solicitacaos;
    }

    public Set<Debito> getDebitos() {
        return debitos;
    }

    public Aluno debitos(Set<Debito> debitos) {
        this.debitos = debitos;
        return this;
    }

    public Aluno addDebito(Debito debito) {
        this.debitos.add(debito);
        debito.setAlunoDebito(this);
        return this;
    }

    public Aluno removeDebito(Debito debito) {
        this.debitos.remove(debito);
        debito.setAlunoDebito(null);
        return this;
    }

    public void setDebitos(Set<Debito> debitos) {
        this.debitos = debitos;
    }

    public Set<Chamada> getChamadas() {
        return chamadas;
    }

    public Aluno chamadas(Set<Chamada> chamadas) {
        this.chamadas = chamadas;
        return this;
    }

    public Aluno addChamada(Chamada chamada) {
        this.chamadas.add(chamada);
        chamada.setAlunoChamada(this);
        return this;
    }

    public Aluno removeChamada(Chamada chamada) {
        this.chamadas.remove(chamada);
        chamada.setAlunoChamada(null);
        return this;
    }

    public void setChamadas(Set<Chamada> chamadas) {
        this.chamadas = chamadas;
    }

    public Set<Matricula> getMatriculas() {
        return matriculas;
    }

    public Aluno matriculas(Set<Matricula> matriculas) {
        this.matriculas = matriculas;
        return this;
    }

    public Aluno addMatricula(Matricula matricula) {
        this.matriculas.add(matricula);
        matricula.setAlunoMatricula(this);
        return this;
    }

    public Aluno removeMatricula(Matricula matricula) {
        this.matriculas.remove(matricula);
        matricula.setAlunoMatricula(null);
        return this;
    }

    public void setMatriculas(Set<Matricula> matriculas) {
        this.matriculas = matriculas;
    }

    public Pessoa getPessoaAluno() {
        return pessoaAluno;
    }

    public Aluno pessoaAluno(Pessoa pessoa) {
        this.pessoaAluno = pessoa;
        return this;
    }

    public void setPessoaAluno(Pessoa pessoa) {
        this.pessoaAluno = pessoa;
    }

    public Escola getEscolaAluno() {
        return escolaAluno;
    }

    public Aluno escolaAluno(Escola escola) {
        this.escolaAluno = escola;
        return this;
    }

    public void setEscolaAluno(Escola escola) {
        this.escolaAluno = escola;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Aluno)) {
            return false;
        }
        return id != null && id.equals(((Aluno) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Aluno{" +
            "id=" + getId() +
            ", dataNascimento='" + getDataNascimento() + "'" +
            ", tipoSanguineo='" + getTipoSanguineo() + "'" +
            ", nomePai='" + getNomePai() + "'" +
            ", telefonePai='" + getTelefonePai() + "'" +
            ", nomeMae='" + getNomeMae() + "'" +
            ", telefoneMae='" + getTelefoneMae() + "'" +
            ", nomeResponsavel='" + getNomeResponsavel() + "'" +
            ", cpfResponsavel='" + getCpfResponsavel() + "'" +
            ", observacoes='" + getObservacoes() + "'" +
            "}";
    }
}
