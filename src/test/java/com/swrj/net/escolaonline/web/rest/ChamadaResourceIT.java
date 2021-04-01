package com.swrj.net.escolaonline.web.rest;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import com.swrj.net.escolaonline.EscolaOnlineApp;
import com.swrj.net.escolaonline.domain.Chamada;
import com.swrj.net.escolaonline.repository.ChamadaRepository;
import com.swrj.net.escolaonline.service.ChamadaService;
import java.time.LocalDate;
import java.time.ZoneId;
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
 * Integration tests for the {@link ChamadaResource} REST controller.
 */
@SpringBootTest(classes = EscolaOnlineApp.class)
@AutoConfigureMockMvc
@WithMockUser
public class ChamadaResourceIT {
    private static final LocalDate DEFAULT_DATA_AULA = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_DATA_AULA = LocalDate.now(ZoneId.systemDefault());

    private static final String DEFAULT_OBSERVACOES = "AAAAAAAAAA";
    private static final String UPDATED_OBSERVACOES = "BBBBBBBBBB";

    @Autowired
    private ChamadaRepository chamadaRepository;

    @Autowired
    private ChamadaService chamadaService;

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
    public void createChamada() throws Exception {
        int databaseSizeBeforeCreate = chamadaRepository.findAll().size();
        // Create the Chamada
        restChamadaMockMvc
            .perform(post("/api/chamadas").contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(chamada)))
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
    public void createChamadaWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = chamadaRepository.findAll().size();

        // Create the Chamada with an existing ID
        chamada.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restChamadaMockMvc
            .perform(post("/api/chamadas").contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(chamada)))
            .andExpect(status().isBadRequest());

        // Validate the Chamada in the database
        List<Chamada> chamadaList = chamadaRepository.findAll();
        assertThat(chamadaList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllChamadas() throws Exception {
        // Initialize the database
        chamadaRepository.saveAndFlush(chamada);

        // Get all the chamadaList
        restChamadaMockMvc
            .perform(get("/api/chamadas?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(chamada.getId().intValue())))
            .andExpect(jsonPath("$.[*].dataAula").value(hasItem(DEFAULT_DATA_AULA.toString())))
            .andExpect(jsonPath("$.[*].observacoes").value(hasItem(DEFAULT_OBSERVACOES)));
    }

    @Test
    @Transactional
    public void getChamada() throws Exception {
        // Initialize the database
        chamadaRepository.saveAndFlush(chamada);

        // Get the chamada
        restChamadaMockMvc
            .perform(get("/api/chamadas/{id}", chamada.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(chamada.getId().intValue()))
            .andExpect(jsonPath("$.dataAula").value(DEFAULT_DATA_AULA.toString()))
            .andExpect(jsonPath("$.observacoes").value(DEFAULT_OBSERVACOES));
    }

    @Test
    @Transactional
    public void getNonExistingChamada() throws Exception {
        // Get the chamada
        restChamadaMockMvc.perform(get("/api/chamadas/{id}", Long.MAX_VALUE)).andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateChamada() throws Exception {
        // Initialize the database
        chamadaService.save(chamada);

        int databaseSizeBeforeUpdate = chamadaRepository.findAll().size();

        // Update the chamada
        Chamada updatedChamada = chamadaRepository.findById(chamada.getId()).get();
        // Disconnect from session so that the updates on updatedChamada are not directly saved in db
        em.detach(updatedChamada);
        updatedChamada.dataAula(UPDATED_DATA_AULA).observacoes(UPDATED_OBSERVACOES);

        restChamadaMockMvc
            .perform(
                put("/api/chamadas").contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(updatedChamada))
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
    public void updateNonExistingChamada() throws Exception {
        int databaseSizeBeforeUpdate = chamadaRepository.findAll().size();

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restChamadaMockMvc
            .perform(put("/api/chamadas").contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(chamada)))
            .andExpect(status().isBadRequest());

        // Validate the Chamada in the database
        List<Chamada> chamadaList = chamadaRepository.findAll();
        assertThat(chamadaList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteChamada() throws Exception {
        // Initialize the database
        chamadaService.save(chamada);

        int databaseSizeBeforeDelete = chamadaRepository.findAll().size();

        // Delete the chamada
        restChamadaMockMvc
            .perform(delete("/api/chamadas/{id}", chamada.getId()).accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Chamada> chamadaList = chamadaRepository.findAll();
        assertThat(chamadaList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
