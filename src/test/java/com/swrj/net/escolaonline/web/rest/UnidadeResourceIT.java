package com.swrj.net.escolaonline.web.rest;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import com.swrj.net.escolaonline.EscolaOnlineApp;
import com.swrj.net.escolaonline.domain.Unidade;
import com.swrj.net.escolaonline.repository.UnidadeRepository;
import com.swrj.net.escolaonline.service.UnidadeService;
import java.util.List;
import javax.persistence.EntityManager;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.transaction.annotation.Transactional;

/**
 * Integration tests for the {@link UnidadeResource} REST controller.
 */
@SpringBootTest(classes = EscolaOnlineApp.class)
@AutoConfigureMockMvc
@WithMockUser
public class UnidadeResourceIT {
    private static final String DEFAULT_NOME = "AAAAAAAAAA";
    private static final String UPDATED_NOME = "BBBBBBBBBB";

    private static final String DEFAULT_CNPJ = "AAAAAAAAAA";
    private static final String UPDATED_CNPJ = "BBBBBBBBBB";

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

    private static final String DEFAULT_TELEFONE_COMERCIAL = "AAAAAAAAAA";
    private static final String UPDATED_TELEFONE_COMERCIAL = "BBBBBBBBBB";

    private static final String DEFAULT_TELEFONE_WHATSAPP = "AAAAAAAAAA";
    private static final String UPDATED_TELEFONE_WHATSAPP = "BBBBBBBBBB";

    private static final String DEFAULT_EMAIL = "AAAAAAAAAA";
    private static final String UPDATED_EMAIL = "BBBBBBBBBB";

    private static final String DEFAULT_FACEBOOK = "AAAAAAAAAA";
    private static final String UPDATED_FACEBOOK = "BBBBBBBBBB";

    private static final String DEFAULT_OBSERVACOES = "AAAAAAAAAA";
    private static final String UPDATED_OBSERVACOES = "BBBBBBBBBB";

    @Autowired
    private UnidadeRepository unidadeRepository;

    @Autowired
    private UnidadeService unidadeService;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restUnidadeMockMvc;

    private Unidade unidade;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Unidade createEntity(EntityManager em) {
        Unidade unidade = new Unidade()
            .nome(DEFAULT_NOME)
            .cnpj(DEFAULT_CNPJ)
            .endereco(DEFAULT_ENDERECO)
            .complemento(DEFAULT_COMPLEMENTO)
            .bairro(DEFAULT_BAIRRO)
            .cidade(DEFAULT_CIDADE)
            .cep(DEFAULT_CEP)
            .telefoneComercial(DEFAULT_TELEFONE_COMERCIAL)
            .telefoneWhatsapp(DEFAULT_TELEFONE_WHATSAPP)
            .email(DEFAULT_EMAIL)
            .facebook(DEFAULT_FACEBOOK)
            .observacoes(DEFAULT_OBSERVACOES);
        return unidade;
    }

    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Unidade createUpdatedEntity(EntityManager em) {
        Unidade unidade = new Unidade()
            .nome(UPDATED_NOME)
            .cnpj(UPDATED_CNPJ)
            .endereco(UPDATED_ENDERECO)
            .complemento(UPDATED_COMPLEMENTO)
            .bairro(UPDATED_BAIRRO)
            .cidade(UPDATED_CIDADE)
            .cep(UPDATED_CEP)
            .telefoneComercial(UPDATED_TELEFONE_COMERCIAL)
            .telefoneWhatsapp(UPDATED_TELEFONE_WHATSAPP)
            .email(UPDATED_EMAIL)
            .facebook(UPDATED_FACEBOOK)
            .observacoes(UPDATED_OBSERVACOES);
        return unidade;
    }

    @BeforeEach
    public void initTest() {
        unidade = createEntity(em);
    }

    @Test
    @Transactional
    public void createUnidade() throws Exception {
        int databaseSizeBeforeCreate = unidadeRepository.findAll().size();
        // Create the Unidade
        restUnidadeMockMvc
            .perform(post("/api/unidades").contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(unidade)))
            .andExpect(status().isCreated());

        // Validate the Unidade in the database
        List<Unidade> unidadeList = unidadeRepository.findAll();
        assertThat(unidadeList).hasSize(databaseSizeBeforeCreate + 1);
        Unidade testUnidade = unidadeList.get(unidadeList.size() - 1);
        assertThat(testUnidade.getNome()).isEqualTo(DEFAULT_NOME);
        assertThat(testUnidade.getCnpj()).isEqualTo(DEFAULT_CNPJ);
        assertThat(testUnidade.getEndereco()).isEqualTo(DEFAULT_ENDERECO);
        assertThat(testUnidade.getComplemento()).isEqualTo(DEFAULT_COMPLEMENTO);
        assertThat(testUnidade.getBairro()).isEqualTo(DEFAULT_BAIRRO);
        assertThat(testUnidade.getCidade()).isEqualTo(DEFAULT_CIDADE);
        assertThat(testUnidade.getCep()).isEqualTo(DEFAULT_CEP);
        assertThat(testUnidade.getTelefoneComercial()).isEqualTo(DEFAULT_TELEFONE_COMERCIAL);
        assertThat(testUnidade.getTelefoneWhatsapp()).isEqualTo(DEFAULT_TELEFONE_WHATSAPP);
        assertThat(testUnidade.getEmail()).isEqualTo(DEFAULT_EMAIL);
        assertThat(testUnidade.getFacebook()).isEqualTo(DEFAULT_FACEBOOK);
        assertThat(testUnidade.getObservacoes()).isEqualTo(DEFAULT_OBSERVACOES);
    }

    @Test
    @Transactional
    public void createUnidadeWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = unidadeRepository.findAll().size();

        // Create the Unidade with an existing ID
        unidade.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restUnidadeMockMvc
            .perform(post("/api/unidades").contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(unidade)))
            .andExpect(status().isBadRequest());

        // Validate the Unidade in the database
        List<Unidade> unidadeList = unidadeRepository.findAll();
        assertThat(unidadeList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllUnidades() throws Exception {
        // Initialize the database
        unidadeRepository.saveAndFlush(unidade);

        // Get all the unidadeList
        restUnidadeMockMvc
            .perform(get("/api/unidades?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(unidade.getId().intValue())))
            .andExpect(jsonPath("$.[*].nome").value(hasItem(DEFAULT_NOME)))
            .andExpect(jsonPath("$.[*].cnpj").value(hasItem(DEFAULT_CNPJ)))
            .andExpect(jsonPath("$.[*].endereco").value(hasItem(DEFAULT_ENDERECO)))
            .andExpect(jsonPath("$.[*].complemento").value(hasItem(DEFAULT_COMPLEMENTO)))
            .andExpect(jsonPath("$.[*].bairro").value(hasItem(DEFAULT_BAIRRO)))
            .andExpect(jsonPath("$.[*].cidade").value(hasItem(DEFAULT_CIDADE)))
            .andExpect(jsonPath("$.[*].cep").value(hasItem(DEFAULT_CEP)))
            .andExpect(jsonPath("$.[*].telefoneComercial").value(hasItem(DEFAULT_TELEFONE_COMERCIAL)))
            .andExpect(jsonPath("$.[*].telefoneWhatsapp").value(hasItem(DEFAULT_TELEFONE_WHATSAPP)))
            .andExpect(jsonPath("$.[*].email").value(hasItem(DEFAULT_EMAIL)))
            .andExpect(jsonPath("$.[*].facebook").value(hasItem(DEFAULT_FACEBOOK)))
            .andExpect(jsonPath("$.[*].observacoes").value(hasItem(DEFAULT_OBSERVACOES)));
    }

    @Test
    @Transactional
    public void getUnidade() throws Exception {
        // Initialize the database
        unidadeRepository.saveAndFlush(unidade);

        // Get the unidade
        restUnidadeMockMvc
            .perform(get("/api/unidades/{id}", unidade.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(unidade.getId().intValue()))
            .andExpect(jsonPath("$.nome").value(DEFAULT_NOME))
            .andExpect(jsonPath("$.cnpj").value(DEFAULT_CNPJ))
            .andExpect(jsonPath("$.endereco").value(DEFAULT_ENDERECO))
            .andExpect(jsonPath("$.complemento").value(DEFAULT_COMPLEMENTO))
            .andExpect(jsonPath("$.bairro").value(DEFAULT_BAIRRO))
            .andExpect(jsonPath("$.cidade").value(DEFAULT_CIDADE))
            .andExpect(jsonPath("$.cep").value(DEFAULT_CEP))
            .andExpect(jsonPath("$.telefoneComercial").value(DEFAULT_TELEFONE_COMERCIAL))
            .andExpect(jsonPath("$.telefoneWhatsapp").value(DEFAULT_TELEFONE_WHATSAPP))
            .andExpect(jsonPath("$.email").value(DEFAULT_EMAIL))
            .andExpect(jsonPath("$.facebook").value(DEFAULT_FACEBOOK))
            .andExpect(jsonPath("$.observacoes").value(DEFAULT_OBSERVACOES));
    }

    @Test
    @Transactional
    public void getNonExistingUnidade() throws Exception {
        // Get the unidade
        restUnidadeMockMvc.perform(get("/api/unidades/{id}", Long.MAX_VALUE)).andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateUnidade() throws Exception {
        // Initialize the database
        unidadeService.save(unidade);

        int databaseSizeBeforeUpdate = unidadeRepository.findAll().size();

        // Update the unidade
        Unidade updatedUnidade = unidadeRepository.findById(unidade.getId()).get();
        // Disconnect from session so that the updates on updatedUnidade are not directly saved in db
        em.detach(updatedUnidade);
        updatedUnidade
            .nome(UPDATED_NOME)
            .cnpj(UPDATED_CNPJ)
            .endereco(UPDATED_ENDERECO)
            .complemento(UPDATED_COMPLEMENTO)
            .bairro(UPDATED_BAIRRO)
            .cidade(UPDATED_CIDADE)
            .cep(UPDATED_CEP)
            .telefoneComercial(UPDATED_TELEFONE_COMERCIAL)
            .telefoneWhatsapp(UPDATED_TELEFONE_WHATSAPP)
            .email(UPDATED_EMAIL)
            .facebook(UPDATED_FACEBOOK)
            .observacoes(UPDATED_OBSERVACOES);

        restUnidadeMockMvc
            .perform(
                put("/api/unidades").contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(updatedUnidade))
            )
            .andExpect(status().isOk());

        // Validate the Unidade in the database
        List<Unidade> unidadeList = unidadeRepository.findAll();
        assertThat(unidadeList).hasSize(databaseSizeBeforeUpdate);
        Unidade testUnidade = unidadeList.get(unidadeList.size() - 1);
        assertThat(testUnidade.getNome()).isEqualTo(UPDATED_NOME);
        assertThat(testUnidade.getCnpj()).isEqualTo(UPDATED_CNPJ);
        assertThat(testUnidade.getEndereco()).isEqualTo(UPDATED_ENDERECO);
        assertThat(testUnidade.getComplemento()).isEqualTo(UPDATED_COMPLEMENTO);
        assertThat(testUnidade.getBairro()).isEqualTo(UPDATED_BAIRRO);
        assertThat(testUnidade.getCidade()).isEqualTo(UPDATED_CIDADE);
        assertThat(testUnidade.getCep()).isEqualTo(UPDATED_CEP);
        assertThat(testUnidade.getTelefoneComercial()).isEqualTo(UPDATED_TELEFONE_COMERCIAL);
        assertThat(testUnidade.getTelefoneWhatsapp()).isEqualTo(UPDATED_TELEFONE_WHATSAPP);
        assertThat(testUnidade.getEmail()).isEqualTo(UPDATED_EMAIL);
        assertThat(testUnidade.getFacebook()).isEqualTo(UPDATED_FACEBOOK);
        assertThat(testUnidade.getObservacoes()).isEqualTo(UPDATED_OBSERVACOES);
    }

    @Test
    @Transactional
    public void updateNonExistingUnidade() throws Exception {
        int databaseSizeBeforeUpdate = unidadeRepository.findAll().size();

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restUnidadeMockMvc
            .perform(put("/api/unidades").contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(unidade)))
            .andExpect(status().isBadRequest());

        // Validate the Unidade in the database
        List<Unidade> unidadeList = unidadeRepository.findAll();
        assertThat(unidadeList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteUnidade() throws Exception {
        // Initialize the database
        unidadeService.save(unidade);

        int databaseSizeBeforeDelete = unidadeRepository.findAll().size();

        // Delete the unidade
        restUnidadeMockMvc
            .perform(delete("/api/unidades/{id}", unidade.getId()).accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Unidade> unidadeList = unidadeRepository.findAll();
        assertThat(unidadeList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
