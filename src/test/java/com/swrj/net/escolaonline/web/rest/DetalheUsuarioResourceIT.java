package com.swrj.net.escolaonline.web.rest;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import com.swrj.net.escolaonline.IntegrationTest;
import com.swrj.net.escolaonline.domain.DetalheUsuario;
import com.swrj.net.escolaonline.repository.DetalheUsuarioRepository;
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
 * Integration tests for the {@link DetalheUsuarioResource} REST controller.
 */
@IntegrationTest
@AutoConfigureMockMvc
@WithMockUser
class DetalheUsuarioResourceIT {

    private static final String DEFAULT_CPF = "AAAAAAAAAA";
    private static final String UPDATED_CPF = "BBBBBBBBBB";

    private static final String DEFAULT_CELULAR = "AAAAAAAAAA";
    private static final String UPDATED_CELULAR = "BBBBBBBBBB";

    private static final String ENTITY_API_URL = "/api/detalhe-usuarios";
    private static final String ENTITY_API_URL_ID = ENTITY_API_URL + "/{id}";

    private static Random random = new Random();
    private static AtomicLong count = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));

    @Autowired
    private DetalheUsuarioRepository detalheUsuarioRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restDetalheUsuarioMockMvc;

    private DetalheUsuario detalheUsuario;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static DetalheUsuario createEntity(EntityManager em) {
        DetalheUsuario detalheUsuario = new DetalheUsuario().cpf(DEFAULT_CPF).celular(DEFAULT_CELULAR);
        return detalheUsuario;
    }

    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static DetalheUsuario createUpdatedEntity(EntityManager em) {
        DetalheUsuario detalheUsuario = new DetalheUsuario().cpf(UPDATED_CPF).celular(UPDATED_CELULAR);
        return detalheUsuario;
    }

    @BeforeEach
    public void initTest() {
        detalheUsuario = createEntity(em);
    }

    @Test
    @Transactional
    void createDetalheUsuario() throws Exception {
        int databaseSizeBeforeCreate = detalheUsuarioRepository.findAll().size();
        // Create the DetalheUsuario
        restDetalheUsuarioMockMvc
            .perform(
                post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(detalheUsuario))
            )
            .andExpect(status().isCreated());

        // Validate the DetalheUsuario in the database
        List<DetalheUsuario> detalheUsuarioList = detalheUsuarioRepository.findAll();
        assertThat(detalheUsuarioList).hasSize(databaseSizeBeforeCreate + 1);
        DetalheUsuario testDetalheUsuario = detalheUsuarioList.get(detalheUsuarioList.size() - 1);
        assertThat(testDetalheUsuario.getCpf()).isEqualTo(DEFAULT_CPF);
        assertThat(testDetalheUsuario.getCelular()).isEqualTo(DEFAULT_CELULAR);
    }

    @Test
    @Transactional
    void createDetalheUsuarioWithExistingId() throws Exception {
        // Create the DetalheUsuario with an existing ID
        detalheUsuario.setId(1L);

        int databaseSizeBeforeCreate = detalheUsuarioRepository.findAll().size();

        // An entity with an existing ID cannot be created, so this API call must fail
        restDetalheUsuarioMockMvc
            .perform(
                post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(detalheUsuario))
            )
            .andExpect(status().isBadRequest());

        // Validate the DetalheUsuario in the database
        List<DetalheUsuario> detalheUsuarioList = detalheUsuarioRepository.findAll();
        assertThat(detalheUsuarioList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    void getAllDetalheUsuarios() throws Exception {
        // Initialize the database
        detalheUsuarioRepository.saveAndFlush(detalheUsuario);

        // Get all the detalheUsuarioList
        restDetalheUsuarioMockMvc
            .perform(get(ENTITY_API_URL + "?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(detalheUsuario.getId().intValue())))
            .andExpect(jsonPath("$.[*].cpf").value(hasItem(DEFAULT_CPF)))
            .andExpect(jsonPath("$.[*].celular").value(hasItem(DEFAULT_CELULAR)));
    }

    @Test
    @Transactional
    void getDetalheUsuario() throws Exception {
        // Initialize the database
        detalheUsuarioRepository.saveAndFlush(detalheUsuario);

        // Get the detalheUsuario
        restDetalheUsuarioMockMvc
            .perform(get(ENTITY_API_URL_ID, detalheUsuario.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(detalheUsuario.getId().intValue()))
            .andExpect(jsonPath("$.cpf").value(DEFAULT_CPF))
            .andExpect(jsonPath("$.celular").value(DEFAULT_CELULAR));
    }

    @Test
    @Transactional
    void getNonExistingDetalheUsuario() throws Exception {
        // Get the detalheUsuario
        restDetalheUsuarioMockMvc.perform(get(ENTITY_API_URL_ID, Long.MAX_VALUE)).andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    void putNewDetalheUsuario() throws Exception {
        // Initialize the database
        detalheUsuarioRepository.saveAndFlush(detalheUsuario);

        int databaseSizeBeforeUpdate = detalheUsuarioRepository.findAll().size();

        // Update the detalheUsuario
        DetalheUsuario updatedDetalheUsuario = detalheUsuarioRepository.findById(detalheUsuario.getId()).get();
        // Disconnect from session so that the updates on updatedDetalheUsuario are not directly saved in db
        em.detach(updatedDetalheUsuario);
        updatedDetalheUsuario.cpf(UPDATED_CPF).celular(UPDATED_CELULAR);

        restDetalheUsuarioMockMvc
            .perform(
                put(ENTITY_API_URL_ID, updatedDetalheUsuario.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(updatedDetalheUsuario))
            )
            .andExpect(status().isOk());

        // Validate the DetalheUsuario in the database
        List<DetalheUsuario> detalheUsuarioList = detalheUsuarioRepository.findAll();
        assertThat(detalheUsuarioList).hasSize(databaseSizeBeforeUpdate);
        DetalheUsuario testDetalheUsuario = detalheUsuarioList.get(detalheUsuarioList.size() - 1);
        assertThat(testDetalheUsuario.getCpf()).isEqualTo(UPDATED_CPF);
        assertThat(testDetalheUsuario.getCelular()).isEqualTo(UPDATED_CELULAR);
    }

    @Test
    @Transactional
    void putNonExistingDetalheUsuario() throws Exception {
        int databaseSizeBeforeUpdate = detalheUsuarioRepository.findAll().size();
        detalheUsuario.setId(count.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restDetalheUsuarioMockMvc
            .perform(
                put(ENTITY_API_URL_ID, detalheUsuario.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(detalheUsuario))
            )
            .andExpect(status().isBadRequest());

        // Validate the DetalheUsuario in the database
        List<DetalheUsuario> detalheUsuarioList = detalheUsuarioRepository.findAll();
        assertThat(detalheUsuarioList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithIdMismatchDetalheUsuario() throws Exception {
        int databaseSizeBeforeUpdate = detalheUsuarioRepository.findAll().size();
        detalheUsuario.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restDetalheUsuarioMockMvc
            .perform(
                put(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(detalheUsuario))
            )
            .andExpect(status().isBadRequest());

        // Validate the DetalheUsuario in the database
        List<DetalheUsuario> detalheUsuarioList = detalheUsuarioRepository.findAll();
        assertThat(detalheUsuarioList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithMissingIdPathParamDetalheUsuario() throws Exception {
        int databaseSizeBeforeUpdate = detalheUsuarioRepository.findAll().size();
        detalheUsuario.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restDetalheUsuarioMockMvc
            .perform(put(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(detalheUsuario)))
            .andExpect(status().isMethodNotAllowed());

        // Validate the DetalheUsuario in the database
        List<DetalheUsuario> detalheUsuarioList = detalheUsuarioRepository.findAll();
        assertThat(detalheUsuarioList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void partialUpdateDetalheUsuarioWithPatch() throws Exception {
        // Initialize the database
        detalheUsuarioRepository.saveAndFlush(detalheUsuario);

        int databaseSizeBeforeUpdate = detalheUsuarioRepository.findAll().size();

        // Update the detalheUsuario using partial update
        DetalheUsuario partialUpdatedDetalheUsuario = new DetalheUsuario();
        partialUpdatedDetalheUsuario.setId(detalheUsuario.getId());

        restDetalheUsuarioMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedDetalheUsuario.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedDetalheUsuario))
            )
            .andExpect(status().isOk());

        // Validate the DetalheUsuario in the database
        List<DetalheUsuario> detalheUsuarioList = detalheUsuarioRepository.findAll();
        assertThat(detalheUsuarioList).hasSize(databaseSizeBeforeUpdate);
        DetalheUsuario testDetalheUsuario = detalheUsuarioList.get(detalheUsuarioList.size() - 1);
        assertThat(testDetalheUsuario.getCpf()).isEqualTo(DEFAULT_CPF);
        assertThat(testDetalheUsuario.getCelular()).isEqualTo(DEFAULT_CELULAR);
    }

    @Test
    @Transactional
    void fullUpdateDetalheUsuarioWithPatch() throws Exception {
        // Initialize the database
        detalheUsuarioRepository.saveAndFlush(detalheUsuario);

        int databaseSizeBeforeUpdate = detalheUsuarioRepository.findAll().size();

        // Update the detalheUsuario using partial update
        DetalheUsuario partialUpdatedDetalheUsuario = new DetalheUsuario();
        partialUpdatedDetalheUsuario.setId(detalheUsuario.getId());

        partialUpdatedDetalheUsuario.cpf(UPDATED_CPF).celular(UPDATED_CELULAR);

        restDetalheUsuarioMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedDetalheUsuario.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedDetalheUsuario))
            )
            .andExpect(status().isOk());

        // Validate the DetalheUsuario in the database
        List<DetalheUsuario> detalheUsuarioList = detalheUsuarioRepository.findAll();
        assertThat(detalheUsuarioList).hasSize(databaseSizeBeforeUpdate);
        DetalheUsuario testDetalheUsuario = detalheUsuarioList.get(detalheUsuarioList.size() - 1);
        assertThat(testDetalheUsuario.getCpf()).isEqualTo(UPDATED_CPF);
        assertThat(testDetalheUsuario.getCelular()).isEqualTo(UPDATED_CELULAR);
    }

    @Test
    @Transactional
    void patchNonExistingDetalheUsuario() throws Exception {
        int databaseSizeBeforeUpdate = detalheUsuarioRepository.findAll().size();
        detalheUsuario.setId(count.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restDetalheUsuarioMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, detalheUsuario.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(detalheUsuario))
            )
            .andExpect(status().isBadRequest());

        // Validate the DetalheUsuario in the database
        List<DetalheUsuario> detalheUsuarioList = detalheUsuarioRepository.findAll();
        assertThat(detalheUsuarioList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithIdMismatchDetalheUsuario() throws Exception {
        int databaseSizeBeforeUpdate = detalheUsuarioRepository.findAll().size();
        detalheUsuario.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restDetalheUsuarioMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(detalheUsuario))
            )
            .andExpect(status().isBadRequest());

        // Validate the DetalheUsuario in the database
        List<DetalheUsuario> detalheUsuarioList = detalheUsuarioRepository.findAll();
        assertThat(detalheUsuarioList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithMissingIdPathParamDetalheUsuario() throws Exception {
        int databaseSizeBeforeUpdate = detalheUsuarioRepository.findAll().size();
        detalheUsuario.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restDetalheUsuarioMockMvc
            .perform(
                patch(ENTITY_API_URL).contentType("application/merge-patch+json").content(TestUtil.convertObjectToJsonBytes(detalheUsuario))
            )
            .andExpect(status().isMethodNotAllowed());

        // Validate the DetalheUsuario in the database
        List<DetalheUsuario> detalheUsuarioList = detalheUsuarioRepository.findAll();
        assertThat(detalheUsuarioList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void deleteDetalheUsuario() throws Exception {
        // Initialize the database
        detalheUsuarioRepository.saveAndFlush(detalheUsuario);

        int databaseSizeBeforeDelete = detalheUsuarioRepository.findAll().size();

        // Delete the detalheUsuario
        restDetalheUsuarioMockMvc
            .perform(delete(ENTITY_API_URL_ID, detalheUsuario.getId()).accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<DetalheUsuario> detalheUsuarioList = detalheUsuarioRepository.findAll();
        assertThat(detalheUsuarioList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
