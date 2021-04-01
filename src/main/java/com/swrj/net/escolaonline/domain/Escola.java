package com.swrj.net.escolaonline.domain;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import javax.persistence.*;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

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

    @Column(name = "razao_social")
    private String razaoSocial;

    @Column(name = "cnpj_principal")
    private String cnpjPrincipal;

    @Column(name = "url")
    private String url;

    @Column(name = "prefixo")
    private String prefixo;

    @Column(name = "responsavel_nome")
    private String responsavelNome;

    @Column(name = "responsavel_cpf")
    private String responsavelCpf;

    @Column(name = "responsavel_email")
    private String responsavelEmail;

    @Column(name = "responsavel_celular")
    private String responsavelCelular;

    @OneToMany(mappedBy = "escolaPessoa")
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    private Set<Pessoa> pessoas = new HashSet<>();

    @OneToMany(mappedBy = "escolaAluno")
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    private Set<Aluno> alunos = new HashSet<>();

    @OneToMany(mappedBy = "escolaUnidade")
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    private Set<Unidade> unidades = new HashSet<>();

    @OneToMany(mappedBy = "escolaGrade")
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    private Set<Grade> grades = new HashSet<>();

    @OneToMany(mappedBy = "escolaTipoSolicitacao")
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    private Set<TipoSolicitacao> tipoSolicitacaos = new HashSet<>();

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

    public String getRazaoSocial() {
        return razaoSocial;
    }

    public Escola razaoSocial(String razaoSocial) {
        this.razaoSocial = razaoSocial;
        return this;
    }

    public void setRazaoSocial(String razaoSocial) {
        this.razaoSocial = razaoSocial;
    }

    public String getCnpjPrincipal() {
        return cnpjPrincipal;
    }

    public Escola cnpjPrincipal(String cnpjPrincipal) {
        this.cnpjPrincipal = cnpjPrincipal;
        return this;
    }

    public void setCnpjPrincipal(String cnpjPrincipal) {
        this.cnpjPrincipal = cnpjPrincipal;
    }

    public String getUrl() {
        return url;
    }

    public Escola url(String url) {
        this.url = url;
        return this;
    }

    public void setUrl(String url) {
        this.url = url;
    }

    public String getPrefixo() {
        return prefixo;
    }

    public Escola prefixo(String prefixo) {
        this.prefixo = prefixo;
        return this;
    }

    public void setPrefixo(String prefixo) {
        this.prefixo = prefixo;
    }

    public String getResponsavelNome() {
        return responsavelNome;
    }

    public Escola responsavelNome(String responsavelNome) {
        this.responsavelNome = responsavelNome;
        return this;
    }

    public void setResponsavelNome(String responsavelNome) {
        this.responsavelNome = responsavelNome;
    }

    public String getResponsavelCpf() {
        return responsavelCpf;
    }

    public Escola responsavelCpf(String responsavelCpf) {
        this.responsavelCpf = responsavelCpf;
        return this;
    }

    public void setResponsavelCpf(String responsavelCpf) {
        this.responsavelCpf = responsavelCpf;
    }

    public String getResponsavelEmail() {
        return responsavelEmail;
    }

    public Escola responsavelEmail(String responsavelEmail) {
        this.responsavelEmail = responsavelEmail;
        return this;
    }

    public void setResponsavelEmail(String responsavelEmail) {
        this.responsavelEmail = responsavelEmail;
    }

    public String getResponsavelCelular() {
        return responsavelCelular;
    }

    public Escola responsavelCelular(String responsavelCelular) {
        this.responsavelCelular = responsavelCelular;
        return this;
    }

    public void setResponsavelCelular(String responsavelCelular) {
        this.responsavelCelular = responsavelCelular;
    }

    public Set<Pessoa> getPessoas() {
        return pessoas;
    }

    public Escola pessoas(Set<Pessoa> pessoas) {
        this.pessoas = pessoas;
        return this;
    }

    public Escola addPessoa(Pessoa pessoa) {
        this.pessoas.add(pessoa);
        pessoa.setEscolaPessoa(this);
        return this;
    }

    public Escola removePessoa(Pessoa pessoa) {
        this.pessoas.remove(pessoa);
        pessoa.setEscolaPessoa(null);
        return this;
    }

    public void setPessoas(Set<Pessoa> pessoas) {
        this.pessoas = pessoas;
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

    public Set<Grade> getGrades() {
        return grades;
    }

    public Escola grades(Set<Grade> grades) {
        this.grades = grades;
        return this;
    }

    public Escola addGrade(Grade grade) {
        this.grades.add(grade);
        grade.setEscolaGrade(this);
        return this;
    }

    public Escola removeGrade(Grade grade) {
        this.grades.remove(grade);
        grade.setEscolaGrade(null);
        return this;
    }

    public void setGrades(Set<Grade> grades) {
        this.grades = grades;
    }

    public Set<TipoSolicitacao> getTipoSolicitacaos() {
        return tipoSolicitacaos;
    }

    public Escola tipoSolicitacaos(Set<TipoSolicitacao> tipoSolicitacaos) {
        this.tipoSolicitacaos = tipoSolicitacaos;
        return this;
    }

    public Escola addTipoSolicitacao(TipoSolicitacao tipoSolicitacao) {
        this.tipoSolicitacaos.add(tipoSolicitacao);
        tipoSolicitacao.setEscolaTipoSolicitacao(this);
        return this;
    }

    public Escola removeTipoSolicitacao(TipoSolicitacao tipoSolicitacao) {
        this.tipoSolicitacaos.remove(tipoSolicitacao);
        tipoSolicitacao.setEscolaTipoSolicitacao(null);
        return this;
    }

    public void setTipoSolicitacaos(Set<TipoSolicitacao> tipoSolicitacaos) {
        this.tipoSolicitacaos = tipoSolicitacaos;
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
            ", razaoSocial='" + getRazaoSocial() + "'" +
            ", cnpjPrincipal='" + getCnpjPrincipal() + "'" +
            ", url='" + getUrl() + "'" +
            ", prefixo='" + getPrefixo() + "'" +
            ", responsavelNome='" + getResponsavelNome() + "'" +
            ", responsavelCpf='" + getResponsavelCpf() + "'" +
            ", responsavelEmail='" + getResponsavelEmail() + "'" +
            ", responsavelCelular='" + getResponsavelCelular() + "'" +
            "}";
    }
}
