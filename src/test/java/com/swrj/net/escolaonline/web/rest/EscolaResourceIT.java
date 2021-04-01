package com.swrj.net.escolaonline.web.rest;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import com.swrj.net.escolaonline.EscolaOnlineApp;
import com.swrj.net.escolaonline.domain.Escola;
import com.swrj.net.escolaonline.repository.EscolaRepository;
import com.swrj.net.escolaonline.service.EscolaService;
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
 * Integration tests for the {@link EscolaResource} REST controller.
 */
@SpringBootTest(classes = EscolaOnlineApp.class)
@AutoConfigureMockMvc
@WithMockUser
public class EscolaResourceIT {
    private static final String DEFAULT_NOME = "AAAAAAAAAA";
    private static final String UPDATED_NOME = "BBBBBBBBBB";

    private static final String DEFAULT_RAZAO_SOCIAL = "AAAAAAAAAA";
    private static final String UPDATED_RAZAO_SOCIAL = "BBBBBBBBBB";

    private static final String DEFAULT_CNPJ_PRINCIPAL = "AAAAAAAAAA";
    private static final String UPDATED_CNPJ_PRINCIPAL = "BBBBBBBBBB";

    private static final String DEFAULT_URL = "AAAAAAAAAA";
    private static final String UPDATED_URL = "BBBBBBBBBB";

    private static final String DEFAULT_PREFIXO = "AAAAAAAAAA";
    private static final String UPDATED_PREFIXO = "BBBBBBBBBB";

    private static final String DEFAULT_RESPONSAVEL_NOME = "AAAAAAAAAA";
    private static final String UPDATED_RESPONSAVEL_NOME = "BBBBBBBBBB";

    private static final String DEFAULT_RESPONSAVEL_CPF = "AAAAAAAAAA";
    private static final String UPDATED_RESPONSAVEL_CPF = "BBBBBBBBBB";

    private static final String DEFAULT_RESPONSAVEL_EMAIL = "AAAAAAAAAA";
    private static final String UPDATED_RESPONSAVEL_EMAIL = "BBBBBBBBBB";

    private static final String DEFAULT_RESPONSAVEL_CELULAR = "AAAAAAAAAA";
    private static final String UPDATED_RESPONSAVEL_CELULAR = "BBBBBBBBBB";

    @Autowired
    private EscolaRepository escolaRepository;

    @Autowired
    private EscolaService escolaService;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restEscolaMockMvc;

    private Escola escola;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Escola createEntity(EntityManager em) {
        Escola escola = new Escola()
            .nome(DEFAULT_NOME)
            .razaoSocial(DEFAULT_RAZAO_SOCIAL)
            .cnpjPrincipal(DEFAULT_CNPJ_PRINCIPAL)
            .url(DEFAULT_URL)
            .prefixo(DEFAULT_PREFIXO)
            .responsavelNome(DEFAULT_RESPONSAVEL_NOME)
            .responsavelCpf(DEFAULT_RESPONSAVEL_CPF)
            .responsavelEmail(DEFAULT_RESPONSAVEL_EMAIL)
            .responsavelCelular(DEFAULT_RESPONSAVEL_CELULAR);
        return escola;
    }

    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Escola createUpdatedEntity(EntityManager em) {
        Escola escola = new Escola()
            .nome(UPDATED_NOME)
            .razaoSocial(UPDATED_RAZAO_SOCIAL)
            .cnpjPrincipal(UPDATED_CNPJ_PRINCIPAL)
            .url(UPDATED_URL)
            .prefixo(UPDATED_PREFIXO)
            .responsavelNome(UPDATED_RESPONSAVEL_NOME)
            .responsavelCpf(UPDATED_RESPONSAVEL_CPF)
            .responsavelEmail(UPDATED_RESPONSAVEL_EMAIL)
            .responsavelCelular(UPDATED_RESPONSAVEL_CELULAR);
        return escola;
    }

    @BeforeEach
    public void initTest() {
        escola = createEntity(em);
    }

    @Test
    @Transactional
    public void createEscola() throws Exception {
        int databaseSizeBeforeCreate = escolaRepository.findAll().size();
        // Create the Escola
        restEscolaMockMvc
            .perform(post("/api/escolas").contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(escola)))
            .andExpect(status().isCreated());

        // Validate the Escola in the database
        List<Escola> escolaList = escolaRepository.findAll();
        assertThat(escolaList).hasSize(databaseSizeBeforeCreate + 1);
        Escola testEscola = escolaList.get(escolaList.size() - 1);
        assertThat(testEscola.getNome()).isEqualTo(DEFAULT_NOME);
        assertThat(testEscola.getRazaoSocial()).isEqualTo(DEFAULT_RAZAO_SOCIAL);
        assertThat(testEscola.getCnpjPrincipal()).isEqualTo(DEFAULT_CNPJ_PRINCIPAL);
        assertThat(testEscola.getUrl()).isEqualTo(DEFAULT_URL);
        assertThat(testEscola.getPrefixo()).isEqualTo(DEFAULT_PREFIXO);
        assertThat(testEscola.getResponsavelNome()).isEqualTo(DEFAULT_RESPONSAVEL_NOME);
        assertThat(testEscola.getResponsavelCpf()).isEqualTo(DEFAULT_RESPONSAVEL_CPF);
        assertThat(testEscola.getResponsavelEmail()).isEqualTo(DEFAULT_RESPONSAVEL_EMAIL);
        assertThat(testEscola.getResponsavelCelular()).isEqualTo(DEFAULT_RESPONSAVEL_CELULAR);
    }

    @Test
    @Transactional
    public void createEscolaWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = escolaRepository.findAll().size();

        // Create the Escola with an existing ID
        escola.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restEscolaMockMvc
            .perform(post("/api/escolas").contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(escola)))
            .andExpect(status().isBadRequest());

        // Validate the Escola in the database
        List<Escola> escolaList = escolaRepository.findAll();
        assertThat(escolaList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllEscolas() throws Exception {
        // Initialize the database
        escolaRepository.saveAndFlush(escola);

        // Get all the escolaList
        restEscolaMockMvc
            .perform(get("/api/escolas?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(escola.getId().intValue())))
            .andExpect(jsonPath("$.[*].nome").value(hasItem(DEFAULT_NOME)))
            .andExpect(jsonPath("$.[*].razaoSocial").value(hasItem(DEFAULT_RAZAO_SOCIAL)))
            .andExpect(jsonPath("$.[*].cnpjPrincipal").value(hasItem(DEFAULT_CNPJ_PRINCIPAL)))
            .andExpect(jsonPath("$.[*].url").value(hasItem(DEFAULT_URL)))
            .andExpect(jsonPath("$.[*].prefixo").value(hasItem(DEFAULT_PREFIXO)))
            .andExpect(jsonPath("$.[*].responsavelNome").value(hasItem(DEFAULT_RESPONSAVEL_NOME)))
            .andExpect(jsonPath("$.[*].responsavelCpf").value(hasItem(DEFAULT_RESPONSAVEL_CPF)))
            .andExpect(jsonPath("$.[*].responsavelEmail").value(hasItem(DEFAULT_RESPONSAVEL_EMAIL)))
            .andExpect(jsonPath("$.[*].responsavelCelular").value(hasItem(DEFAULT_RESPONSAVEL_CELULAR)));
    }

    @Test
    @Transactional
    public void getEscola() throws Exception {
        // Initialize the database
        escolaRepository.saveAndFlush(escola);

        // Get the escola
        restEscolaMockMvc
            .perform(get("/api/escolas/{id}", escola.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(escola.getId().intValue()))
            .andExpect(jsonPath("$.nome").value(DEFAULT_NOME))
            .andExpect(jsonPath("$.razaoSocial").value(DEFAULT_RAZAO_SOCIAL))
            .andExpect(jsonPath("$.cnpjPrincipal").value(DEFAULT_CNPJ_PRINCIPAL))
            .andExpect(jsonPath("$.url").value(DEFAULT_URL))
            .andExpect(jsonPath("$.prefixo").value(DEFAULT_PREFIXO))
            .andExpect(jsonPath("$.responsavelNome").value(DEFAULT_RESPONSAVEL_NOME))
            .andExpect(jsonPath("$.responsavelCpf").value(DEFAULT_RESPONSAVEL_CPF))
            .andExpect(jsonPath("$.responsavelEmail").value(DEFAULT_RESPONSAVEL_EMAIL))
            .andExpect(jsonPath("$.responsavelCelular").value(DEFAULT_RESPONSAVEL_CELULAR));
    }

    @Test
    @Transactional
    public void getNonExistingEscola() throws Exception {
        // Get the escola
        restEscolaMockMvc.perform(get("/api/escolas/{id}", Long.MAX_VALUE)).andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateEscola() throws Exception {
        // Initialize the database
        escolaService.save(escola);

        int databaseSizeBeforeUpdate = escolaRepository.findAll().size();

        // Update the escola
        Escola updatedEscola = escolaRepository.findById(escola.getId()).get();
        // Disconnect from session so that the updates on updatedEscola are not directly saved in db
        em.detach(updatedEscola);
        updatedEscola
            .nome(UPDATED_NOME)
            .razaoSocial(UPDATED_RAZAO_SOCIAL)
            .cnpjPrincipal(UPDATED_CNPJ_PRINCIPAL)
            .url(UPDATED_URL)
            .prefixo(UPDATED_PREFIXO)
            .responsavelNome(UPDATED_RESPONSAVEL_NOME)
            .responsavelCpf(UPDATED_RESPONSAVEL_CPF)
            .responsavelEmail(UPDATED_RESPONSAVEL_EMAIL)
            .responsavelCelular(UPDATED_RESPONSAVEL_CELULAR);

        restEscolaMockMvc
            .perform(put("/api/escolas").contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(updatedEscola)))
            .andExpect(status().isOk());

        // Validate the Escola in the database
        List<Escola> escolaList = escolaRepository.findAll();
        assertThat(escolaList).hasSize(databaseSizeBeforeUpdate);
        Escola testEscola = escolaList.get(escolaList.size() - 1);
        assertThat(testEscola.getNome()).isEqualTo(UPDATED_NOME);
        assertThat(testEscola.getRazaoSocial()).isEqualTo(UPDATED_RAZAO_SOCIAL);
        assertThat(testEscola.getCnpjPrincipal()).isEqualTo(UPDATED_CNPJ_PRINCIPAL);
        assertThat(testEscola.getUrl()).isEqualTo(UPDATED_URL);
        assertThat(testEscola.getPrefixo()).isEqualTo(UPDATED_PREFIXO);
        assertThat(testEscola.getResponsavelNome()).isEqualTo(UPDATED_RESPONSAVEL_NOME);
        assertThat(testEscola.getResponsavelCpf()).isEqualTo(UPDATED_RESPONSAVEL_CPF);
        assertThat(testEscola.getResponsavelEmail()).isEqualTo(UPDATED_RESPONSAVEL_EMAIL);
        assertThat(testEscola.getResponsavelCelular()).isEqualTo(UPDATED_RESPONSAVEL_CELULAR);
    }

    @Test
    @Transactional
    public void updateNonExistingEscola() throws Exception {
        int databaseSizeBeforeUpdate = escolaRepository.findAll().size();

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restEscolaMockMvc
            .perform(put("/api/escolas").contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(escola)))
            .andExpect(status().isBadRequest());

        // Validate the Escola in the database
        List<Escola> escolaList = escolaRepository.findAll();
        assertThat(escolaList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteEscola() throws Exception {
        // Initialize the database
        escolaService.save(escola);

        int databaseSizeBeforeDelete = escolaRepository.findAll().size();

        // Delete the escola
        restEscolaMockMvc
            .perform(delete("/api/escolas/{id}", escola.getId()).accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Escola> escolaList = escolaRepository.findAll();
        assertThat(escolaList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
