package com.swrj.net.escolaonline.web.rest;

import com.swrj.net.escolaonline.EscolaOnlineApp;
import com.swrj.net.escolaonline.domain.Unidade;
import com.swrj.net.escolaonline.repository.UnidadeRepository;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.transaction.annotation.Transactional;
import javax.persistence.EntityManager;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Integration tests for the {@link UnidadeResource} REST controller.
 */
@SpringBootTest(classes = EscolaOnlineApp.class)
@AutoConfigureMockMvc
@WithMockUser
public class UnidadeResourceIT {

    private static final String DEFAULT_NOME = "AAAAAAAAAA";
    private static final String UPDATED_NOME = "BBBBBBBBBB";

    @Autowired
    private UnidadeRepository unidadeRepository;

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
            .nome(DEFAULT_NOME);
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
            .nome(UPDATED_NOME);
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
        restUnidadeMockMvc.perform(post("/api/unidades")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(unidade)))
            .andExpect(status().isCreated());

        // Validate the Unidade in the database
        List<Unidade> unidadeList = unidadeRepository.findAll();
        assertThat(unidadeList).hasSize(databaseSizeBeforeCreate + 1);
        Unidade testUnidade = unidadeList.get(unidadeList.size() - 1);
        assertThat(testUnidade.getNome()).isEqualTo(DEFAULT_NOME);
    }

    @Test
    @Transactional
    public void createUnidadeWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = unidadeRepository.findAll().size();

        // Create the Unidade with an existing ID
        unidade.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restUnidadeMockMvc.perform(post("/api/unidades")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(unidade)))
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
        restUnidadeMockMvc.perform(get("/api/unidades?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(unidade.getId().intValue())))
            .andExpect(jsonPath("$.[*].nome").value(hasItem(DEFAULT_NOME)));
    }
    
    @Test
    @Transactional
    public void getUnidade() throws Exception {
        // Initialize the database
        unidadeRepository.saveAndFlush(unidade);

        // Get the unidade
        restUnidadeMockMvc.perform(get("/api/unidades/{id}", unidade.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(unidade.getId().intValue()))
            .andExpect(jsonPath("$.nome").value(DEFAULT_NOME));
    }
    @Test
    @Transactional
    public void getNonExistingUnidade() throws Exception {
        // Get the unidade
        restUnidadeMockMvc.perform(get("/api/unidades/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateUnidade() throws Exception {
        // Initialize the database
        unidadeRepository.saveAndFlush(unidade);

        int databaseSizeBeforeUpdate = unidadeRepository.findAll().size();

        // Update the unidade
        Unidade updatedUnidade = unidadeRepository.findById(unidade.getId()).get();
        // Disconnect from session so that the updates on updatedUnidade are not directly saved in db
        em.detach(updatedUnidade);
        updatedUnidade
            .nome(UPDATED_NOME);

        restUnidadeMockMvc.perform(put("/api/unidades")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(updatedUnidade)))
            .andExpect(status().isOk());

        // Validate the Unidade in the database
        List<Unidade> unidadeList = unidadeRepository.findAll();
        assertThat(unidadeList).hasSize(databaseSizeBeforeUpdate);
        Unidade testUnidade = unidadeList.get(unidadeList.size() - 1);
        assertThat(testUnidade.getNome()).isEqualTo(UPDATED_NOME);
    }

    @Test
    @Transactional
    public void updateNonExistingUnidade() throws Exception {
        int databaseSizeBeforeUpdate = unidadeRepository.findAll().size();

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restUnidadeMockMvc.perform(put("/api/unidades")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(unidade)))
            .andExpect(status().isBadRequest());

        // Validate the Unidade in the database
        List<Unidade> unidadeList = unidadeRepository.findAll();
        assertThat(unidadeList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteUnidade() throws Exception {
        // Initialize the database
        unidadeRepository.saveAndFlush(unidade);

        int databaseSizeBeforeDelete = unidadeRepository.findAll().size();

        // Delete the unidade
        restUnidadeMockMvc.perform(delete("/api/unidades/{id}", unidade.getId())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Unidade> unidadeList = unidadeRepository.findAll();
        assertThat(unidadeList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
