package com.swrj.net.escolaonline.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
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
    @JsonIgnoreProperties(value = { "diretors", "professors", "alunos", "cidadePessoa", "escolaPessoa" }, allowSetters = true)
    private Set<Pessoa> pessoas = new HashSet<>();

    @OneToMany(mappedBy = "escolaAluno")
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    @JsonIgnoreProperties(
        value = { "solicitacaos", "debitos", "chamadas", "matriculas", "pessoaAluno", "escolaAluno" },
        allowSetters = true
    )
    private Set<Aluno> alunos = new HashSet<>();

    @OneToMany(mappedBy = "escolaUnidade")
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    @JsonIgnoreProperties(value = { "diretors", "professors", "turmas", "escolaUnidade" }, allowSetters = true)
    private Set<Unidade> unidades = new HashSet<>();

    @OneToMany(mappedBy = "escolaGrade")
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    @JsonIgnoreProperties(value = { "serieGrade", "materiaGrade", "escolaGrade" }, allowSetters = true)
    private Set<Grade> grades = new HashSet<>();

    @OneToMany(mappedBy = "escolaTipoSolicitacao")
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    @JsonIgnoreProperties(value = { "solicitacaos", "escolaTipoSolicitacao" }, allowSetters = true)
    private Set<TipoSolicitacao> tipoSolicitacaos = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Escola id(Long id) {
        this.id = id;
        return this;
    }

    public String getNome() {
        return this.nome;
    }

    public Escola nome(String nome) {
        this.nome = nome;
        return this;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public String getRazaoSocial() {
        return this.razaoSocial;
    }

    public Escola razaoSocial(String razaoSocial) {
        this.razaoSocial = razaoSocial;
        return this;
    }

    public void setRazaoSocial(String razaoSocial) {
        this.razaoSocial = razaoSocial;
    }

    public String getCnpjPrincipal() {
        return this.cnpjPrincipal;
    }

    public Escola cnpjPrincipal(String cnpjPrincipal) {
        this.cnpjPrincipal = cnpjPrincipal;
        return this;
    }

    public void setCnpjPrincipal(String cnpjPrincipal) {
        this.cnpjPrincipal = cnpjPrincipal;
    }

    public String getUrl() {
        return this.url;
    }

    public Escola url(String url) {
        this.url = url;
        return this;
    }

    public void setUrl(String url) {
        this.url = url;
    }

    public String getPrefixo() {
        return this.prefixo;
    }

    public Escola prefixo(String prefixo) {
        this.prefixo = prefixo;
        return this;
    }

    public void setPrefixo(String prefixo) {
        this.prefixo = prefixo;
    }

    public String getResponsavelNome() {
        return this.responsavelNome;
    }

    public Escola responsavelNome(String responsavelNome) {
        this.responsavelNome = responsavelNome;
        return this;
    }

    public void setResponsavelNome(String responsavelNome) {
        this.responsavelNome = responsavelNome;
    }

    public String getResponsavelCpf() {
        return this.responsavelCpf;
    }

    public Escola responsavelCpf(String responsavelCpf) {
        this.responsavelCpf = responsavelCpf;
        return this;
    }

    public void setResponsavelCpf(String responsavelCpf) {
        this.responsavelCpf = responsavelCpf;
    }

    public String getResponsavelEmail() {
        return this.responsavelEmail;
    }

    public Escola responsavelEmail(String responsavelEmail) {
        this.responsavelEmail = responsavelEmail;
        return this;
    }

    public void setResponsavelEmail(String responsavelEmail) {
        this.responsavelEmail = responsavelEmail;
    }

    public String getResponsavelCelular() {
        return this.responsavelCelular;
    }

    public Escola responsavelCelular(String responsavelCelular) {
        this.responsavelCelular = responsavelCelular;
        return this;
    }

    public void setResponsavelCelular(String responsavelCelular) {
        this.responsavelCelular = responsavelCelular;
    }

    public Set<Pessoa> getPessoas() {
        return this.pessoas;
    }

    public Escola pessoas(Set<Pessoa> pessoas) {
        this.setPessoas(pessoas);
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
        if (this.pessoas != null) {
            this.pessoas.forEach(i -> i.setEscolaPessoa(null));
        }
        if (pessoas != null) {
            pessoas.forEach(i -> i.setEscolaPessoa(this));
        }
        this.pessoas = pessoas;
    }

    public Set<Aluno> getAlunos() {
        return this.alunos;
    }

    public Escola alunos(Set<Aluno> alunos) {
        this.setAlunos(alunos);
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
        if (this.alunos != null) {
            this.alunos.forEach(i -> i.setEscolaAluno(null));
        }
        if (alunos != null) {
            alunos.forEach(i -> i.setEscolaAluno(this));
        }
        this.alunos = alunos;
    }

    public Set<Unidade> getUnidades() {
        return this.unidades;
    }

    public Escola unidades(Set<Unidade> unidades) {
        this.setUnidades(unidades);
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
        if (this.unidades != null) {
            this.unidades.forEach(i -> i.setEscolaUnidade(null));
        }
        if (unidades != null) {
            unidades.forEach(i -> i.setEscolaUnidade(this));
        }
        this.unidades = unidades;
    }

    public Set<Grade> getGrades() {
        return this.grades;
    }

    public Escola grades(Set<Grade> grades) {
        this.setGrades(grades);
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
        if (this.grades != null) {
            this.grades.forEach(i -> i.setEscolaGrade(null));
        }
        if (grades != null) {
            grades.forEach(i -> i.setEscolaGrade(this));
        }
        this.grades = grades;
    }

    public Set<TipoSolicitacao> getTipoSolicitacaos() {
        return this.tipoSolicitacaos;
    }

    public Escola tipoSolicitacaos(Set<TipoSolicitacao> tipoSolicitacaos) {
        this.setTipoSolicitacaos(tipoSolicitacaos);
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
        if (this.tipoSolicitacaos != null) {
            this.tipoSolicitacaos.forEach(i -> i.setEscolaTipoSolicitacao(null));
        }
        if (tipoSolicitacaos != null) {
            tipoSolicitacaos.forEach(i -> i.setEscolaTipoSolicitacao(this));
        }
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
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
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
