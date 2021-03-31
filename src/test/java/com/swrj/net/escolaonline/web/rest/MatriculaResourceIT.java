package com.swrj.net.escolaonline.web.rest;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import com.swrj.net.escolaonline.IntegrationTest;
import com.swrj.net.escolaonline.domain.Matricula;
import com.swrj.net.escolaonline.repository.MatriculaRepository;
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
 * Integration tests for the {@link MatriculaResource} REST controller.
 */
@IntegrationTest
@AutoConfigureMockMvc
@WithMockUser
class MatriculaResourceIT {

    private static final Integer DEFAULT_ANO_LETIVO = 1;
    private static final Integer UPDATED_ANO_LETIVO = 2;

    private static final LocalDate DEFAULT_DATA_INICIO = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_DATA_INICIO = LocalDate.now(ZoneId.systemDefault());

    private static final LocalDate DEFAULT_DATA_FIM = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_DATA_FIM = LocalDate.now(ZoneId.systemDefault());

    private static final String ENTITY_API_URL = "/api/matriculas";
    private static final String ENTITY_API_URL_ID = ENTITY_API_URL + "/{id}";

    private static Random random = new Random();
    private static AtomicLong count = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));

    @Autowired
    private MatriculaRepository matriculaRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restMatriculaMockMvc;

    private Matricula matricula;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Matricula createEntity(EntityManager em) {
        Matricula matricula = new Matricula().anoLetivo(DEFAULT_ANO_LETIVO).dataInicio(DEFAULT_DATA_INICIO).dataFim(DEFAULT_DATA_FIM);
        return matricula;
    }

    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Matricula createUpdatedEntity(EntityManager em) {
        Matricula matricula = new Matricula().anoLetivo(UPDATED_ANO_LETIVO).dataInicio(UPDATED_DATA_INICIO).dataFim(UPDATED_DATA_FIM);
        return matricula;
    }

    @BeforeEach
    public void initTest() {
        matricula = createEntity(em);
    }

    @Test
    @Transactional
    void createMatricula() throws Exception {
        int databaseSizeBeforeCreate = matriculaRepository.findAll().size();
        // Create the Matricula
        restMatriculaMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(matricula)))
            .andExpect(status().isCreated());

        // Validate the Matricula in the database
        List<Matricula> matriculaList = matriculaRepository.findAll();
        assertThat(matriculaList).hasSize(databaseSizeBeforeCreate + 1);
        Matricula testMatricula = matriculaList.get(matriculaList.size() - 1);
        assertThat(testMatricula.getAnoLetivo()).isEqualTo(DEFAULT_ANO_LETIVO);
        assertThat(testMatricula.getDataInicio()).isEqualTo(DEFAULT_DATA_INICIO);
        assertThat(testMatricula.getDataFim()).isEqualTo(DEFAULT_DATA_FIM);
    }

    @Test
    @Transactional
    void createMatriculaWithExistingId() throws Exception {
        // Create the Matricula with an existing ID
        matricula.setId(1L);

        int databaseSizeBeforeCreate = matriculaRepository.findAll().size();

        // An entity with an existing ID cannot be created, so this API call must fail
        restMatriculaMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(matricula)))
            .andExpect(status().isBadRequest());

        // Validate the Matricula in the database
        List<Matricula> matriculaList = matriculaRepository.findAll();
        assertThat(matriculaList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    void getAllMatriculas() throws Exception {
        // Initialize the database
        matriculaRepository.saveAndFlush(matricula);

        // Get all the matriculaList
        restMatriculaMockMvc
            .perform(get(ENTITY_API_URL + "?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(matricula.getId().intValue())))
            .andExpect(jsonPath("$.[*].anoLetivo").value(hasItem(DEFAULT_ANO_LETIVO)))
            .andExpect(jsonPath("$.[*].dataInicio").value(hasItem(DEFAULT_DATA_INICIO.toString())))
            .andExpect(jsonPath("$.[*].dataFim").value(hasItem(DEFAULT_DATA_FIM.toString())));
    }

    @Test
    @Transactional
    void getMatricula() throws Exception {
        // Initialize the database
        matriculaRepository.saveAndFlush(matricula);

        // Get the matricula
        restMatriculaMockMvc
            .perform(get(ENTITY_API_URL_ID, matricula.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(matricula.getId().intValue()))
            .andExpect(jsonPath("$.anoLetivo").value(DEFAULT_ANO_LETIVO))
            .andExpect(jsonPath("$.dataInicio").value(DEFAULT_DATA_INICIO.toString()))
            .andExpect(jsonPath("$.dataFim").value(DEFAULT_DATA_FIM.toString()));
    }

    @Test
    @Transactional
    void getNonExistingMatricula() throws Exception {
        // Get the matricula
        restMatriculaMockMvc.perform(get(ENTITY_API_URL_ID, Long.MAX_VALUE)).andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    void putNewMatricula() throws Exception {
        // Initialize the database
        matriculaRepository.saveAndFlush(matricula);

        int databaseSizeBeforeUpdate = matriculaRepository.findAll().size();

        // Update the matricula
        Matricula updatedMatricula = matriculaRepository.findById(matricula.getId()).get();
        // Disconnect from session so that the updates on updatedMatricula are not directly saved in db
        em.detach(updatedMatricula);
        updatedMatricula.anoLetivo(UPDATED_ANO_LETIVO).dataInicio(UPDATED_DATA_INICIO).dataFim(UPDATED_DATA_FIM);

        restMatriculaMockMvc
            .perform(
                put(ENTITY_API_URL_ID, updatedMatricula.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(updatedMatricula))
            )
            .andExpect(status().isOk());

        // Validate the Matricula in the database
        List<Matricula> matriculaList = matriculaRepository.findAll();
        assertThat(matriculaList).hasSize(databaseSizeBeforeUpdate);
        Matricula testMatricula = matriculaList.get(matriculaList.size() - 1);
        assertThat(testMatricula.getAnoLetivo()).isEqualTo(UPDATED_ANO_LETIVO);
        assertThat(testMatricula.getDataInicio()).isEqualTo(UPDATED_DATA_INICIO);
        assertThat(testMatricula.getDataFim()).isEqualTo(UPDATED_DATA_FIM);
    }

    @Test
    @Transactional
    void putNonExistingMatricula() throws Exception {
        int databaseSizeBeforeUpdate = matriculaRepository.findAll().size();
        matricula.setId(count.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restMatriculaMockMvc
            .perform(
                put(ENTITY_API_URL_ID, matricula.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(matricula))
            )
            .andExpect(status().isBadRequest());

        // Validate the Matricula in the database
        List<Matricula> matriculaList = matriculaRepository.findAll();
        assertThat(matriculaList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithIdMismatchMatricula() throws Exception {
        int databaseSizeBeforeUpdate = matriculaRepository.findAll().size();
        matricula.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restMatriculaMockMvc
            .perform(
                put(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(matricula))
            )
            .andExpect(status().isBadRequest());

        // Validate the Matricula in the database
        List<Matricula> matriculaList = matriculaRepository.findAll();
        assertThat(matriculaList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithMissingIdPathParamMatricula() throws Exception {
        int databaseSizeBeforeUpdate = matriculaRepository.findAll().size();
        matricula.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restMatriculaMockMvc
            .perform(put(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(matricula)))
            .andExpect(status().isMethodNotAllowed());

        // Validate the Matricula in the database
        List<Matricula> matriculaList = matriculaRepository.findAll();
        assertThat(matriculaList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void partialUpdateMatriculaWithPatch() throws Exception {
        // Initialize the database
        matriculaRepository.saveAndFlush(matricula);

        int databaseSizeBeforeUpdate = matriculaRepository.findAll().size();

        // Update the matricula using partial update
        Matricula partialUpdatedMatricula = new Matricula();
        partialUpdatedMatricula.setId(matricula.getId());

        partialUpdatedMatricula.anoLetivo(UPDATED_ANO_LETIVO).dataFim(UPDATED_DATA_FIM);

        restMatriculaMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedMatricula.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedMatricula))
            )
            .andExpect(status().isOk());

        // Validate the Matricula in the database
        List<Matricula> matriculaList = matriculaRepository.findAll();
        assertThat(matriculaList).hasSize(databaseSizeBeforeUpdate);
        Matricula testMatricula = matriculaList.get(matriculaList.size() - 1);
        assertThat(testMatricula.getAnoLetivo()).isEqualTo(UPDATED_ANO_LETIVO);
        assertThat(testMatricula.getDataInicio()).isEqualTo(DEFAULT_DATA_INICIO);
        assertThat(testMatricula.getDataFim()).isEqualTo(UPDATED_DATA_FIM);
    }

    @Test
    @Transactional
    void fullUpdateMatriculaWithPatch() throws Exception {
        // Initialize the database
        matriculaRepository.saveAndFlush(matricula);

        int databaseSizeBeforeUpdate = matriculaRepository.findAll().size();

        // Update the matricula using partial update
        Matricula partialUpdatedMatricula = new Matricula();
        partialUpdatedMatricula.setId(matricula.getId());

        partialUpdatedMatricula.anoLetivo(UPDATED_ANO_LETIVO).dataInicio(UPDATED_DATA_INICIO).dataFim(UPDATED_DATA_FIM);

        restMatriculaMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedMatricula.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedMatricula))
            )
            .andExpect(status().isOk());

        // Validate the Matricula in the database
        List<Matricula> matriculaList = matriculaRepository.findAll();
        assertThat(matriculaList).hasSize(databaseSizeBeforeUpdate);
        Matricula testMatricula = matriculaList.get(matriculaList.size() - 1);
        assertThat(testMatricula.getAnoLetivo()).isEqualTo(UPDATED_ANO_LETIVO);
        assertThat(testMatricula.getDataInicio()).isEqualTo(UPDATED_DATA_INICIO);
        assertThat(testMatricula.getDataFim()).isEqualTo(UPDATED_DATA_FIM);
    }

    @Test
    @Transactional
    void patchNonExistingMatricula() throws Exception {
        int databaseSizeBeforeUpdate = matriculaRepository.findAll().size();
        matricula.setId(count.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restMatriculaMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, matricula.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(matricula))
            )
            .andExpect(status().isBadRequest());

        // Validate the Matricula in the database
        List<Matricula> matriculaList = matriculaRepository.findAll();
        assertThat(matriculaList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithIdMismatchMatricula() throws Exception {
        int databaseSizeBeforeUpdate = matriculaRepository.findAll().size();
        matricula.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restMatriculaMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(matricula))
            )
            .andExpect(status().isBadRequest());

        // Validate the Matricula in the database
        List<Matricula> matriculaList = matriculaRepository.findAll();
        assertThat(matriculaList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithMissingIdPathParamMatricula() throws Exception {
        int databaseSizeBeforeUpdate = matriculaRepository.findAll().size();
        matricula.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restMatriculaMockMvc
            .perform(
                patch(ENTITY_API_URL).contentType("application/merge-patch+json").content(TestUtil.convertObjectToJsonBytes(matricula))
            )
            .andExpect(status().isMethodNotAllowed());

        // Validate the Matricula in the database
        List<Matricula> matriculaList = matriculaRepository.findAll();
        assertThat(matriculaList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void deleteMatricula() throws Exception {
        // Initialize the database
        matriculaRepository.saveAndFlush(matricula);

        int databaseSizeBeforeDelete = matriculaRepository.findAll().size();

        // Delete the matricula
        restMatriculaMockMvc
            .perform(delete(ENTITY_API_URL_ID, matricula.getId()).accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Matricula> matriculaList = matriculaRepository.findAll();
        assertThat(matriculaList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
