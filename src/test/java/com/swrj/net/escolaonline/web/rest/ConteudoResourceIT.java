package com.swrj.net.escolaonline.web.rest;

import com.swrj.net.escolaonline.EscolaOnlineApp;
import com.swrj.net.escolaonline.domain.Conteudo;
import com.swrj.net.escolaonline.repository.ConteudoRepository;

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
import java.time.LocalDate;
import java.time.ZoneId;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Integration tests for the {@link ConteudoResource} REST controller.
 */
@SpringBootTest(classes = EscolaOnlineApp.class)
@AutoConfigureMockMvc
@WithMockUser
public class ConteudoResourceIT {

    private static final LocalDate DEFAULT_DATA_AULA = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_DATA_AULA = LocalDate.now(ZoneId.systemDefault());

    private static final String DEFAULT_HABILIDADES_COMPETENCIAS = "AAAAAAAAAA";
    private static final String UPDATED_HABILIDADES_COMPETENCIAS = "BBBBBBBBBB";

    private static final String DEFAULT_OBSERVACOES = "AAAAAAAAAA";
    private static final String UPDATED_OBSERVACOES = "BBBBBBBBBB";

    @Autowired
    private ConteudoRepository conteudoRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restConteudoMockMvc;

    private Conteudo conteudo;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Conteudo createEntity(EntityManager em) {
        Conteudo conteudo = new Conteudo()
            .dataAula(DEFAULT_DATA_AULA)
            .habilidadesCompetencias(DEFAULT_HABILIDADES_COMPETENCIAS)
            .observacoes(DEFAULT_OBSERVACOES);
        return conteudo;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Conteudo createUpdatedEntity(EntityManager em) {
        Conteudo conteudo = new Conteudo()
            .dataAula(UPDATED_DATA_AULA)
            .habilidadesCompetencias(UPDATED_HABILIDADES_COMPETENCIAS)
            .observacoes(UPDATED_OBSERVACOES);
        return conteudo;
    }

    @BeforeEach
    public void initTest() {
        conteudo = createEntity(em);
    }

    @Test
    @Transactional
    public void createConteudo() throws Exception {
        int databaseSizeBeforeCreate = conteudoRepository.findAll().size();
        // Create the Conteudo
        restConteudoMockMvc.perform(post("/api/conteudos")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(conteudo)))
            .andExpect(status().isCreated());

        // Validate the Conteudo in the database
        List<Conteudo> conteudoList = conteudoRepository.findAll();
        assertThat(conteudoList).hasSize(databaseSizeBeforeCreate + 1);
        Conteudo testConteudo = conteudoList.get(conteudoList.size() - 1);
        assertThat(testConteudo.getDataAula()).isEqualTo(DEFAULT_DATA_AULA);
        assertThat(testConteudo.getHabilidadesCompetencias()).isEqualTo(DEFAULT_HABILIDADES_COMPETENCIAS);
        assertThat(testConteudo.getObservacoes()).isEqualTo(DEFAULT_OBSERVACOES);
    }

    @Test
    @Transactional
    public void createConteudoWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = conteudoRepository.findAll().size();

        // Create the Conteudo with an existing ID
        conteudo.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restConteudoMockMvc.perform(post("/api/conteudos")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(conteudo)))
            .andExpect(status().isBadRequest());

        // Validate the Conteudo in the database
        List<Conteudo> conteudoList = conteudoRepository.findAll();
        assertThat(conteudoList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllConteudos() throws Exception {
        // Initialize the database
        conteudoRepository.saveAndFlush(conteudo);

        // Get all the conteudoList
        restConteudoMockMvc.perform(get("/api/conteudos?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(conteudo.getId().intValue())))
            .andExpect(jsonPath("$.[*].dataAula").value(hasItem(DEFAULT_DATA_AULA.toString())))
            .andExpect(jsonPath("$.[*].habilidadesCompetencias").value(hasItem(DEFAULT_HABILIDADES_COMPETENCIAS)))
            .andExpect(jsonPath("$.[*].observacoes").value(hasItem(DEFAULT_OBSERVACOES)));
    }
    
    @Test
    @Transactional
    public void getConteudo() throws Exception {
        // Initialize the database
        conteudoRepository.saveAndFlush(conteudo);

        // Get the conteudo
        restConteudoMockMvc.perform(get("/api/conteudos/{id}", conteudo.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(conteudo.getId().intValue()))
            .andExpect(jsonPath("$.dataAula").value(DEFAULT_DATA_AULA.toString()))
            .andExpect(jsonPath("$.habilidadesCompetencias").value(DEFAULT_HABILIDADES_COMPETENCIAS))
            .andExpect(jsonPath("$.observacoes").value(DEFAULT_OBSERVACOES));
    }
    @Test
    @Transactional
    public void getNonExistingConteudo() throws Exception {
        // Get the conteudo
        restConteudoMockMvc.perform(get("/api/conteudos/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateConteudo() throws Exception {
        // Initialize the database
        conteudoRepository.saveAndFlush(conteudo);

        int databaseSizeBeforeUpdate = conteudoRepository.findAll().size();

        // Update the conteudo
        Conteudo updatedConteudo = conteudoRepository.findById(conteudo.getId()).get();
        // Disconnect from session so that the updates on updatedConteudo are not directly saved in db
        em.detach(updatedConteudo);
        updatedConteudo
            .dataAula(UPDATED_DATA_AULA)
            .habilidadesCompetencias(UPDATED_HABILIDADES_COMPETENCIAS)
            .observacoes(UPDATED_OBSERVACOES);

        restConteudoMockMvc.perform(put("/api/conteudos")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(updatedConteudo)))
            .andExpect(status().isOk());

        // Validate the Conteudo in the database
        List<Conteudo> conteudoList = conteudoRepository.findAll();
        assertThat(conteudoList).hasSize(databaseSizeBeforeUpdate);
        Conteudo testConteudo = conteudoList.get(conteudoList.size() - 1);
        assertThat(testConteudo.getDataAula()).isEqualTo(UPDATED_DATA_AULA);
        assertThat(testConteudo.getHabilidadesCompetencias()).isEqualTo(UPDATED_HABILIDADES_COMPETENCIAS);
        assertThat(testConteudo.getObservacoes()).isEqualTo(UPDATED_OBSERVACOES);
    }

    @Test
    @Transactional
    public void updateNonExistingConteudo() throws Exception {
        int databaseSizeBeforeUpdate = conteudoRepository.findAll().size();

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restConteudoMockMvc.perform(put("/api/conteudos")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(conteudo)))
            .andExpect(status().isBadRequest());

        // Validate the Conteudo in the database
        List<Conteudo> conteudoList = conteudoRepository.findAll();
        assertThat(conteudoList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteConteudo() throws Exception {
        // Initialize the database
        conteudoRepository.saveAndFlush(conteudo);

        int databaseSizeBeforeDelete = conteudoRepository.findAll().size();

        // Delete the conteudo
        restConteudoMockMvc.perform(delete("/api/conteudos/{id}", conteudo.getId())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Conteudo> conteudoList = conteudoRepository.findAll();
        assertThat(conteudoList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
