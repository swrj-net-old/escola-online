package com.swrj.net.escolaonline.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.swrj.net.escolaonline.domain.enumeration.TipoSanguineo;
import java.io.Serializable;
import java.time.LocalDate;
import java.util.HashSet;
import java.util.Set;
import javax.persistence.*;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

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
    @JsonIgnoreProperties(value = { "tipoSolicitacaoSolicitacao", "alunoSolicitacao" }, allowSetters = true)
    private Set<Solicitacao> solicitacaos = new HashSet<>();

    @OneToMany(mappedBy = "alunoDebito")
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    @JsonIgnoreProperties(value = { "historicoDebitos", "alunoDebito" }, allowSetters = true)
    private Set<Debito> debitos = new HashSet<>();

    @OneToMany(mappedBy = "alunoChamada")
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    @JsonIgnoreProperties(value = { "alunoChamada", "turmaChamada", "professorChamada" }, allowSetters = true)
    private Set<Chamada> chamadas = new HashSet<>();

    @OneToMany(mappedBy = "alunoMatricula")
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    @JsonIgnoreProperties(value = { "turmaMatricula", "alunoMatricula" }, allowSetters = true)
    private Set<Matricula> matriculas = new HashSet<>();

    @ManyToOne
    @JsonIgnoreProperties(value = { "diretors", "professors", "alunos", "cidadePessoa", "escolaPessoa" }, allowSetters = true)
    private Pessoa pessoaAluno;

    @ManyToOne
    @JsonIgnoreProperties(value = { "pessoas", "alunos", "unidades", "grades", "tipoSolicitacaos" }, allowSetters = true)
    private Escola escolaAluno;

    // jhipster-needle-entity-add-field - JHipster will add fields here
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Aluno id(Long id) {
        this.id = id;
        return this;
    }

    public LocalDate getDataNascimento() {
        return this.dataNascimento;
    }

    public Aluno dataNascimento(LocalDate dataNascimento) {
        this.dataNascimento = dataNascimento;
        return this;
    }

    public void setDataNascimento(LocalDate dataNascimento) {
        this.dataNascimento = dataNascimento;
    }

    public TipoSanguineo getTipoSanguineo() {
        return this.tipoSanguineo;
    }

    public Aluno tipoSanguineo(TipoSanguineo tipoSanguineo) {
        this.tipoSanguineo = tipoSanguineo;
        return this;
    }

    public void setTipoSanguineo(TipoSanguineo tipoSanguineo) {
        this.tipoSanguineo = tipoSanguineo;
    }

    public String getNomePai() {
        return this.nomePai;
    }

    public Aluno nomePai(String nomePai) {
        this.nomePai = nomePai;
        return this;
    }

    public void setNomePai(String nomePai) {
        this.nomePai = nomePai;
    }

    public String getTelefonePai() {
        return this.telefonePai;
    }

    public Aluno telefonePai(String telefonePai) {
        this.telefonePai = telefonePai;
        return this;
    }

    public void setTelefonePai(String telefonePai) {
        this.telefonePai = telefonePai;
    }

    public String getNomeMae() {
        return this.nomeMae;
    }

    public Aluno nomeMae(String nomeMae) {
        this.nomeMae = nomeMae;
        return this;
    }

    public void setNomeMae(String nomeMae) {
        this.nomeMae = nomeMae;
    }

    public String getTelefoneMae() {
        return this.telefoneMae;
    }

    public Aluno telefoneMae(String telefoneMae) {
        this.telefoneMae = telefoneMae;
        return this;
    }

    public void setTelefoneMae(String telefoneMae) {
        this.telefoneMae = telefoneMae;
    }

    public String getNomeResponsavel() {
        return this.nomeResponsavel;
    }

    public Aluno nomeResponsavel(String nomeResponsavel) {
        this.nomeResponsavel = nomeResponsavel;
        return this;
    }

    public void setNomeResponsavel(String nomeResponsavel) {
        this.nomeResponsavel = nomeResponsavel;
    }

    public String getCpfResponsavel() {
        return this.cpfResponsavel;
    }

    public Aluno cpfResponsavel(String cpfResponsavel) {
        this.cpfResponsavel = cpfResponsavel;
        return this;
    }

    public void setCpfResponsavel(String cpfResponsavel) {
        this.cpfResponsavel = cpfResponsavel;
    }

    public String getObservacoes() {
        return this.observacoes;
    }

    public Aluno observacoes(String observacoes) {
        this.observacoes = observacoes;
        return this;
    }

    public void setObservacoes(String observacoes) {
        this.observacoes = observacoes;
    }

    public Set<Solicitacao> getSolicitacaos() {
        return this.solicitacaos;
    }

    public Aluno solicitacaos(Set<Solicitacao> solicitacaos) {
        this.setSolicitacaos(solicitacaos);
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
        if (this.solicitacaos != null) {
            this.solicitacaos.forEach(i -> i.setAlunoSolicitacao(null));
        }
        if (solicitacaos != null) {
            solicitacaos.forEach(i -> i.setAlunoSolicitacao(this));
        }
        this.solicitacaos = solicitacaos;
    }

    public Set<Debito> getDebitos() {
        return this.debitos;
    }

    public Aluno debitos(Set<Debito> debitos) {
        this.setDebitos(debitos);
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
        if (this.debitos != null) {
            this.debitos.forEach(i -> i.setAlunoDebito(null));
        }
        if (debitos != null) {
            debitos.forEach(i -> i.setAlunoDebito(this));
        }
        this.debitos = debitos;
    }

    public Set<Chamada> getChamadas() {
        return this.chamadas;
    }

    public Aluno chamadas(Set<Chamada> chamadas) {
        this.setChamadas(chamadas);
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
        if (this.chamadas != null) {
            this.chamadas.forEach(i -> i.setAlunoChamada(null));
        }
        if (chamadas != null) {
            chamadas.forEach(i -> i.setAlunoChamada(this));
        }
        this.chamadas = chamadas;
    }

    public Set<Matricula> getMatriculas() {
        return this.matriculas;
    }

    public Aluno matriculas(Set<Matricula> matriculas) {
        this.setMatriculas(matriculas);
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
        if (this.matriculas != null) {
            this.matriculas.forEach(i -> i.setAlunoMatricula(null));
        }
        if (matriculas != null) {
            matriculas.forEach(i -> i.setAlunoMatricula(this));
        }
        this.matriculas = matriculas;
    }

    public Pessoa getPessoaAluno() {
        return this.pessoaAluno;
    }

    public Aluno pessoaAluno(Pessoa pessoa) {
        this.setPessoaAluno(pessoa);
        return this;
    }

    public void setPessoaAluno(Pessoa pessoa) {
        this.pessoaAluno = pessoa;
    }

    public Escola getEscolaAluno() {
        return this.escolaAluno;
    }

    public Aluno escolaAluno(Escola escola) {
        this.setEscolaAluno(escola);
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
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
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
