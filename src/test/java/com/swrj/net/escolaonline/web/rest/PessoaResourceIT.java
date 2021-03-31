package com.swrj.net.escolaonline.web.rest;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import com.swrj.net.escolaonline.IntegrationTest;
import com.swrj.net.escolaonline.domain.Pessoa;
import com.swrj.net.escolaonline.repository.PessoaRepository;
import java.util.List;
import java.util.Random;
import java.util.concurrent.atomic.AtomicLong;
import javax.persistence.EntityManager;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.transaction.annotation.Transactional;

/**
 * Integration tests for the {@link PessoaResource} REST controller.
 */
@IntegrationTest
@AutoConfigureMockMvc
@WithMockUser
class PessoaResourceIT {

    private static final String DEFAULT_NOME = "AAAAAAAAAA";
    private static final String UPDATED_NOME = "BBBBBBBBBB";

    private static final String DEFAULT_CPF = "AAAAAAAAAA";
    private static final String UPDATED_CPF = "BBBBBBBBBB";

    private static final String DEFAULT_RG = "AAAAAAAAAA";
    private static final String UPDATED_RG = "BBBBBBBBBB";

    private static final String DEFAULT_ENDERECO = "AAAAAAAAAA";
    private static final String UPDATED_ENDERECO = "BBBBBBBBBB";

    private static final String DEFAULT_COMPLEMENTO = "AAAAAAAAAA";
    private static final String UPDATED_COMPLEMENTO = "BBBBBBBBBB";

    private static final String DEFAULT_BAIRRO = "AAAAAAAAAA";
    private static final String UPDATED_BAIRRO = "BBBBBBBBBB";

    private static final String DEFAULT_CIDADE = "AAAAAAAAAA";
    private static final String UPDATED_CIDADE = "BBBBBBBBBB";

    private static final String DEFAULT_CEP = "AAAAAAAAAA";
    private static final String UPDATED_CEP = "BBBBBBBBBB";

    private static final String DEFAULT_TELEFONE_CELULAR = "AAAAAAAAAA";
    private static final String UPDATED_TELEFONE_CELULAR = "BBBBBBBBBB";

    private static final String DEFAULT_TELEFONE_RESIDENCIAL = "AAAAAAAAAA";
    private static final String UPDATED_TELEFONE_RESIDENCIAL = "BBBBBBBBBB";

    private static final String DEFAULT_TELEFONE_COMERCIAL = "AAAAAAAAAA";
    private static final String UPDATED_TELEFONE_COMERCIAL = "BBBBBBBBBB";

    private static final String DEFAULT_EMAIL = "AAAAAAAAAA";
    private static final String UPDATED_EMAIL = "BBBBBBBBBB";

    private static final String DEFAULT_OBSERVACOES = "AAAAAAAAAA";
    private static final String UPDATED_OBSERVACOES = "BBBBBBBBBB";

    private static final String ENTITY_API_URL = "/api/pessoas";
    private static final String ENTITY_API_URL_ID = ENTITY_API_URL + "/{id}";

    private static Random random = new Random();
    private static AtomicLong count = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));

    @Autowired
    private PessoaRepository pessoaRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restPessoaMockMvc;

    private Pessoa pessoa;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Pessoa createEntity(EntityManager em) {
        Pessoa pessoa = new Pessoa()
            .nome(DEFAULT_NOME)
            .cpf(DEFAULT_CPF)
            .rg(DEFAULT_RG)
            .endereco(DEFAULT_ENDERECO)
            .complemento(DEFAULT_COMPLEMENTO)
            .bairro(DEFAULT_BAIRRO)
            .cidade(DEFAULT_CIDADE)
            .cep(DEFAULT_CEP)
            .telefoneCelular(DEFAULT_TELEFONE_CELULAR)
            .telefoneResidencial(DEFAULT_TELEFONE_RESIDENCIAL)
            .telefoneComercial(DEFAULT_TELEFONE_COMERCIAL)
            .email(DEFAULT_EMAIL)
            .observacoes(DEFAULT_OBSERVACOES);
        return pessoa;
    }

    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Pessoa createUpdatedEntity(EntityManager em) {
        Pessoa pessoa = new Pessoa()
            .nome(UPDATED_NOME)
            .cpf(UPDATED_CPF)
            .rg(UPDATED_RG)
            .endereco(UPDATED_ENDERECO)
            .complemento(UPDATED_COMPLEMENTO)
            .bairro(UPDATED_BAIRRO)
            .cidade(UPDATED_CIDADE)
            .cep(UPDATED_CEP)
            .telefoneCelular(UPDATED_TELEFONE_CELULAR)
            .telefoneResidencial(UPDATED_TELEFONE_RESIDENCIAL)
            .telefoneComercial(UPDATED_TELEFONE_COMERCIAL)
            .email(UPDATED_EMAIL)
            .observacoes(UPDATED_OBSERVACOES);
        return pessoa;
    }

    @BeforeEach
    public void initTest() {
        pessoa = createEntity(em);
    }

    @Test
    @Transactional
    void createPessoa() throws Exception {
        int databaseSizeBeforeCreate = pessoaRepository.findAll().size();
        // Create the Pessoa
        restPessoaMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(pessoa)))
            .andExpect(status().isCreated());

        // Validate the Pessoa in the database
        List<Pessoa> pessoaList = pessoaRepository.findAll();
        assertThat(pessoaList).hasSize(databaseSizeBeforeCreate + 1);
        Pessoa testPessoa = pessoaList.get(pessoaList.size() - 1);
        assertThat(testPessoa.getNome()).isEqualTo(DEFAULT_NOME);
        assertThat(testPessoa.getCpf()).isEqualTo(DEFAULT_CPF);
        assertThat(testPessoa.getRg()).isEqualTo(DEFAULT_RG);
        assertThat(testPessoa.getEndereco()).isEqualTo(DEFAULT_ENDERECO);
        assertThat(testPessoa.getComplemento()).isEqualTo(DEFAULT_COMPLEMENTO);
        assertThat(testPessoa.getBairro()).isEqualTo(DEFAULT_BAIRRO);
        assertThat(testPessoa.getCidade()).isEqualTo(DEFAULT_CIDADE);
        assertThat(testPessoa.getCep()).isEqualTo(DEFAULT_CEP);
        assertThat(testPessoa.getTelefoneCelular()).isEqualTo(DEFAULT_TELEFONE_CELULAR);
        assertThat(testPessoa.getTelefoneResidencial()).isEqualTo(DEFAULT_TELEFONE_RESIDENCIAL);
        assertThat(testPessoa.getTelefoneComercial()).isEqualTo(DEFAULT_TELEFONE_COMERCIAL);
        assertThat(testPessoa.getEmail()).isEqualTo(DEFAULT_EMAIL);
        assertThat(testPessoa.getObservacoes()).isEqualTo(DEFAULT_OBSERVACOES);
    }

    @Test
    @Transactional
    void createPessoaWithExistingId() throws Exception {
        // Create the Pessoa with an existing ID
        pessoa.setId(1L);

        int databaseSizeBeforeCreate = pessoaRepository.findAll().size();

        // An entity with an existing ID cannot be created, so this API call must fail
        restPessoaMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(pessoa)))
            .andExpect(status().isBadRequest());

        // Validate the Pessoa in the database
        List<Pessoa> pessoaList = pessoaRepository.findAll();
        assertThat(pessoaList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    void getAllPessoas() throws Exception {
        // Initialize the database
        pessoaRepository.saveAndFlush(pessoa);

        // Get all the pessoaList
        restPessoaMockMvc
            .perform(get(ENTITY_API_URL + "?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(pessoa.getId().intValue())))
            .andExpect(jsonPath("$.[*].nome").value(hasItem(DEFAULT_NOME)))
            .andExpect(jsonPath("$.[*].cpf").value(hasItem(DEFAULT_CPF)))
            .andExpect(jsonPath("$.[*].rg").value(hasItem(DEFAULT_RG)))
            .andExpect(jsonPath("$.[*].endereco").value(hasItem(DEFAULT_ENDERECO)))
            .andExpect(jsonPath("$.[*].complemento").value(hasItem(DEFAULT_COMPLEMENTO)))
            .andExpect(jsonPath("$.[*].bairro").value(hasItem(DEFAULT_BAIRRO)))
            .andExpect(jsonPath("$.[*].cidade").value(hasItem(DEFAULT_CIDADE)))
            .andExpect(jsonPath("$.[*].cep").value(hasItem(DEFAULT_CEP)))
            .andExpect(jsonPath("$.[*].telefoneCelular").value(hasItem(DEFAULT_TELEFONE_CELULAR)))
            .andExpect(jsonPath("$.[*].telefoneResidencial").value(hasItem(DEFAULT_TELEFONE_RESIDENCIAL)))
            .andExpect(jsonPath("$.[*].telefoneComercial").value(hasItem(DEFAULT_TELEFONE_COMERCIAL)))
            .andExpect(jsonPath("$.[*].email").value(hasItem(DEFAULT_EMAIL)))
            .andExpect(jsonPath("$.[*].observacoes").value(hasItem(DEFAULT_OBSERVACOES)));
    }

    @Test
    @Transactional
    void getPessoa() throws Exception {
        // Initialize the database
        pessoaRepository.saveAndFlush(pessoa);

        // Get the pessoa
        restPessoaMockMvc
            .perform(get(ENTITY_API_URL_ID, pessoa.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(pessoa.getId().intValue()))
            .andExpect(jsonPath("$.nome").value(DEFAULT_NOME))
            .andExpect(jsonPath("$.cpf").value(DEFAULT_CPF))
            .andExpect(jsonPath("$.rg").value(DEFAULT_RG))
            .andExpect(jsonPath("$.endereco").value(DEFAULT_ENDERECO))
            .andExpect(jsonPath("$.complemento").value(DEFAULT_COMPLEMENTO))
            .andExpect(jsonPath("$.bairro").value(DEFAULT_BAIRRO))
            .andExpect(jsonPath("$.cidade").value(DEFAULT_CIDADE))
            .andExpect(jsonPath("$.cep").value(DEFAULT_CEP))
            .andExpect(jsonPath("$.telefoneCelular").value(DEFAULT_TELEFONE_CELULAR))
            .andExpect(jsonPath("$.telefoneResidencial").value(DEFAULT_TELEFONE_RESIDENCIAL))
            .andExpect(jsonPath("$.telefoneComercial").value(DEFAULT_TELEFONE_COMERCIAL))
            .andExpect(jsonPath("$.email").value(DEFAULT_EMAIL))
            .andExpect(jsonPath("$.observacoes").value(DEFAULT_OBSERVACOES));
    }

    @Test
    @Transactional
    void getNonExistingPessoa() throws Exception {
        // Get the pessoa
        restPessoaMockMvc.perform(get(ENTITY_API_URL_ID, Long.MAX_VALUE)).andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    void putNewPessoa() throws Exception {
        // Initialize the database
        pessoaRepository.saveAndFlush(pessoa);

        int databaseSizeBeforeUpdate = pessoaRepository.findAll().size();

        // Update the pessoa
        Pessoa updatedPessoa = pessoaRepository.findById(pessoa.getId()).get();
        // Disconnect from session so that the updates on updatedPessoa are not directly saved in db
        em.detach(updatedPessoa);
        updatedPessoa
            .nome(UPDATED_NOME)
            .cpf(UPDATED_CPF)
            .rg(UPDATED_RG)
            .endereco(UPDATED_ENDERECO)
            .complemento(UPDATED_COMPLEMENTO)
            .bairro(UPDATED_BAIRRO)
            .cidade(UPDATED_CIDADE)
            .cep(UPDATED_CEP)
            .telefoneCelular(UPDATED_TELEFONE_CELULAR)
            .telefoneResidencial(UPDATED_TELEFONE_RESIDENCIAL)
            .telefoneComercial(UPDATED_TELEFONE_COMERCIAL)
            .email(UPDATED_EMAIL)
            .observacoes(UPDATED_OBSERVACOES);

        restPessoaMockMvc
            .perform(
                put(ENTITY_API_URL_ID, updatedPessoa.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(updatedPessoa))
            )
            .andExpect(status().isOk());

        // Validate the Pessoa in the database
        List<Pessoa> pessoaList = pessoaRepository.findAll();
        assertThat(pessoaList).hasSize(databaseSizeBeforeUpdate);
        Pessoa testPessoa = pessoaList.get(pessoaList.size() - 1);
        assertThat(testPessoa.getNome()).isEqualTo(UPDATED_NOME);
        assertThat(testPessoa.getCpf()).isEqualTo(UPDATED_CPF);
        assertThat(testPessoa.getRg()).isEqualTo(UPDATED_RG);
        assertThat(testPessoa.getEndereco()).isEqualTo(UPDATED_ENDERECO);
        assertThat(testPessoa.getComplemento()).isEqualTo(UPDATED_COMPLEMENTO);
        assertThat(testPessoa.getBairro()).isEqualTo(UPDATED_BAIRRO);
        assertThat(testPessoa.getCidade()).isEqualTo(UPDATED_CIDADE);
        assertThat(testPessoa.getCep()).isEqualTo(UPDATED_CEP);
        assertThat(testPessoa.getTelefoneCelular()).isEqualTo(UPDATED_TELEFONE_CELULAR);
        assertThat(testPessoa.getTelefoneResidencial()).isEqualTo(UPDATED_TELEFONE_RESIDENCIAL);
        assertThat(testPessoa.getTelefoneComercial()).isEqualTo(UPDATED_TELEFONE_COMERCIAL);
        assertThat(testPessoa.getEmail()).isEqualTo(UPDATED_EMAIL);
        assertThat(testPessoa.getObservacoes()).isEqualTo(UPDATED_OBSERVACOES);
    }

    @Test
    @Transactional
    void putNonExistingPessoa() throws Exception {
        int databaseSizeBeforeUpdate = pessoaRepository.findAll().size();
        pessoa.setId(count.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restPessoaMockMvc
            .perform(
                put(ENTITY_API_URL_ID, pessoa.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(pessoa))
            )
            .andExpect(status().isBadRequest());

        // Validate the Pessoa in the database
        List<Pessoa> pessoaList = pessoaRepository.findAll();
        assertThat(pessoaList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithIdMismatchPessoa() throws Exception {
        int databaseSizeBeforeUpdate = pessoaRepository.findAll().size();
        pessoa.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restPessoaMockMvc
            .perform(
                put(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(pessoa))
            )
            .andExpect(status().isBadRequest());

        // Validate the Pessoa in the database
        List<Pessoa> pessoaList = pessoaRepository.findAll();
        assertThat(pessoaList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithMissingIdPathParamPessoa() throws Exception {
        int databaseSizeBeforeUpdate = pessoaRepository.findAll().size();
        pessoa.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restPessoaMockMvc
            .perform(put(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(pessoa)))
            .andExpect(status().isMethodNotAllowed());

        // Validate the Pessoa in the database
        List<Pessoa> pessoaList = pessoaRepository.findAll();
        assertThat(pessoaList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void partialUpdatePessoaWithPatch() throws Exception {
        // Initialize the database
        pessoaRepository.saveAndFlush(pessoa);

        int databaseSizeBeforeUpdate = pessoaRepository.findAll().size();

        // Update the pessoa using partial update
        Pessoa partialUpdatedPessoa = new Pessoa();
        partialUpdatedPessoa.setId(pessoa.getId());

        partialUpdatedPessoa
            .nome(UPDATED_NOME)
            .endereco(UPDATED_ENDERECO)
            .telefoneResidencial(UPDATED_TELEFONE_RESIDENCIAL)
            .telefoneComercial(UPDATED_TELEFONE_COMERCIAL)
            .email(UPDATED_EMAIL)
            .observacoes(UPDATED_OBSERVACOES);

        restPessoaMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedPessoa.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedPessoa))
            )
            .andExpect(status().isOk());

        // Validate the Pessoa in the database
        List<Pessoa> pessoaList = pessoaRepository.findAll();
        assertThat(pessoaList).hasSize(databaseSizeBeforeUpdate);
        Pessoa testPessoa = pessoaList.get(pessoaList.size() - 1);
        assertThat(testPessoa.getNome()).isEqualTo(UPDATED_NOME);
        assertThat(testPessoa.getCpf()).isEqualTo(DEFAULT_CPF);
        assertThat(testPessoa.getRg()).isEqualTo(DEFAULT_RG);
        assertThat(testPessoa.getEndereco()).isEqualTo(UPDATED_ENDERECO);
        assertThat(testPessoa.getComplemento()).isEqualTo(DEFAULT_COMPLEMENTO);
        assertThat(testPessoa.getBairro()).isEqualTo(DEFAULT_BAIRRO);
        assertThat(testPessoa.getCidade()).isEqualTo(DEFAULT_CIDADE);
        assertThat(testPessoa.getCep()).isEqualTo(DEFAULT_CEP);
        assertThat(testPessoa.getTelefoneCelular()).isEqualTo(DEFAULT_TELEFONE_CELULAR);
        assertThat(testPessoa.getTelefoneResidencial()).isEqualTo(UPDATED_TELEFONE_RESIDENCIAL);
        assertThat(testPessoa.getTelefoneComercial()).isEqualTo(UPDATED_TELEFONE_COMERCIAL);
        assertThat(testPessoa.getEmail()).isEqualTo(UPDATED_EMAIL);
        assertThat(testPessoa.getObservacoes()).isEqualTo(UPDATED_OBSERVACOES);
    }

    @Test
    @Transactional
    void fullUpdatePessoaWithPatch() throws Exception {
        // Initialize the database
        pessoaRepository.saveAndFlush(pessoa);

        int databaseSizeBeforeUpdate = pessoaRepository.findAll().size();

        // Update the pessoa using partial update
        Pessoa partialUpdatedPessoa = new Pessoa();
        partialUpdatedPessoa.setId(pessoa.getId());

        partialUpdatedPessoa
            .nome(UPDATED_NOME)
            .cpf(UPDATED_CPF)
            .rg(UPDATED_RG)
            .endereco(UPDATED_ENDERECO)
            .complemento(UPDATED_COMPLEMENTO)
            .bairro(UPDATED_BAIRRO)
            .cidade(UPDATED_CIDADE)
            .cep(UPDATED_CEP)
            .telefoneCelular(UPDATED_TELEFONE_CELULAR)
            .telefoneResidencial(UPDATED_TELEFONE_RESIDENCIAL)
            .telefoneComercial(UPDATED_TELEFONE_COMERCIAL)
            .email(UPDATED_EMAIL)
            .observacoes(UPDATED_OBSERVACOES);

        restPessoaMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedPessoa.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedPessoa))
            )
            .andExpect(status().isOk());

        // Validate the Pessoa in the database
        List<Pessoa> pessoaList = pessoaRepository.findAll();
        assertThat(pessoaList).hasSize(databaseSizeBeforeUpdate);
        Pessoa testPessoa = pessoaList.get(pessoaList.size() - 1);
        assertThat(testPessoa.getNome()).isEqualTo(UPDATED_NOME);
        assertThat(testPessoa.getCpf()).isEqualTo(UPDATED_CPF);
        assertThat(testPessoa.getRg()).isEqualTo(UPDATED_RG);
        assertThat(testPessoa.getEndereco()).isEqualTo(UPDATED_ENDERECO);
        assertThat(testPessoa.getComplemento()).isEqualTo(UPDATED_COMPLEMENTO);
        assertThat(testPessoa.getBairro()).isEqualTo(UPDATED_BAIRRO);
        assertThat(testPessoa.getCidade()).isEqualTo(UPDATED_CIDADE);
        assertThat(testPessoa.getCep()).isEqualTo(UPDATED_CEP);
        assertThat(testPessoa.getTelefoneCelular()).isEqualTo(UPDATED_TELEFONE_CELULAR);
        assertThat(testPessoa.getTelefoneResidencial()).isEqualTo(UPDATED_TELEFONE_RESIDENCIAL);
        assertThat(testPessoa.getTelefoneComercial()).isEqualTo(UPDATED_TELEFONE_COMERCIAL);
        assertThat(testPessoa.getEmail()).isEqualTo(UPDATED_EMAIL);
        assertThat(testPessoa.getObservacoes()).isEqualTo(UPDATED_OBSERVACOES);
    }

    @Test
    @Transactional
    void patchNonExistingPessoa() throws Exception {
        int databaseSizeBeforeUpdate = pessoaRepository.findAll().size();
        pessoa.setId(count.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restPessoaMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, pessoa.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(pessoa))
            )
            .andExpect(status().isBadRequest());

        // Validate the Pessoa in the database
        List<Pessoa> pessoaList = pessoaRepository.findAll();
        assertThat(pessoaList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithIdMismatchPessoa() throws Exception {
        int databaseSizeBeforeUpdate = pessoaRepository.findAll().size();
        pessoa.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restPessoaMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(pessoa))
            )
            .andExpect(status().isBadRequest());

        // Validate the Pessoa in the database
        List<Pessoa> pessoaList = pessoaRepository.findAll();
        assertThat(pessoaList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithMissingIdPathParamPessoa() throws Exception {
        int databaseSizeBeforeUpdate = pessoaRepository.findAll().size();
        pessoa.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restPessoaMockMvc
            .perform(patch(ENTITY_API_URL).contentType("application/merge-patch+json").content(TestUtil.convertObjectToJsonBytes(pessoa)))
            .andExpect(status().isMethodNotAllowed());

        // Validate the Pessoa in the database
        List<Pessoa> pessoaList = pessoaRepository.findAll();
        assertThat(pessoaList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void deletePessoa() throws Exception {
        // Initialize the database
        pessoaRepository.saveAndFlush(pessoa);

        int databaseSizeBeforeDelete = pessoaRepository.findAll().size();

        // Delete the pessoa
        restPessoaMockMvc
            .perform(delete(ENTITY_API_URL_ID, pessoa.getId()).accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Pessoa> pessoaList = pessoaRepository.findAll();
        assertThat(pessoaList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
