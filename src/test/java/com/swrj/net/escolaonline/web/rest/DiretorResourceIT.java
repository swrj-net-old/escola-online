package com.swrj.net.escolaonline.web.rest;

import com.swrj.net.escolaonline.EscolaOnlineApp;
import com.swrj.net.escolaonline.domain.Diretor;
import com.swrj.net.escolaonline.repository.DiretorRepository;

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
 * Integration tests for the {@link DiretorResource} REST controller.
 */
@SpringBootTest(classes = EscolaOnlineApp.class)
@AutoConfigureMockMvc
@WithMockUser
public class DiretorResourceIT {

    private static final Integer DEFAULT_ANO_LETIVO = 1;
    private static final Integer UPDATED_ANO_LETIVO = 2;

    private static final LocalDate DEFAULT_DATA_INICIO = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_DATA_INICIO = LocalDate.now(ZoneId.systemDefault());

    private static final LocalDate DEFAULT_DATA_FIM = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_DATA_FIM = LocalDate.now(ZoneId.systemDefault());

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
        Diretor diretor = new Diretor()
            .anoLetivo(DEFAULT_ANO_LETIVO)
            .dataInicio(DEFAULT_DATA_INICIO)
            .dataFim(DEFAULT_DATA_FIM);
        return diretor;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Diretor createUpdatedEntity(EntityManager em) {
        Diretor diretor = new Diretor()
            .anoLetivo(UPDATED_ANO_LETIVO)
            .dataInicio(UPDATED_DATA_INICIO)
            .dataFim(UPDATED_DATA_FIM);
        return diretor;
    }

    @BeforeEach
    public void initTest() {
        diretor = createEntity(em);
    }

    @Test
    @Transactional
    public void createDiretor() throws Exception {
        int databaseSizeBeforeCreate = diretorRepository.findAll().size();
        // Create the Diretor
        restDiretorMockMvc.perform(post("/api/diretors")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(diretor)))
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
    public void createDiretorWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = diretorRepository.findAll().size();

        // Create the Diretor with an existing ID
        diretor.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restDiretorMockMvc.perform(post("/api/diretors")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(diretor)))
            .andExpect(status().isBadRequest());

        // Validate the Diretor in the database
        List<Diretor> diretorList = diretorRepository.findAll();
        assertThat(diretorList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllDiretors() throws Exception {
        // Initialize the database
        diretorRepository.saveAndFlush(diretor);

        // Get all the diretorList
        restDiretorMockMvc.perform(get("/api/diretors?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(diretor.getId().intValue())))
            .andExpect(jsonPath("$.[*].anoLetivo").value(hasItem(DEFAULT_ANO_LETIVO)))
            .andExpect(jsonPath("$.[*].dataInicio").value(hasItem(DEFAULT_DATA_INICIO.toString())))
            .andExpect(jsonPath("$.[*].dataFim").value(hasItem(DEFAULT_DATA_FIM.toString())));
    }
    
    @Test
    @Transactional
    public void getDiretor() throws Exception {
        // Initialize the database
        diretorRepository.saveAndFlush(diretor);

        // Get the diretor
        restDiretorMockMvc.perform(get("/api/diretors/{id}", diretor.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(diretor.getId().intValue()))
            .andExpect(jsonPath("$.anoLetivo").value(DEFAULT_ANO_LETIVO))
            .andExpect(jsonPath("$.dataInicio").value(DEFAULT_DATA_INICIO.toString()))
            .andExpect(jsonPath("$.dataFim").value(DEFAULT_DATA_FIM.toString()));
    }
    @Test
    @Transactional
    public void getNonExistingDiretor() throws Exception {
        // Get the diretor
        restDiretorMockMvc.perform(get("/api/diretors/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateDiretor() throws Exception {
        // Initialize the database
        diretorRepository.saveAndFlush(diretor);

        int databaseSizeBeforeUpdate = diretorRepository.findAll().size();

        // Update the diretor
        Diretor updatedDiretor = diretorRepository.findById(diretor.getId()).get();
        // Disconnect from session so that the updates on updatedDiretor are not directly saved in db
        em.detach(updatedDiretor);
        updatedDiretor
            .anoLetivo(UPDATED_ANO_LETIVO)
            .dataInicio(UPDATED_DATA_INICIO)
            .dataFim(UPDATED_DATA_FIM);

        restDiretorMockMvc.perform(put("/api/diretors")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(updatedDiretor)))
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
    public void updateNonExistingDiretor() throws Exception {
        int databaseSizeBeforeUpdate = diretorRepository.findAll().size();

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restDiretorMockMvc.perform(put("/api/diretors")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(diretor)))
            .andExpect(status().isBadRequest());

        // Validate the Diretor in the database
        List<Diretor> diretorList = diretorRepository.findAll();
        assertThat(diretorList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteDiretor() throws Exception {
        // Initialize the database
        diretorRepository.saveAndFlush(diretor);

        int databaseSizeBeforeDelete = diretorRepository.findAll().size();

        // Delete the diretor
        restDiretorMockMvc.perform(delete("/api/diretors/{id}", diretor.getId())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Diretor> diretorList = diretorRepository.findAll();
        assertThat(diretorList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
