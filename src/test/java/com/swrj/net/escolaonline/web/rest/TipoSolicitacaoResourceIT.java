package com.swrj.net.escolaonline.web.rest;

import static com.swrj.net.escolaonline.web.rest.TestUtil.sameNumber;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import com.swrj.net.escolaonline.IntegrationTest;
import com.swrj.net.escolaonline.domain.TipoSolicitacao;
import com.swrj.net.escolaonline.repository.TipoSolicitacaoRepository;
import java.math.BigDecimal;
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
 * Integration tests for the {@link TipoSolicitacaoResource} REST controller.
 */
@IntegrationTest
@AutoConfigureMockMvc
@WithMockUser
class TipoSolicitacaoResourceIT {

    private static final String DEFAULT_NOME = "AAAAAAAAAA";
    private static final String UPDATED_NOME = "BBBBBBBBBB";

    private static final Integer DEFAULT_PRAZO_ATENDIMENTO = 1;
    private static final Integer UPDATED_PRAZO_ATENDIMENTO = 2;

    private static final BigDecimal DEFAULT_VALOR_EMISSAO = new BigDecimal(1);
    private static final BigDecimal UPDATED_VALOR_EMISSAO = new BigDecimal(2);

    private static final String ENTITY_API_URL = "/api/tipo-solicitacaos";
    private static final String ENTITY_API_URL_ID = ENTITY_API_URL + "/{id}";

    private static Random random = new Random();
    private static AtomicLong count = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));

    @Autowired
    private TipoSolicitacaoRepository tipoSolicitacaoRepository;

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
    void createTipoSolicitacao() throws Exception {
        int databaseSizeBeforeCreate = tipoSolicitacaoRepository.findAll().size();
        // Create the TipoSolicitacao
        restTipoSolicitacaoMockMvc
            .perform(
                post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(tipoSolicitacao))
            )
            .andExpect(status().isCreated());

        // Validate the TipoSolicitacao in the database
        List<TipoSolicitacao> tipoSolicitacaoList = tipoSolicitacaoRepository.findAll();
        assertThat(tipoSolicitacaoList).hasSize(databaseSizeBeforeCreate + 1);
        TipoSolicitacao testTipoSolicitacao = tipoSolicitacaoList.get(tipoSolicitacaoList.size() - 1);
        assertThat(testTipoSolicitacao.getNome()).isEqualTo(DEFAULT_NOME);
        assertThat(testTipoSolicitacao.getPrazoAtendimento()).isEqualTo(DEFAULT_PRAZO_ATENDIMENTO);
        assertThat(testTipoSolicitacao.getValorEmissao()).isEqualByComparingTo(DEFAULT_VALOR_EMISSAO);
    }

    @Test
    @Transactional
    void createTipoSolicitacaoWithExistingId() throws Exception {
        // Create the TipoSolicitacao with an existing ID
        tipoSolicitacao.setId(1L);

        int databaseSizeBeforeCreate = tipoSolicitacaoRepository.findAll().size();

        // An entity with an existing ID cannot be created, so this API call must fail
        restTipoSolicitacaoMockMvc
            .perform(
                post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(tipoSolicitacao))
            )
            .andExpect(status().isBadRequest());

        // Validate the TipoSolicitacao in the database
        List<TipoSolicitacao> tipoSolicitacaoList = tipoSolicitacaoRepository.findAll();
        assertThat(tipoSolicitacaoList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    void getAllTipoSolicitacaos() throws Exception {
        // Initialize the database
        tipoSolicitacaoRepository.saveAndFlush(tipoSolicitacao);

        // Get all the tipoSolicitacaoList
        restTipoSolicitacaoMockMvc
            .perform(get(ENTITY_API_URL + "?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(tipoSolicitacao.getId().intValue())))
            .andExpect(jsonPath("$.[*].nome").value(hasItem(DEFAULT_NOME)))
            .andExpect(jsonPath("$.[*].prazoAtendimento").value(hasItem(DEFAULT_PRAZO_ATENDIMENTO)))
            .andExpect(jsonPath("$.[*].valorEmissao").value(hasItem(sameNumber(DEFAULT_VALOR_EMISSAO))));
    }

    @Test
    @Transactional
    void getTipoSolicitacao() throws Exception {
        // Initialize the database
        tipoSolicitacaoRepository.saveAndFlush(tipoSolicitacao);

        // Get the tipoSolicitacao
        restTipoSolicitacaoMockMvc
            .perform(get(ENTITY_API_URL_ID, tipoSolicitacao.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(tipoSolicitacao.getId().intValue()))
            .andExpect(jsonPath("$.nome").value(DEFAULT_NOME))
            .andExpect(jsonPath("$.prazoAtendimento").value(DEFAULT_PRAZO_ATENDIMENTO))
            .andExpect(jsonPath("$.valorEmissao").value(sameNumber(DEFAULT_VALOR_EMISSAO)));
    }

    @Test
    @Transactional
    void getNonExistingTipoSolicitacao() throws Exception {
        // Get the tipoSolicitacao
        restTipoSolicitacaoMockMvc.perform(get(ENTITY_API_URL_ID, Long.MAX_VALUE)).andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    void putNewTipoSolicitacao() throws Exception {
        // Initialize the database
        tipoSolicitacaoRepository.saveAndFlush(tipoSolicitacao);

        int databaseSizeBeforeUpdate = tipoSolicitacaoRepository.findAll().size();

        // Update the tipoSolicitacao
        TipoSolicitacao updatedTipoSolicitacao = tipoSolicitacaoRepository.findById(tipoSolicitacao.getId()).get();
        // Disconnect from session so that the updates on updatedTipoSolicitacao are not directly saved in db
        em.detach(updatedTipoSolicitacao);
        updatedTipoSolicitacao.nome(UPDATED_NOME).prazoAtendimento(UPDATED_PRAZO_ATENDIMENTO).valorEmissao(UPDATED_VALOR_EMISSAO);

        restTipoSolicitacaoMockMvc
            .perform(
                put(ENTITY_API_URL_ID, updatedTipoSolicitacao.getId())
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
    void putNonExistingTipoSolicitacao() throws Exception {
        int databaseSizeBeforeUpdate = tipoSolicitacaoRepository.findAll().size();
        tipoSolicitacao.setId(count.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restTipoSolicitacaoMockMvc
            .perform(
                put(ENTITY_API_URL_ID, tipoSolicitacao.getId())
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
    void putWithIdMismatchTipoSolicitacao() throws Exception {
        int databaseSizeBeforeUpdate = tipoSolicitacaoRepository.findAll().size();
        tipoSolicitacao.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restTipoSolicitacaoMockMvc
            .perform(
                put(ENTITY_API_URL_ID, count.incrementAndGet())
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
    void putWithMissingIdPathParamTipoSolicitacao() throws Exception {
        int databaseSizeBeforeUpdate = tipoSolicitacaoRepository.findAll().size();
        tipoSolicitacao.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restTipoSolicitacaoMockMvc
            .perform(
                put(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(tipoSolicitacao))
            )
            .andExpect(status().isMethodNotAllowed());

        // Validate the TipoSolicitacao in the database
        List<TipoSolicitacao> tipoSolicitacaoList = tipoSolicitacaoRepository.findAll();
        assertThat(tipoSolicitacaoList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void partialUpdateTipoSolicitacaoWithPatch() throws Exception {
        // Initialize the database
        tipoSolicitacaoRepository.saveAndFlush(tipoSolicitacao);

        int databaseSizeBeforeUpdate = tipoSolicitacaoRepository.findAll().size();

        // Update the tipoSolicitacao using partial update
        TipoSolicitacao partialUpdatedTipoSolicitacao = new TipoSolicitacao();
        partialUpdatedTipoSolicitacao.setId(tipoSolicitacao.getId());

        partialUpdatedTipoSolicitacao.valorEmissao(UPDATED_VALOR_EMISSAO);

        restTipoSolicitacaoMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedTipoSolicitacao.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedTipoSolicitacao))
            )
            .andExpect(status().isOk());

        // Validate the TipoSolicitacao in the database
        List<TipoSolicitacao> tipoSolicitacaoList = tipoSolicitacaoRepository.findAll();
        assertThat(tipoSolicitacaoList).hasSize(databaseSizeBeforeUpdate);
        TipoSolicitacao testTipoSolicitacao = tipoSolicitacaoList.get(tipoSolicitacaoList.size() - 1);
        assertThat(testTipoSolicitacao.getNome()).isEqualTo(DEFAULT_NOME);
        assertThat(testTipoSolicitacao.getPrazoAtendimento()).isEqualTo(DEFAULT_PRAZO_ATENDIMENTO);
        assertThat(testTipoSolicitacao.getValorEmissao()).isEqualByComparingTo(UPDATED_VALOR_EMISSAO);
    }

    @Test
    @Transactional
    void fullUpdateTipoSolicitacaoWithPatch() throws Exception {
        // Initialize the database
        tipoSolicitacaoRepository.saveAndFlush(tipoSolicitacao);

        int databaseSizeBeforeUpdate = tipoSolicitacaoRepository.findAll().size();

        // Update the tipoSolicitacao using partial update
        TipoSolicitacao partialUpdatedTipoSolicitacao = new TipoSolicitacao();
        partialUpdatedTipoSolicitacao.setId(tipoSolicitacao.getId());

        partialUpdatedTipoSolicitacao.nome(UPDATED_NOME).prazoAtendimento(UPDATED_PRAZO_ATENDIMENTO).valorEmissao(UPDATED_VALOR_EMISSAO);

        restTipoSolicitacaoMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedTipoSolicitacao.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedTipoSolicitacao))
            )
            .andExpect(status().isOk());

        // Validate the TipoSolicitacao in the database
        List<TipoSolicitacao> tipoSolicitacaoList = tipoSolicitacaoRepository.findAll();
        assertThat(tipoSolicitacaoList).hasSize(databaseSizeBeforeUpdate);
        TipoSolicitacao testTipoSolicitacao = tipoSolicitacaoList.get(tipoSolicitacaoList.size() - 1);
        assertThat(testTipoSolicitacao.getNome()).isEqualTo(UPDATED_NOME);
        assertThat(testTipoSolicitacao.getPrazoAtendimento()).isEqualTo(UPDATED_PRAZO_ATENDIMENTO);
        assertThat(testTipoSolicitacao.getValorEmissao()).isEqualByComparingTo(UPDATED_VALOR_EMISSAO);
    }

    @Test
    @Transactional
    void patchNonExistingTipoSolicitacao() throws Exception {
        int databaseSizeBeforeUpdate = tipoSolicitacaoRepository.findAll().size();
        tipoSolicitacao.setId(count.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restTipoSolicitacaoMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, tipoSolicitacao.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(tipoSolicitacao))
            )
            .andExpect(status().isBadRequest());

        // Validate the TipoSolicitacao in the database
        List<TipoSolicitacao> tipoSolicitacaoList = tipoSolicitacaoRepository.findAll();
        assertThat(tipoSolicitacaoList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithIdMismatchTipoSolicitacao() throws Exception {
        int databaseSizeBeforeUpdate = tipoSolicitacaoRepository.findAll().size();
        tipoSolicitacao.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restTipoSolicitacaoMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(tipoSolicitacao))
            )
            .andExpect(status().isBadRequest());

        // Validate the TipoSolicitacao in the database
        List<TipoSolicitacao> tipoSolicitacaoList = tipoSolicitacaoRepository.findAll();
        assertThat(tipoSolicitacaoList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithMissingIdPathParamTipoSolicitacao() throws Exception {
        int databaseSizeBeforeUpdate = tipoSolicitacaoRepository.findAll().size();
        tipoSolicitacao.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restTipoSolicitacaoMockMvc
            .perform(
                patch(ENTITY_API_URL)
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(tipoSolicitacao))
            )
            .andExpect(status().isMethodNotAllowed());

        // Validate the TipoSolicitacao in the database
        List<TipoSolicitacao> tipoSolicitacaoList = tipoSolicitacaoRepository.findAll();
        assertThat(tipoSolicitacaoList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void deleteTipoSolicitacao() throws Exception {
        // Initialize the database
        tipoSolicitacaoRepository.saveAndFlush(tipoSolicitacao);

        int databaseSizeBeforeDelete = tipoSolicitacaoRepository.findAll().size();

        // Delete the tipoSolicitacao
        restTipoSolicitacaoMockMvc
            .perform(delete(ENTITY_API_URL_ID, tipoSolicitacao.getId()).accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<TipoSolicitacao> tipoSolicitacaoList = tipoSolicitacaoRepository.findAll();
        assertThat(tipoSolicitacaoList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
