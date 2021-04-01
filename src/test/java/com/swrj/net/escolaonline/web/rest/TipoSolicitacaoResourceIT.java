package com.swrj.net.escolaonline.web.rest;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import com.swrj.net.escolaonline.EscolaOnlineApp;
import com.swrj.net.escolaonline.domain.TipoSolicitacao;
import com.swrj.net.escolaonline.repository.TipoSolicitacaoRepository;
import com.swrj.net.escolaonline.service.TipoSolicitacaoService;
import java.math.BigDecimal;
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
 * Integration tests for the {@link TipoSolicitacaoResource} REST controller.
 */
@SpringBootTest(classes = EscolaOnlineApp.class)
@AutoConfigureMockMvc
@WithMockUser
public class TipoSolicitacaoResourceIT {
    private static final String DEFAULT_NOME = "AAAAAAAAAA";
    private static final String UPDATED_NOME = "BBBBBBBBBB";

    private static final Integer DEFAULT_PRAZO_ATENDIMENTO = 1;
    private static final Integer UPDATED_PRAZO_ATENDIMENTO = 2;

    private static final BigDecimal DEFAULT_VALOR_EMISSAO = new BigDecimal(1);
    private static final BigDecimal UPDATED_VALOR_EMISSAO = new BigDecimal(2);

    @Autowired
    private TipoSolicitacaoRepository tipoSolicitacaoRepository;

    @Autowired
    private TipoSolicitacaoService tipoSolicitacaoService;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restTipoSolicitacaoMockMvc;

    private TipoSolicitacao tipoSolicitacao;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static TipoSolicitacao createEntity(EntityManager em) {
        TipoSolicitacao tipoSolicitacao = new TipoSolicitacao()
            .nome(DEFAULT_NOME)
            .prazoAtendimento(DEFAULT_PRAZO_ATENDIMENTO)
            .valorEmissao(DEFAULT_VALOR_EMISSAO);
        return tipoSolicitacao;
    }

    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static TipoSolicitacao createUpdatedEntity(EntityManager em) {
        TipoSolicitacao tipoSolicitacao = new TipoSolicitacao()
            .nome(UPDATED_NOME)
            .prazoAtendimento(UPDATED_PRAZO_ATENDIMENTO)
            .valorEmissao(UPDATED_VALOR_EMISSAO);
        return tipoSolicitacao;
    }

    @BeforeEach
    public void initTest() {
        tipoSolicitacao = createEntity(em);
    }

    @Test
    @Transactional
    public void createTipoSolicitacao() throws Exception {
        int databaseSizeBeforeCreate = tipoSolicitacaoRepository.findAll().size();
        // Create the TipoSolicitacao
        restTipoSolicitacaoMockMvc
            .perform(
                post("/api/tipo-solicitacaos")
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(tipoSolicitacao))
            )
            .andExpect(status().isCreated());

        // Validate the TipoSolicitacao in the database
        List<TipoSolicitacao> tipoSolicitacaoList = tipoSolicitacaoRepository.findAll();
        assertThat(tipoSolicitacaoList).hasSize(databaseSizeBeforeCreate + 1);
        TipoSolicitacao testTipoSolicitacao = tipoSolicitacaoList.get(tipoSolicitacaoList.size() - 1);
        assertThat(testTipoSolicitacao.getNome()).isEqualTo(DEFAULT_NOME);
        assertThat(testTipoSolicitacao.getPrazoAtendimento()).isEqualTo(DEFAULT_PRAZO_ATENDIMENTO);
        assertThat(testTipoSolicitacao.getValorEmissao()).isEqualTo(DEFAULT_VALOR_EMISSAO);
    }

    @Test
    @Transactional
    public void createTipoSolicitacaoWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = tipoSolicitacaoRepository.findAll().size();

        // Create the TipoSolicitacao with an existing ID
        tipoSolicitacao.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restTipoSolicitacaoMockMvc
            .perform(
                post("/api/tipo-solicitacaos")
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(tipoSolicitacao))
            )
            .andExpect(status().isBadRequest());

        // Validate the TipoSolicitacao in the database
        List<TipoSolicitacao> tipoSolicitacaoList = tipoSolicitacaoRepository.findAll();
        assertThat(tipoSolicitacaoList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllTipoSolicitacaos() throws Exception {
        // Initialize the database
        tipoSolicitacaoRepository.saveAndFlush(tipoSolicitacao);

        // Get all the tipoSolicitacaoList
        restTipoSolicitacaoMockMvc
            .perform(get("/api/tipo-solicitacaos?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(tipoSolicitacao.getId().intValue())))
            .andExpect(jsonPath("$.[*].nome").value(hasItem(DEFAULT_NOME)))
            .andExpect(jsonPath("$.[*].prazoAtendimento").value(hasItem(DEFAULT_PRAZO_ATENDIMENTO)))
            .andExpect(jsonPath("$.[*].valorEmissao").value(hasItem(DEFAULT_VALOR_EMISSAO.intValue())));
    }

    @Test
    @Transactional
    public void getTipoSolicitacao() throws Exception {
        // Initialize the database
        tipoSolicitacaoRepository.saveAndFlush(tipoSolicitacao);

        // Get the tipoSolicitacao
        restTipoSolicitacaoMockMvc
            .perform(get("/api/tipo-solicitacaos/{id}", tipoSolicitacao.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(tipoSolicitacao.getId().intValue()))
            .andExpect(jsonPath("$.nome").value(DEFAULT_NOME))
            .andExpect(jsonPath("$.prazoAtendimento").value(DEFAULT_PRAZO_ATENDIMENTO))
            .andExpect(jsonPath("$.valorEmissao").value(DEFAULT_VALOR_EMISSAO.intValue()));
    }

    @Test
    @Transactional
    public void getNonExistingTipoSolicitacao() throws Exception {
        // Get the tipoSolicitacao
        restTipoSolicitacaoMockMvc.perform(get("/api/tipo-solicitacaos/{id}", Long.MAX_VALUE)).andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateTipoSolicitacao() throws Exception {
        // Initialize the database
        tipoSolicitacaoService.save(tipoSolicitacao);

        int databaseSizeBeforeUpdate = tipoSolicitacaoRepository.findAll().size();

        // Update the tipoSolicitacao
        TipoSolicitacao updatedTipoSolicitacao = tipoSolicitacaoRepository.findById(tipoSolicitacao.getId()).get();
        // Disconnect from session so that the updates on updatedTipoSolicitacao are not directly saved in db
        em.detach(updatedTipoSolicitacao);
        updatedTipoSolicitacao.nome(UPDATED_NOME).prazoAtendimento(UPDATED_PRAZO_ATENDIMENTO).valorEmissao(UPDATED_VALOR_EMISSAO);

        restTipoSolicitacaoMockMvc
            .perform(
                put("/api/tipo-solicitacaos")
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(updatedTipoSolicitacao))
            )
            .andExpect(status().isOk());

        // Validate the TipoSolicitacao in the database
        List<TipoSolicitacao> tipoSolicitacaoList = tipoSolicitacaoRepository.findAll();
        assertThat(tipoSolicitacaoList).hasSize(databaseSizeBeforeUpdate);
        TipoSolicitacao testTipoSolicitacao = tipoSolicitacaoList.get(tipoSolicitacaoList.size() - 1);
        assertThat(testTipoSolicitacao.getNome()).isEqualTo(UPDATED_NOME);
        assertThat(testTipoSolicitacao.getPrazoAtendimento()).isEqualTo(UPDATED_PRAZO_ATENDIMENTO);
        assertThat(testTipoSolicitacao.getValorEmissao()).isEqualTo(UPDATED_VALOR_EMISSAO);
    }

    @Test
    @Transactional
    public void updateNonExistingTipoSolicitacao() throws Exception {
        int databaseSizeBeforeUpdate = tipoSolicitacaoRepository.findAll().size();

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restTipoSolicitacaoMockMvc
            .perform(
                put("/api/tipo-solicitacaos")
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(tipoSolicitacao))
            )
            .andExpect(status().isBadRequest());

        // Validate the TipoSolicitacao in the database
        List<TipoSolicitacao> tipoSolicitacaoList = tipoSolicitacaoRepository.findAll();
        assertThat(tipoSolicitacaoList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteTipoSolicitacao() throws Exception {
        // Initialize the database
        tipoSolicitacaoService.save(tipoSolicitacao);

        int databaseSizeBeforeDelete = tipoSolicitacaoRepository.findAll().size();

        // Delete the tipoSolicitacao
        restTipoSolicitacaoMockMvc
            .perform(delete("/api/tipo-solicitacaos/{id}", tipoSolicitacao.getId()).accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<TipoSolicitacao> tipoSolicitacaoList = tipoSolicitacaoRepository.findAll();
        assertThat(tipoSolicitacaoList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
