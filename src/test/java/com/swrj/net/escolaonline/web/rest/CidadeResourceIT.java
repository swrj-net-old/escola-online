package com.swrj.net.escolaonline.web.rest;

import com.swrj.net.escolaonline.EscolaOnlineApp;
import com.swrj.net.escolaonline.domain.Cidade;
import com.swrj.net.escolaonline.repository.CidadeRepository;

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

import com.swrj.net.escolaonline.domain.enumeration.UF;
/**
 * Integration tests for the {@link CidadeResource} REST controller.
 */
@SpringBootTest(classes = EscolaOnlineApp.class)
@AutoConfigureMockMvc
@WithMockUser
public class CidadeResourceIT {

    private static final String DEFAULT_NOME = "AAAAAAAAAA";
    private static final String UPDATED_NOME = "BBBBBBBBBB";

    private static final UF DEFAULT_UF = UF.AC;
    private static final UF UPDATED_UF = UF.AL;

    @Autowired
    private CidadeRepository cidadeRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restCidadeMockMvc;

    private Cidade cidade;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Cidade createEntity(EntityManager em) {
        Cidade cidade = new Cidade()
            .nome(DEFAULT_NOME)
            .uf(DEFAULT_UF);
        return cidade;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Cidade createUpdatedEntity(EntityManager em) {
        Cidade cidade = new Cidade()
            .nome(UPDATED_NOME)
            .uf(UPDATED_UF);
        return cidade;
    }

    @BeforeEach
    public void initTest() {
        cidade = createEntity(em);
    }

    @Test
    @Transactional
    public void createCidade() throws Exception {
        int databaseSizeBeforeCreate = cidadeRepository.findAll().size();
        // Create the Cidade
        restCidadeMockMvc.perform(post("/api/cidades")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(cidade)))
            .andExpect(status().isCreated());

        // Validate the Cidade in the database
        List<Cidade> cidadeList = cidadeRepository.findAll();
        assertThat(cidadeList).hasSize(databaseSizeBeforeCreate + 1);
        Cidade testCidade = cidadeList.get(cidadeList.size() - 1);
        assertThat(testCidade.getNome()).isEqualTo(DEFAULT_NOME);
        assertThat(testCidade.getUf()).isEqualTo(DEFAULT_UF);
    }

    @Test
    @Transactional
    public void createCidadeWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = cidadeRepository.findAll().size();

        // Create the Cidade with an existing ID
        cidade.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restCidadeMockMvc.perform(post("/api/cidades")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(cidade)))
            .andExpect(status().isBadRequest());

        // Validate the Cidade in the database
        List<Cidade> cidadeList = cidadeRepository.findAll();
        assertThat(cidadeList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllCidades() throws Exception {
        // Initialize the database
        cidadeRepository.saveAndFlush(cidade);

        // Get all the cidadeList
        restCidadeMockMvc.perform(get("/api/cidades?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(cidade.getId().intValue())))
            .andExpect(jsonPath("$.[*].nome").value(hasItem(DEFAULT_NOME)))
            .andExpect(jsonPath("$.[*].uf").value(hasItem(DEFAULT_UF.toString())));
    }
    
    @Test
    @Transactional
    public void getCidade() throws Exception {
        // Initialize the database
        cidadeRepository.saveAndFlush(cidade);

        // Get the cidade
        restCidadeMockMvc.perform(get("/api/cidades/{id}", cidade.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(cidade.getId().intValue()))
            .andExpect(jsonPath("$.nome").value(DEFAULT_NOME))
            .andExpect(jsonPath("$.uf").value(DEFAULT_UF.toString()));
    }
    @Test
    @Transactional
    public void getNonExistingCidade() throws Exception {
        // Get the cidade
        restCidadeMockMvc.perform(get("/api/cidades/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateCidade() throws Exception {
        // Initialize the database
        cidadeRepository.saveAndFlush(cidade);

        int databaseSizeBeforeUpdate = cidadeRepository.findAll().size();

        // Update the cidade
        Cidade updatedCidade = cidadeRepository.findById(cidade.getId()).get();
        // Disconnect from session so that the updates on updatedCidade are not directly saved in db
        em.detach(updatedCidade);
        updatedCidade
            .nome(UPDATED_NOME)
            .uf(UPDATED_UF);

        restCidadeMockMvc.perform(put("/api/cidades")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(updatedCidade)))
            .andExpect(status().isOk());

        // Validate the Cidade in the database
        List<Cidade> cidadeList = cidadeRepository.findAll();
        assertThat(cidadeList).hasSize(databaseSizeBeforeUpdate);
        Cidade testCidade = cidadeList.get(cidadeList.size() - 1);
        assertThat(testCidade.getNome()).isEqualTo(UPDATED_NOME);
        assertThat(testCidade.getUf()).isEqualTo(UPDATED_UF);
    }

    @Test
    @Transactional
    public void updateNonExistingCidade() throws Exception {
        int databaseSizeBeforeUpdate = cidadeRepository.findAll().size();

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restCidadeMockMvc.perform(put("/api/cidades")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(cidade)))
            .andExpect(status().isBadRequest());

        // Validate the Cidade in the database
        List<Cidade> cidadeList = cidadeRepository.findAll();
        assertThat(cidadeList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteCidade() throws Exception {
        // Initialize the database
        cidadeRepository.saveAndFlush(cidade);

        int databaseSizeBeforeDelete = cidadeRepository.findAll().size();

        // Delete the cidade
        restCidadeMockMvc.perform(delete("/api/cidades/{id}", cidade.getId())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Cidade> cidadeList = cidadeRepository.findAll();
        assertThat(cidadeList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
