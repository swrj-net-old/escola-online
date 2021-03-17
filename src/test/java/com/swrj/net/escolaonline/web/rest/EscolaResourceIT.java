package com.swrj.net.escolaonline.web.rest;

import com.swrj.net.escolaonline.EscolaOnlineApp;
import com.swrj.net.escolaonline.domain.Escola;
import com.swrj.net.escolaonline.repository.EscolaRepository;

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
 * Integration tests for the {@link EscolaResource} REST controller.
 */
@SpringBootTest(classes = EscolaOnlineApp.class)
@AutoConfigureMockMvc
@WithMockUser
public class EscolaResourceIT {

    private static final String DEFAULT_NOME = "AAAAAAAAAA";
    private static final String UPDATED_NOME = "BBBBBBBBBB";

    @Autowired
    private EscolaRepository escolaRepository;

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
            .nome(DEFAULT_NOME);
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
            .nome(UPDATED_NOME);
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
        restEscolaMockMvc.perform(post("/api/escolas")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(escola)))
            .andExpect(status().isCreated());

        // Validate the Escola in the database
        List<Escola> escolaList = escolaRepository.findAll();
        assertThat(escolaList).hasSize(databaseSizeBeforeCreate + 1);
        Escola testEscola = escolaList.get(escolaList.size() - 1);
        assertThat(testEscola.getNome()).isEqualTo(DEFAULT_NOME);
    }

    @Test
    @Transactional
    public void createEscolaWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = escolaRepository.findAll().size();

        // Create the Escola with an existing ID
        escola.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restEscolaMockMvc.perform(post("/api/escolas")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(escola)))
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
        restEscolaMockMvc.perform(get("/api/escolas?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(escola.getId().intValue())))
            .andExpect(jsonPath("$.[*].nome").value(hasItem(DEFAULT_NOME)));
    }
    
    @Test
    @Transactional
    public void getEscola() throws Exception {
        // Initialize the database
        escolaRepository.saveAndFlush(escola);

        // Get the escola
        restEscolaMockMvc.perform(get("/api/escolas/{id}", escola.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(escola.getId().intValue()))
            .andExpect(jsonPath("$.nome").value(DEFAULT_NOME));
    }
    @Test
    @Transactional
    public void getNonExistingEscola() throws Exception {
        // Get the escola
        restEscolaMockMvc.perform(get("/api/escolas/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateEscola() throws Exception {
        // Initialize the database
        escolaRepository.saveAndFlush(escola);

        int databaseSizeBeforeUpdate = escolaRepository.findAll().size();

        // Update the escola
        Escola updatedEscola = escolaRepository.findById(escola.getId()).get();
        // Disconnect from session so that the updates on updatedEscola are not directly saved in db
        em.detach(updatedEscola);
        updatedEscola
            .nome(UPDATED_NOME);

        restEscolaMockMvc.perform(put("/api/escolas")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(updatedEscola)))
            .andExpect(status().isOk());

        // Validate the Escola in the database
        List<Escola> escolaList = escolaRepository.findAll();
        assertThat(escolaList).hasSize(databaseSizeBeforeUpdate);
        Escola testEscola = escolaList.get(escolaList.size() - 1);
        assertThat(testEscola.getNome()).isEqualTo(UPDATED_NOME);
    }

    @Test
    @Transactional
    public void updateNonExistingEscola() throws Exception {
        int databaseSizeBeforeUpdate = escolaRepository.findAll().size();

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restEscolaMockMvc.perform(put("/api/escolas")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(escola)))
            .andExpect(status().isBadRequest());

        // Validate the Escola in the database
        List<Escola> escolaList = escolaRepository.findAll();
        assertThat(escolaList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteEscola() throws Exception {
        // Initialize the database
        escolaRepository.saveAndFlush(escola);

        int databaseSizeBeforeDelete = escolaRepository.findAll().size();

        // Delete the escola
        restEscolaMockMvc.perform(delete("/api/escolas/{id}", escola.getId())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Escola> escolaList = escolaRepository.findAll();
        assertThat(escolaList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
