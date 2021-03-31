package com.swrj.net.escolaonline.web.rest;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import com.swrj.net.escolaonline.IntegrationTest;
import com.swrj.net.escolaonline.domain.Chamada;
import com.swrj.net.escolaonline.repository.ChamadaRepository;
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
 * Integration tests for the {@link ChamadaResource} REST controller.
 */
@IntegrationTest
@AutoConfigureMockMvc
@WithMockUser
class ChamadaResourceIT {

    private static final LocalDate DEFAULT_DATA_AULA = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_DATA_AULA = LocalDate.now(ZoneId.systemDefault());

    private static final String DEFAULT_OBSERVACOES = "AAAAAAAAAA";
    private static final String UPDATED_OBSERVACOES = "BBBBBBBBBB";

    private static final String ENTITY_API_URL = "/api/chamadas";
    private static final String ENTITY_API_URL_ID = ENTITY_API_URL + "/{id}";

    private static Random random = new Random();
    private static AtomicLong count = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));

    @Autowired
    private ChamadaRepository chamadaRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restChamadaMockMvc;

    private Chamada chamada;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Chamada createEntity(EntityManager em) {
        Chamada chamada = new Chamada().dataAula(DEFAULT_DATA_AULA).observacoes(DEFAULT_OBSERVACOES);
        return chamada;
    }

    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Chamada createUpdatedEntity(EntityManager em) {
        Chamada chamada = new Chamada().dataAula(UPDATED_DATA_AULA).observacoes(UPDATED_OBSERVACOES);
        return chamada;
    }

    @BeforeEach
    public void initTest() {
        chamada = createEntity(em);
    }

    @Test
    @Transactional
    void createChamada() throws Exception {
        int databaseSizeBeforeCreate = chamadaRepository.findAll().size();
        // Create the Chamada
        restChamadaMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(chamada)))
            .andExpect(status().isCreated());

        // Validate the Chamada in the database
        List<Chamada> chamadaList = chamadaRepository.findAll();
        assertThat(chamadaList).hasSize(databaseSizeBeforeCreate + 1);
        Chamada testChamada = chamadaList.get(chamadaList.size() - 1);
        assertThat(testChamada.getDataAula()).isEqualTo(DEFAULT_DATA_AULA);
        assertThat(testChamada.getObservacoes()).isEqualTo(DEFAULT_OBSERVACOES);
    }

    @Test
    @Transactional
    void createChamadaWithExistingId() throws Exception {
        // Create the Chamada with an existing ID
        chamada.setId(1L);

        int databaseSizeBeforeCreate = chamadaRepository.findAll().size();

        // An entity with an existing ID cannot be created, so this API call must fail
        restChamadaMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(chamada)))
            .andExpect(status().isBadRequest());

        // Validate the Chamada in the database
        List<Chamada> chamadaList = chamadaRepository.findAll();
        assertThat(chamadaList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    void getAllChamadas() throws Exception {
        // Initialize the database
        chamadaRepository.saveAndFlush(chamada);

        // Get all the chamadaList
        restChamadaMockMvc
            .perform(get(ENTITY_API_URL + "?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(chamada.getId().intValue())))
            .andExpect(jsonPath("$.[*].dataAula").value(hasItem(DEFAULT_DATA_AULA.toString())))
            .andExpect(jsonPath("$.[*].observacoes").value(hasItem(DEFAULT_OBSERVACOES)));
    }

    @Test
    @Transactional
    void getChamada() throws Exception {
        // Initialize the database
        chamadaRepository.saveAndFlush(chamada);

        // Get the chamada
        restChamadaMockMvc
            .perform(get(ENTITY_API_URL_ID, chamada.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(chamada.getId().intValue()))
            .andExpect(jsonPath("$.dataAula").value(DEFAULT_DATA_AULA.toString()))
            .andExpect(jsonPath("$.observacoes").value(DEFAULT_OBSERVACOES));
    }

    @Test
    @Transactional
    void getNonExistingChamada() throws Exception {
        // Get the chamada
        restChamadaMockMvc.perform(get(ENTITY_API_URL_ID, Long.MAX_VALUE)).andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    void putNewChamada() throws Exception {
        // Initialize the database
        chamadaRepository.saveAndFlush(chamada);

        int databaseSizeBeforeUpdate = chamadaRepository.findAll().size();

        // Update the chamada
        Chamada updatedChamada = chamadaRepository.findById(chamada.getId()).get();
        // Disconnect from session so that the updates on updatedChamada are not directly saved in db
        em.detach(updatedChamada);
        updatedChamada.dataAula(UPDATED_DATA_AULA).observacoes(UPDATED_OBSERVACOES);

        restChamadaMockMvc
            .perform(
                put(ENTITY_API_URL_ID, updatedChamada.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(updatedChamada))
            )
            .andExpect(status().isOk());

        // Validate the Chamada in the database
        List<Chamada> chamadaList = chamadaRepository.findAll();
        assertThat(chamadaList).hasSize(databaseSizeBeforeUpdate);
        Chamada testChamada = chamadaList.get(chamadaList.size() - 1);
        assertThat(testChamada.getDataAula()).isEqualTo(UPDATED_DATA_AULA);
        assertThat(testChamada.getObservacoes()).isEqualTo(UPDATED_OBSERVACOES);
    }

    @Test
    @Transactional
    void putNonExistingChamada() throws Exception {
        int databaseSizeBeforeUpdate = chamadaRepository.findAll().size();
        chamada.setId(count.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restChamadaMockMvc
            .perform(
                put(ENTITY_API_URL_ID, chamada.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(chamada))
            )
            .andExpect(status().isBadRequest());

        // Validate the Chamada in the database
        List<Chamada> chamadaList = chamadaRepository.findAll();
        assertThat(chamadaList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithIdMismatchChamada() throws Exception {
        int databaseSizeBeforeUpdate = chamadaRepository.findAll().size();
        chamada.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restChamadaMockMvc
            .perform(
                put(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(chamada))
            )
            .andExpect(status().isBadRequest());

        // Validate the Chamada in the database
        List<Chamada> chamadaList = chamadaRepository.findAll();
        assertThat(chamadaList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithMissingIdPathParamChamada() throws Exception {
        int databaseSizeBeforeUpdate = chamadaRepository.findAll().size();
        chamada.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restChamadaMockMvc
            .perform(put(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(chamada)))
            .andExpect(status().isMethodNotAllowed());

        // Validate the Chamada in the database
        List<Chamada> chamadaList = chamadaRepository.findAll();
        assertThat(chamadaList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void partialUpdateChamadaWithPatch() throws Exception {
        // Initialize the database
        chamadaRepository.saveAndFlush(chamada);

        int databaseSizeBeforeUpdate = chamadaRepository.findAll().size();

        // Update the chamada using partial update
        Chamada partialUpdatedChamada = new Chamada();
        partialUpdatedChamada.setId(chamada.getId());

        partialUpdatedChamada.observacoes(UPDATED_OBSERVACOES);

        restChamadaMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedChamada.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedChamada))
            )
            .andExpect(status().isOk());

        // Validate the Chamada in the database
        List<Chamada> chamadaList = chamadaRepository.findAll();
        assertThat(chamadaList).hasSize(databaseSizeBeforeUpdate);
        Chamada testChamada = chamadaList.get(chamadaList.size() - 1);
        assertThat(testChamada.getDataAula()).isEqualTo(DEFAULT_DATA_AULA);
        assertThat(testChamada.getObservacoes()).isEqualTo(UPDATED_OBSERVACOES);
    }

    @Test
    @Transactional
    void fullUpdateChamadaWithPatch() throws Exception {
        // Initialize the database
        chamadaRepository.saveAndFlush(chamada);

        int databaseSizeBeforeUpdate = chamadaRepository.findAll().size();

        // Update the chamada using partial update
        Chamada partialUpdatedChamada = new Chamada();
        partialUpdatedChamada.setId(chamada.getId());

        partialUpdatedChamada.dataAula(UPDATED_DATA_AULA).observacoes(UPDATED_OBSERVACOES);

        restChamadaMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedChamada.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedChamada))
            )
            .andExpect(status().isOk());

        // Validate the Chamada in the database
        List<Chamada> chamadaList = chamadaRepository.findAll();
        assertThat(chamadaList).hasSize(databaseSizeBeforeUpdate);
        Chamada testChamada = chamadaList.get(chamadaList.size() - 1);
        assertThat(testChamada.getDataAula()).isEqualTo(UPDATED_DATA_AULA);
        assertThat(testChamada.getObservacoes()).isEqualTo(UPDATED_OBSERVACOES);
    }

    @Test
    @Transactional
    void patchNonExistingChamada() throws Exception {
        int databaseSizeBeforeUpdate = chamadaRepository.findAll().size();
        chamada.setId(count.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restChamadaMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, chamada.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(chamada))
            )
            .andExpect(status().isBadRequest());

        // Validate the Chamada in the database
        List<Chamada> chamadaList = chamadaRepository.findAll();
        assertThat(chamadaList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithIdMismatchChamada() throws Exception {
        int databaseSizeBeforeUpdate = chamadaRepository.findAll().size();
        chamada.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restChamadaMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(chamada))
            )
            .andExpect(status().isBadRequest());

        // Validate the Chamada in the database
        List<Chamada> chamadaList = chamadaRepository.findAll();
        assertThat(chamadaList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithMissingIdPathParamChamada() throws Exception {
        int databaseSizeBeforeUpdate = chamadaRepository.findAll().size();
        chamada.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restChamadaMockMvc
            .perform(patch(ENTITY_API_URL).contentType("application/merge-patch+json").content(TestUtil.convertObjectToJsonBytes(chamada)))
            .andExpect(status().isMethodNotAllowed());

        // Validate the Chamada in the database
        List<Chamada> chamadaList = chamadaRepository.findAll();
        assertThat(chamadaList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void deleteChamada() throws Exception {
        // Initialize the database
        chamadaRepository.saveAndFlush(chamada);

        int databaseSizeBeforeDelete = chamadaRepository.findAll().size();

        // Delete the chamada
        restChamadaMockMvc
            .perform(delete(ENTITY_API_URL_ID, chamada.getId()).accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Chamada> chamadaList = chamadaRepository.findAll();
        assertThat(chamadaList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
