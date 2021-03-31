package com.swrj.net.escolaonline.web.rest;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import com.swrj.net.escolaonline.IntegrationTest;
import com.swrj.net.escolaonline.domain.Diretor;
import com.swrj.net.escolaonline.repository.DiretorRepository;
import java.time.LocalDate;
import java.time.ZoneId;
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
 * Integration tests for the {@link DiretorResource} REST controller.
 */
@IntegrationTest
@AutoConfigureMockMvc
@WithMockUser
class DiretorResourceIT {

    private static final Integer DEFAULT_ANO_LETIVO = 1;
    private static final Integer UPDATED_ANO_LETIVO = 2;

    private static final LocalDate DEFAULT_DATA_INICIO = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_DATA_INICIO = LocalDate.now(ZoneId.systemDefault());

    private static final LocalDate DEFAULT_DATA_FIM = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_DATA_FIM = LocalDate.now(ZoneId.systemDefault());

    private static final String ENTITY_API_URL = "/api/diretors";
    private static final String ENTITY_API_URL_ID = ENTITY_API_URL + "/{id}";

    private static Random random = new Random();
    private static AtomicLong count = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));

    @Autowired
    private DiretorRepository diretorRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restDiretorMockMvc;

    private Diretor diretor;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Diretor createEntity(EntityManager em) {
        Diretor diretor = new Diretor().anoLetivo(DEFAULT_ANO_LETIVO).dataInicio(DEFAULT_DATA_INICIO).dataFim(DEFAULT_DATA_FIM);
        return diretor;
    }

    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Diretor createUpdatedEntity(EntityManager em) {
        Diretor diretor = new Diretor().anoLetivo(UPDATED_ANO_LETIVO).dataInicio(UPDATED_DATA_INICIO).dataFim(UPDATED_DATA_FIM);
        return diretor;
    }

    @BeforeEach
    public void initTest() {
        diretor = createEntity(em);
    }

    @Test
    @Transactional
    void createDiretor() throws Exception {
        int databaseSizeBeforeCreate = diretorRepository.findAll().size();
        // Create the Diretor
        restDiretorMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(diretor)))
            .andExpect(status().isCreated());

        // Validate the Diretor in the database
        List<Diretor> diretorList = diretorRepository.findAll();
        assertThat(diretorList).hasSize(databaseSizeBeforeCreate + 1);
        Diretor testDiretor = diretorList.get(diretorList.size() - 1);
        assertThat(testDiretor.getAnoLetivo()).isEqualTo(DEFAULT_ANO_LETIVO);
        assertThat(testDiretor.getDataInicio()).isEqualTo(DEFAULT_DATA_INICIO);
        assertThat(testDiretor.getDataFim()).isEqualTo(DEFAULT_DATA_FIM);
    }

    @Test
    @Transactional
    void createDiretorWithExistingId() throws Exception {
        // Create the Diretor with an existing ID
        diretor.setId(1L);

        int databaseSizeBeforeCreate = diretorRepository.findAll().size();

        // An entity with an existing ID cannot be created, so this API call must fail
        restDiretorMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(diretor)))
            .andExpect(status().isBadRequest());

        // Validate the Diretor in the database
        List<Diretor> diretorList = diretorRepository.findAll();
        assertThat(diretorList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    void getAllDiretors() throws Exception {
        // Initialize the database
        diretorRepository.saveAndFlush(diretor);

        // Get all the diretorList
        restDiretorMockMvc
            .perform(get(ENTITY_API_URL + "?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(diretor.getId().intValue())))
            .andExpect(jsonPath("$.[*].anoLetivo").value(hasItem(DEFAULT_ANO_LETIVO)))
            .andExpect(jsonPath("$.[*].dataInicio").value(hasItem(DEFAULT_DATA_INICIO.toString())))
            .andExpect(jsonPath("$.[*].dataFim").value(hasItem(DEFAULT_DATA_FIM.toString())));
    }

    @Test
    @Transactional
    void getDiretor() throws Exception {
        // Initialize the database
        diretorRepository.saveAndFlush(diretor);

        // Get the diretor
        restDiretorMockMvc
            .perform(get(ENTITY_API_URL_ID, diretor.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(diretor.getId().intValue()))
            .andExpect(jsonPath("$.anoLetivo").value(DEFAULT_ANO_LETIVO))
            .andExpect(jsonPath("$.dataInicio").value(DEFAULT_DATA_INICIO.toString()))
            .andExpect(jsonPath("$.dataFim").value(DEFAULT_DATA_FIM.toString()));
    }

    @Test
    @Transactional
    void getNonExistingDiretor() throws Exception {
        // Get the diretor
        restDiretorMockMvc.perform(get(ENTITY_API_URL_ID, Long.MAX_VALUE)).andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    void putNewDiretor() throws Exception {
        // Initialize the database
        diretorRepository.saveAndFlush(diretor);

        int databaseSizeBeforeUpdate = diretorRepository.findAll().size();

        // Update the diretor
        Diretor updatedDiretor = diretorRepository.findById(diretor.getId()).get();
        // Disconnect from session so that the updates on updatedDiretor are not directly saved in db
        em.detach(updatedDiretor);
        updatedDiretor.anoLetivo(UPDATED_ANO_LETIVO).dataInicio(UPDATED_DATA_INICIO).dataFim(UPDATED_DATA_FIM);

        restDiretorMockMvc
            .perform(
                put(ENTITY_API_URL_ID, updatedDiretor.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(updatedDiretor))
            )
            .andExpect(status().isOk());

        // Validate the Diretor in the database
        List<Diretor> diretorList = diretorRepository.findAll();
        assertThat(diretorList).hasSize(databaseSizeBeforeUpdate);
        Diretor testDiretor = diretorList.get(diretorList.size() - 1);
        assertThat(testDiretor.getAnoLetivo()).isEqualTo(UPDATED_ANO_LETIVO);
        assertThat(testDiretor.getDataInicio()).isEqualTo(UPDATED_DATA_INICIO);
        assertThat(testDiretor.getDataFim()).isEqualTo(UPDATED_DATA_FIM);
    }

    @Test
    @Transactional
    void putNonExistingDiretor() throws Exception {
        int databaseSizeBeforeUpdate = diretorRepository.findAll().size();
        diretor.setId(count.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restDiretorMockMvc
            .perform(
                put(ENTITY_API_URL_ID, diretor.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(diretor))
            )
            .andExpect(status().isBadRequest());

        // Validate the Diretor in the database
        List<Diretor> diretorList = diretorRepository.findAll();
        assertThat(diretorList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithIdMismatchDiretor() throws Exception {
        int databaseSizeBeforeUpdate = diretorRepository.findAll().size();
        diretor.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restDiretorMockMvc
            .perform(
                put(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(diretor))
            )
            .andExpect(status().isBadRequest());

        // Validate the Diretor in the database
        List<Diretor> diretorList = diretorRepository.findAll();
        assertThat(diretorList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithMissingIdPathParamDiretor() throws Exception {
        int databaseSizeBeforeUpdate = diretorRepository.findAll().size();
        diretor.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restDiretorMockMvc
            .perform(put(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(diretor)))
            .andExpect(status().isMethodNotAllowed());

        // Validate the Diretor in the database
        List<Diretor> diretorList = diretorRepository.findAll();
        assertThat(diretorList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void partialUpdateDiretorWithPatch() throws Exception {
        // Initialize the database
        diretorRepository.saveAndFlush(diretor);

        int databaseSizeBeforeUpdate = diretorRepository.findAll().size();

        // Update the diretor using partial update
        Diretor partialUpdatedDiretor = new Diretor();
        partialUpdatedDiretor.setId(diretor.getId());

        partialUpdatedDiretor.dataInicio(UPDATED_DATA_INICIO).dataFim(UPDATED_DATA_FIM);

        restDiretorMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedDiretor.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedDiretor))
            )
            .andExpect(status().isOk());

        // Validate the Diretor in the database
        List<Diretor> diretorList = diretorRepository.findAll();
        assertThat(diretorList).hasSize(databaseSizeBeforeUpdate);
        Diretor testDiretor = diretorList.get(diretorList.size() - 1);
        assertThat(testDiretor.getAnoLetivo()).isEqualTo(DEFAULT_ANO_LETIVO);
        assertThat(testDiretor.getDataInicio()).isEqualTo(UPDATED_DATA_INICIO);
        assertThat(testDiretor.getDataFim()).isEqualTo(UPDATED_DATA_FIM);
    }

    @Test
    @Transactional
    void fullUpdateDiretorWithPatch() throws Exception {
        // Initialize the database
        diretorRepository.saveAndFlush(diretor);

        int databaseSizeBeforeUpdate = diretorRepository.findAll().size();

        // Update the diretor using partial update
        Diretor partialUpdatedDiretor = new Diretor();
        partialUpdatedDiretor.setId(diretor.getId());

        partialUpdatedDiretor.anoLetivo(UPDATED_ANO_LETIVO).dataInicio(UPDATED_DATA_INICIO).dataFim(UPDATED_DATA_FIM);

        restDiretorMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedDiretor.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedDiretor))
            )
            .andExpect(status().isOk());

        // Validate the Diretor in the database
        List<Diretor> diretorList = diretorRepository.findAll();
        assertThat(diretorList).hasSize(databaseSizeBeforeUpdate);
        Diretor testDiretor = diretorList.get(diretorList.size() - 1);
        assertThat(testDiretor.getAnoLetivo()).isEqualTo(UPDATED_ANO_LETIVO);
        assertThat(testDiretor.getDataInicio()).isEqualTo(UPDATED_DATA_INICIO);
        assertThat(testDiretor.getDataFim()).isEqualTo(UPDATED_DATA_FIM);
    }

    @Test
    @Transactional
    void patchNonExistingDiretor() throws Exception {
        int databaseSizeBeforeUpdate = diretorRepository.findAll().size();
        diretor.setId(count.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restDiretorMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, diretor.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(diretor))
            )
            .andExpect(status().isBadRequest());

        // Validate the Diretor in the database
        List<Diretor> diretorList = diretorRepository.findAll();
        assertThat(diretorList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithIdMismatchDiretor() throws Exception {
        int databaseSizeBeforeUpdate = diretorRepository.findAll().size();
        diretor.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restDiretorMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(diretor))
            )
            .andExpect(status().isBadRequest());

        // Validate the Diretor in the database
        List<Diretor> diretorList = diretorRepository.findAll();
        assertThat(diretorList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithMissingIdPathParamDiretor() throws Exception {
        int databaseSizeBeforeUpdate = diretorRepository.findAll().size();
        diretor.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restDiretorMockMvc
            .perform(patch(ENTITY_API_URL).contentType("application/merge-patch+json").content(TestUtil.convertObjectToJsonBytes(diretor)))
            .andExpect(status().isMethodNotAllowed());

        // Validate the Diretor in the database
        List<Diretor> diretorList = diretorRepository.findAll();
        assertThat(diretorList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void deleteDiretor() throws Exception {
        // Initialize the database
        diretorRepository.saveAndFlush(diretor);

        int databaseSizeBeforeDelete = diretorRepository.findAll().size();

        // Delete the diretor
        restDiretorMockMvc
            .perform(delete(ENTITY_API_URL_ID, diretor.getId()).accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Diretor> diretorList = diretorRepository.findAll();
        assertThat(diretorList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
