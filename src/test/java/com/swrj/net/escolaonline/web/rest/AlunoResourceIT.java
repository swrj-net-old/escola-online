package com.swrj.net.escolaonline.web.rest;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import com.swrj.net.escolaonline.IntegrationTest;
import com.swrj.net.escolaonline.domain.Aluno;
import com.swrj.net.escolaonline.domain.enumeration.TipoSanguineo;
import com.swrj.net.escolaonline.repository.AlunoRepository;
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
 * Integration tests for the {@link AlunoResource} REST controller.
 */
@IntegrationTest
@AutoConfigureMockMvc
@WithMockUser
class AlunoResourceIT {

    private static final LocalDate DEFAULT_DATA_NASCIMENTO = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_DATA_NASCIMENTO = LocalDate.now(ZoneId.systemDefault());

    private static final TipoSanguineo DEFAULT_TIPO_SANGUINEO = TipoSanguineo.NI;
    private static final TipoSanguineo UPDATED_TIPO_SANGUINEO = TipoSanguineo.AP;

    private static final String DEFAULT_NOME_PAI = "AAAAAAAAAA";
    private static final String UPDATED_NOME_PAI = "BBBBBBBBBB";

    private static final String DEFAULT_TELEFONE_PAI = "AAAAAAAAAA";
    private static final String UPDATED_TELEFONE_PAI = "BBBBBBBBBB";

    private static final String DEFAULT_NOME_MAE = "AAAAAAAAAA";
    private static final String UPDATED_NOME_MAE = "BBBBBBBBBB";

    private static final String DEFAULT_TELEFONE_MAE = "AAAAAAAAAA";
    private static final String UPDATED_TELEFONE_MAE = "BBBBBBBBBB";

    private static final String DEFAULT_NOME_RESPONSAVEL = "AAAAAAAAAA";
    private static final String UPDATED_NOME_RESPONSAVEL = "BBBBBBBBBB";

    private static final String DEFAULT_CPF_RESPONSAVEL = "AAAAAAAAAA";
    private static final String UPDATED_CPF_RESPONSAVEL = "BBBBBBBBBB";

    private static final String DEFAULT_OBSERVACOES = "AAAAAAAAAA";
    private static final String UPDATED_OBSERVACOES = "BBBBBBBBBB";

    private static final String ENTITY_API_URL = "/api/alunos";
    private static final String ENTITY_API_URL_ID = ENTITY_API_URL + "/{id}";

    private static Random random = new Random();
    private static AtomicLong count = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));

    @Autowired
    private AlunoRepository alunoRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restAlunoMockMvc;

    private Aluno aluno;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Aluno createEntity(EntityManager em) {
        Aluno aluno = new Aluno()
            .dataNascimento(DEFAULT_DATA_NASCIMENTO)
            .tipoSanguineo(DEFAULT_TIPO_SANGUINEO)
            .nomePai(DEFAULT_NOME_PAI)
            .telefonePai(DEFAULT_TELEFONE_PAI)
            .nomeMae(DEFAULT_NOME_MAE)
            .telefoneMae(DEFAULT_TELEFONE_MAE)
            .nomeResponsavel(DEFAULT_NOME_RESPONSAVEL)
            .cpfResponsavel(DEFAULT_CPF_RESPONSAVEL)
            .observacoes(DEFAULT_OBSERVACOES);
        return aluno;
    }

    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Aluno createUpdatedEntity(EntityManager em) {
        Aluno aluno = new Aluno()
            .dataNascimento(UPDATED_DATA_NASCIMENTO)
            .tipoSanguineo(UPDATED_TIPO_SANGUINEO)
            .nomePai(UPDATED_NOME_PAI)
            .telefonePai(UPDATED_TELEFONE_PAI)
            .nomeMae(UPDATED_NOME_MAE)
            .telefoneMae(UPDATED_TELEFONE_MAE)
            .nomeResponsavel(UPDATED_NOME_RESPONSAVEL)
            .cpfResponsavel(UPDATED_CPF_RESPONSAVEL)
            .observacoes(UPDATED_OBSERVACOES);
        return aluno;
    }

    @BeforeEach
    public void initTest() {
        aluno = createEntity(em);
    }

    @Test
    @Transactional
    void createAluno() throws Exception {
        int databaseSizeBeforeCreate = alunoRepository.findAll().size();
        // Create the Aluno
        restAlunoMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(aluno)))
            .andExpect(status().isCreated());

        // Validate the Aluno in the database
        List<Aluno> alunoList = alunoRepository.findAll();
        assertThat(alunoList).hasSize(databaseSizeBeforeCreate + 1);
        Aluno testAluno = alunoList.get(alunoList.size() - 1);
        assertThat(testAluno.getDataNascimento()).isEqualTo(DEFAULT_DATA_NASCIMENTO);
        assertThat(testAluno.getTipoSanguineo()).isEqualTo(DEFAULT_TIPO_SANGUINEO);
        assertThat(testAluno.getNomePai()).isEqualTo(DEFAULT_NOME_PAI);
        assertThat(testAluno.getTelefonePai()).isEqualTo(DEFAULT_TELEFONE_PAI);
        assertThat(testAluno.getNomeMae()).isEqualTo(DEFAULT_NOME_MAE);
        assertThat(testAluno.getTelefoneMae()).isEqualTo(DEFAULT_TELEFONE_MAE);
        assertThat(testAluno.getNomeResponsavel()).isEqualTo(DEFAULT_NOME_RESPONSAVEL);
        assertThat(testAluno.getCpfResponsavel()).isEqualTo(DEFAULT_CPF_RESPONSAVEL);
        assertThat(testAluno.getObservacoes()).isEqualTo(DEFAULT_OBSERVACOES);
    }

    @Test
    @Transactional
    void createAlunoWithExistingId() throws Exception {
        // Create the Aluno with an existing ID
        aluno.setId(1L);

        int databaseSizeBeforeCreate = alunoRepository.findAll().size();

        // An entity with an existing ID cannot be created, so this API call must fail
        restAlunoMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(aluno)))
            .andExpect(status().isBadRequest());

        // Validate the Aluno in the database
        List<Aluno> alunoList = alunoRepository.findAll();
        assertThat(alunoList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    void getAllAlunos() throws Exception {
        // Initialize the database
        alunoRepository.saveAndFlush(aluno);

        // Get all the alunoList
        restAlunoMockMvc
            .perform(get(ENTITY_API_URL + "?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(aluno.getId().intValue())))
            .andExpect(jsonPath("$.[*].dataNascimento").value(hasItem(DEFAULT_DATA_NASCIMENTO.toString())))
            .andExpect(jsonPath("$.[*].tipoSanguineo").value(hasItem(DEFAULT_TIPO_SANGUINEO.toString())))
            .andExpect(jsonPath("$.[*].nomePai").value(hasItem(DEFAULT_NOME_PAI)))
            .andExpect(jsonPath("$.[*].telefonePai").value(hasItem(DEFAULT_TELEFONE_PAI)))
            .andExpect(jsonPath("$.[*].nomeMae").value(hasItem(DEFAULT_NOME_MAE)))
            .andExpect(jsonPath("$.[*].telefoneMae").value(hasItem(DEFAULT_TELEFONE_MAE)))
            .andExpect(jsonPath("$.[*].nomeResponsavel").value(hasItem(DEFAULT_NOME_RESPONSAVEL)))
            .andExpect(jsonPath("$.[*].cpfResponsavel").value(hasItem(DEFAULT_CPF_RESPONSAVEL)))
            .andExpect(jsonPath("$.[*].observacoes").value(hasItem(DEFAULT_OBSERVACOES)));
    }

    @Test
    @Transactional
    void getAluno() throws Exception {
        // Initialize the database
        alunoRepository.saveAndFlush(aluno);

        // Get the aluno
        restAlunoMockMvc
            .perform(get(ENTITY_API_URL_ID, aluno.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(aluno.getId().intValue()))
            .andExpect(jsonPath("$.dataNascimento").value(DEFAULT_DATA_NASCIMENTO.toString()))
            .andExpect(jsonPath("$.tipoSanguineo").value(DEFAULT_TIPO_SANGUINEO.toString()))
            .andExpect(jsonPath("$.nomePai").value(DEFAULT_NOME_PAI))
            .andExpect(jsonPath("$.telefonePai").value(DEFAULT_TELEFONE_PAI))
            .andExpect(jsonPath("$.nomeMae").value(DEFAULT_NOME_MAE))
            .andExpect(jsonPath("$.telefoneMae").value(DEFAULT_TELEFONE_MAE))
            .andExpect(jsonPath("$.nomeResponsavel").value(DEFAULT_NOME_RESPONSAVEL))
            .andExpect(jsonPath("$.cpfResponsavel").value(DEFAULT_CPF_RESPONSAVEL))
            .andExpect(jsonPath("$.observacoes").value(DEFAULT_OBSERVACOES));
    }

    @Test
    @Transactional
    void getNonExistingAluno() throws Exception {
        // Get the aluno
        restAlunoMockMvc.perform(get(ENTITY_API_URL_ID, Long.MAX_VALUE)).andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    void putNewAluno() throws Exception {
        // Initialize the database
        alunoRepository.saveAndFlush(aluno);

        int databaseSizeBeforeUpdate = alunoRepository.findAll().size();

        // Update the aluno
        Aluno updatedAluno = alunoRepository.findById(aluno.getId()).get();
        // Disconnect from session so that the updates on updatedAluno are not directly saved in db
        em.detach(updatedAluno);
        updatedAluno
            .dataNascimento(UPDATED_DATA_NASCIMENTO)
            .tipoSanguineo(UPDATED_TIPO_SANGUINEO)
            .nomePai(UPDATED_NOME_PAI)
            .telefonePai(UPDATED_TELEFONE_PAI)
            .nomeMae(UPDATED_NOME_MAE)
            .telefoneMae(UPDATED_TELEFONE_MAE)
            .nomeResponsavel(UPDATED_NOME_RESPONSAVEL)
            .cpfResponsavel(UPDATED_CPF_RESPONSAVEL)
            .observacoes(UPDATED_OBSERVACOES);

        restAlunoMockMvc
            .perform(
                put(ENTITY_API_URL_ID, updatedAluno.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(updatedAluno))
            )
            .andExpect(status().isOk());

        // Validate the Aluno in the database
        List<Aluno> alunoList = alunoRepository.findAll();
        assertThat(alunoList).hasSize(databaseSizeBeforeUpdate);
        Aluno testAluno = alunoList.get(alunoList.size() - 1);
        assertThat(testAluno.getDataNascimento()).isEqualTo(UPDATED_DATA_NASCIMENTO);
        assertThat(testAluno.getTipoSanguineo()).isEqualTo(UPDATED_TIPO_SANGUINEO);
        assertThat(testAluno.getNomePai()).isEqualTo(UPDATED_NOME_PAI);
        assertThat(testAluno.getTelefonePai()).isEqualTo(UPDATED_TELEFONE_PAI);
        assertThat(testAluno.getNomeMae()).isEqualTo(UPDATED_NOME_MAE);
        assertThat(testAluno.getTelefoneMae()).isEqualTo(UPDATED_TELEFONE_MAE);
        assertThat(testAluno.getNomeResponsavel()).isEqualTo(UPDATED_NOME_RESPONSAVEL);
        assertThat(testAluno.getCpfResponsavel()).isEqualTo(UPDATED_CPF_RESPONSAVEL);
        assertThat(testAluno.getObservacoes()).isEqualTo(UPDATED_OBSERVACOES);
    }

    @Test
    @Transactional
    void putNonExistingAluno() throws Exception {
        int databaseSizeBeforeUpdate = alunoRepository.findAll().size();
        aluno.setId(count.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restAlunoMockMvc
            .perform(
                put(ENTITY_API_URL_ID, aluno.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(aluno))
            )
            .andExpect(status().isBadRequest());

        // Validate the Aluno in the database
        List<Aluno> alunoList = alunoRepository.findAll();
        assertThat(alunoList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithIdMismatchAluno() throws Exception {
        int databaseSizeBeforeUpdate = alunoRepository.findAll().size();
        aluno.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restAlunoMockMvc
            .perform(
                put(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(aluno))
            )
            .andExpect(status().isBadRequest());

        // Validate the Aluno in the database
        List<Aluno> alunoList = alunoRepository.findAll();
        assertThat(alunoList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithMissingIdPathParamAluno() throws Exception {
        int databaseSizeBeforeUpdate = alunoRepository.findAll().size();
        aluno.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restAlunoMockMvc
            .perform(put(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(aluno)))
            .andExpect(status().isMethodNotAllowed());

        // Validate the Aluno in the database
        List<Aluno> alunoList = alunoRepository.findAll();
        assertThat(alunoList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void partialUpdateAlunoWithPatch() throws Exception {
        // Initialize the database
        alunoRepository.saveAndFlush(aluno);

        int databaseSizeBeforeUpdate = alunoRepository.findAll().size();

        // Update the aluno using partial update
        Aluno partialUpdatedAluno = new Aluno();
        partialUpdatedAluno.setId(aluno.getId());

        partialUpdatedAluno
            .dataNascimento(UPDATED_DATA_NASCIMENTO)
            .tipoSanguineo(UPDATED_TIPO_SANGUINEO)
            .telefonePai(UPDATED_TELEFONE_PAI)
            .nomeMae(UPDATED_NOME_MAE)
            .telefoneMae(UPDATED_TELEFONE_MAE)
            .nomeResponsavel(UPDATED_NOME_RESPONSAVEL)
            .observacoes(UPDATED_OBSERVACOES);

        restAlunoMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedAluno.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedAluno))
            )
            .andExpect(status().isOk());

        // Validate the Aluno in the database
        List<Aluno> alunoList = alunoRepository.findAll();
        assertThat(alunoList).hasSize(databaseSizeBeforeUpdate);
        Aluno testAluno = alunoList.get(alunoList.size() - 1);
        assertThat(testAluno.getDataNascimento()).isEqualTo(UPDATED_DATA_NASCIMENTO);
        assertThat(testAluno.getTipoSanguineo()).isEqualTo(UPDATED_TIPO_SANGUINEO);
        assertThat(testAluno.getNomePai()).isEqualTo(DEFAULT_NOME_PAI);
        assertThat(testAluno.getTelefonePai()).isEqualTo(UPDATED_TELEFONE_PAI);
        assertThat(testAluno.getNomeMae()).isEqualTo(UPDATED_NOME_MAE);
        assertThat(testAluno.getTelefoneMae()).isEqualTo(UPDATED_TELEFONE_MAE);
        assertThat(testAluno.getNomeResponsavel()).isEqualTo(UPDATED_NOME_RESPONSAVEL);
        assertThat(testAluno.getCpfResponsavel()).isEqualTo(DEFAULT_CPF_RESPONSAVEL);
        assertThat(testAluno.getObservacoes()).isEqualTo(UPDATED_OBSERVACOES);
    }

    @Test
    @Transactional
    void fullUpdateAlunoWithPatch() throws Exception {
        // Initialize the database
        alunoRepository.saveAndFlush(aluno);

        int databaseSizeBeforeUpdate = alunoRepository.findAll().size();

        // Update the aluno using partial update
        Aluno partialUpdatedAluno = new Aluno();
        partialUpdatedAluno.setId(aluno.getId());

        partialUpdatedAluno
            .dataNascimento(UPDATED_DATA_NASCIMENTO)
            .tipoSanguineo(UPDATED_TIPO_SANGUINEO)
            .nomePai(UPDATED_NOME_PAI)
            .telefonePai(UPDATED_TELEFONE_PAI)
            .nomeMae(UPDATED_NOME_MAE)
            .telefoneMae(UPDATED_TELEFONE_MAE)
            .nomeResponsavel(UPDATED_NOME_RESPONSAVEL)
            .cpfResponsavel(UPDATED_CPF_RESPONSAVEL)
            .observacoes(UPDATED_OBSERVACOES);

        restAlunoMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedAluno.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedAluno))
            )
            .andExpect(status().isOk());

        // Validate the Aluno in the database
        List<Aluno> alunoList = alunoRepository.findAll();
        assertThat(alunoList).hasSize(databaseSizeBeforeUpdate);
        Aluno testAluno = alunoList.get(alunoList.size() - 1);
        assertThat(testAluno.getDataNascimento()).isEqualTo(UPDATED_DATA_NASCIMENTO);
        assertThat(testAluno.getTipoSanguineo()).isEqualTo(UPDATED_TIPO_SANGUINEO);
        assertThat(testAluno.getNomePai()).isEqualTo(UPDATED_NOME_PAI);
        assertThat(testAluno.getTelefonePai()).isEqualTo(UPDATED_TELEFONE_PAI);
        assertThat(testAluno.getNomeMae()).isEqualTo(UPDATED_NOME_MAE);
        assertThat(testAluno.getTelefoneMae()).isEqualTo(UPDATED_TELEFONE_MAE);
        assertThat(testAluno.getNomeResponsavel()).isEqualTo(UPDATED_NOME_RESPONSAVEL);
        assertThat(testAluno.getCpfResponsavel()).isEqualTo(UPDATED_CPF_RESPONSAVEL);
        assertThat(testAluno.getObservacoes()).isEqualTo(UPDATED_OBSERVACOES);
    }

    @Test
    @Transactional
    void patchNonExistingAluno() throws Exception {
        int databaseSizeBeforeUpdate = alunoRepository.findAll().size();
        aluno.setId(count.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restAlunoMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, aluno.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(aluno))
            )
            .andExpect(status().isBadRequest());

        // Validate the Aluno in the database
        List<Aluno> alunoList = alunoRepository.findAll();
        assertThat(alunoList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithIdMismatchAluno() throws Exception {
        int databaseSizeBeforeUpdate = alunoRepository.findAll().size();
        aluno.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restAlunoMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(aluno))
            )
            .andExpect(status().isBadRequest());

        // Validate the Aluno in the database
        List<Aluno> alunoList = alunoRepository.findAll();
        assertThat(alunoList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithMissingIdPathParamAluno() throws Exception {
        int databaseSizeBeforeUpdate = alunoRepository.findAll().size();
        aluno.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restAlunoMockMvc
            .perform(patch(ENTITY_API_URL).contentType("application/merge-patch+json").content(TestUtil.convertObjectToJsonBytes(aluno)))
            .andExpect(status().isMethodNotAllowed());

        // Validate the Aluno in the database
        List<Aluno> alunoList = alunoRepository.findAll();
        assertThat(alunoList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void deleteAluno() throws Exception {
        // Initialize the database
        alunoRepository.saveAndFlush(aluno);

        int databaseSizeBeforeDelete = alunoRepository.findAll().size();

        // Delete the aluno
        restAlunoMockMvc
            .perform(delete(ENTITY_API_URL_ID, aluno.getId()).accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Aluno> alunoList = alunoRepository.findAll();
        assertThat(alunoList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
