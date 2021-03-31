package com.swrj.net.escolaonline.web.rest;

import static com.swrj.net.escolaonline.web.rest.TestUtil.sameNumber;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import com.swrj.net.escolaonline.IntegrationTest;
import com.swrj.net.escolaonline.domain.Debito;
import com.swrj.net.escolaonline.domain.enumeration.SituacaoDebito;
import com.swrj.net.escolaonline.domain.enumeration.TipoDebito;
import com.swrj.net.escolaonline.repository.DebitoRepository;
import java.math.BigDecimal;
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
 * Integration tests for the {@link DebitoResource} REST controller.
 */
@IntegrationTest
@AutoConfigureMockMvc
@WithMockUser
class DebitoResourceIT {

    private static final TipoDebito DEFAULT_TIPO_DEBITO = TipoDebito.MENSALIDADE;
    private static final TipoDebito UPDATED_TIPO_DEBITO = TipoDebito.TAXA_MATERIAL;

    private static final SituacaoDebito DEFAULT_SITUACAO_DEBITO = SituacaoDebito.NAO_PAGO;
    private static final SituacaoDebito UPDATED_SITUACAO_DEBITO = SituacaoDebito.PAGO_PARCIAL;

    private static final LocalDate DEFAULT_DATA_VENCIMENTO = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_DATA_VENCIMENTO = LocalDate.now(ZoneId.systemDefault());

    private static final LocalDate DEFAULT_DATA_PAGAMENTO = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_DATA_PAGAMENTO = LocalDate.now(ZoneId.systemDefault());

    private static final BigDecimal DEFAULT_VALOR_ORIGINAL = new BigDecimal(1);
    private static final BigDecimal UPDATED_VALOR_ORIGINAL = new BigDecimal(2);

    private static final BigDecimal DEFAULT_TOTAL_PAGO = new BigDecimal(1);
    private static final BigDecimal UPDATED_TOTAL_PAGO = new BigDecimal(2);

    private static final BigDecimal DEFAULT_TOTAL_DESCONTO = new BigDecimal(1);
    private static final BigDecimal UPDATED_TOTAL_DESCONTO = new BigDecimal(2);

    private static final BigDecimal DEFAULT_TOTAL_DEVIDO = new BigDecimal(1);
    private static final BigDecimal UPDATED_TOTAL_DEVIDO = new BigDecimal(2);

    private static final String DEFAULT_OBSERVACOES = "AAAAAAAAAA";
    private static final String UPDATED_OBSERVACOES = "BBBBBBBBBB";

    private static final String ENTITY_API_URL = "/api/debitos";
    private static final String ENTITY_API_URL_ID = ENTITY_API_URL + "/{id}";

    private static Random random = new Random();
    private static AtomicLong count = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));

    @Autowired
    private DebitoRepository debitoRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restDebitoMockMvc;

    private Debito debito;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Debito createEntity(EntityManager em) {
        Debito debito = new Debito()
            .tipoDebito(DEFAULT_TIPO_DEBITO)
            .situacaoDebito(DEFAULT_SITUACAO_DEBITO)
            .dataVencimento(DEFAULT_DATA_VENCIMENTO)
            .dataPagamento(DEFAULT_DATA_PAGAMENTO)
            .valorOriginal(DEFAULT_VALOR_ORIGINAL)
            .totalPago(DEFAULT_TOTAL_PAGO)
            .totalDesconto(DEFAULT_TOTAL_DESCONTO)
            .totalDevido(DEFAULT_TOTAL_DEVIDO)
            .observacoes(DEFAULT_OBSERVACOES);
        return debito;
    }

    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Debito createUpdatedEntity(EntityManager em) {
        Debito debito = new Debito()
            .tipoDebito(UPDATED_TIPO_DEBITO)
            .situacaoDebito(UPDATED_SITUACAO_DEBITO)
            .dataVencimento(UPDATED_DATA_VENCIMENTO)
            .dataPagamento(UPDATED_DATA_PAGAMENTO)
            .valorOriginal(UPDATED_VALOR_ORIGINAL)
            .totalPago(UPDATED_TOTAL_PAGO)
            .totalDesconto(UPDATED_TOTAL_DESCONTO)
            .totalDevido(UPDATED_TOTAL_DEVIDO)
            .observacoes(UPDATED_OBSERVACOES);
        return debito;
    }

    @BeforeEach
    public void initTest() {
        debito = createEntity(em);
    }

    @Test
    @Transactional
    void createDebito() throws Exception {
        int databaseSizeBeforeCreate = debitoRepository.findAll().size();
        // Create the Debito
        restDebitoMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(debito)))
            .andExpect(status().isCreated());

        // Validate the Debito in the database
        List<Debito> debitoList = debitoRepository.findAll();
        assertThat(debitoList).hasSize(databaseSizeBeforeCreate + 1);
        Debito testDebito = debitoList.get(debitoList.size() - 1);
        assertThat(testDebito.getTipoDebito()).isEqualTo(DEFAULT_TIPO_DEBITO);
        assertThat(testDebito.getSituacaoDebito()).isEqualTo(DEFAULT_SITUACAO_DEBITO);
        assertThat(testDebito.getDataVencimento()).isEqualTo(DEFAULT_DATA_VENCIMENTO);
        assertThat(testDebito.getDataPagamento()).isEqualTo(DEFAULT_DATA_PAGAMENTO);
        assertThat(testDebito.getValorOriginal()).isEqualByComparingTo(DEFAULT_VALOR_ORIGINAL);
        assertThat(testDebito.getTotalPago()).isEqualByComparingTo(DEFAULT_TOTAL_PAGO);
        assertThat(testDebito.getTotalDesconto()).isEqualByComparingTo(DEFAULT_TOTAL_DESCONTO);
        assertThat(testDebito.getTotalDevido()).isEqualByComparingTo(DEFAULT_TOTAL_DEVIDO);
        assertThat(testDebito.getObservacoes()).isEqualTo(DEFAULT_OBSERVACOES);
    }

    @Test
    @Transactional
    void createDebitoWithExistingId() throws Exception {
        // Create the Debito with an existing ID
        debito.setId(1L);

        int databaseSizeBeforeCreate = debitoRepository.findAll().size();

        // An entity with an existing ID cannot be created, so this API call must fail
        restDebitoMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(debito)))
            .andExpect(status().isBadRequest());

        // Validate the Debito in the database
        List<Debito> debitoList = debitoRepository.findAll();
        assertThat(debitoList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    void getAllDebitos() throws Exception {
        // Initialize the database
        debitoRepository.saveAndFlush(debito);

        // Get all the debitoList
        restDebitoMockMvc
            .perform(get(ENTITY_API_URL + "?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(debito.getId().intValue())))
            .andExpect(jsonPath("$.[*].tipoDebito").value(hasItem(DEFAULT_TIPO_DEBITO.toString())))
            .andExpect(jsonPath("$.[*].situacaoDebito").value(hasItem(DEFAULT_SITUACAO_DEBITO.toString())))
            .andExpect(jsonPath("$.[*].dataVencimento").value(hasItem(DEFAULT_DATA_VENCIMENTO.toString())))
            .andExpect(jsonPath("$.[*].dataPagamento").value(hasItem(DEFAULT_DATA_PAGAMENTO.toString())))
            .andExpect(jsonPath("$.[*].valorOriginal").value(hasItem(sameNumber(DEFAULT_VALOR_ORIGINAL))))
            .andExpect(jsonPath("$.[*].totalPago").value(hasItem(sameNumber(DEFAULT_TOTAL_PAGO))))
            .andExpect(jsonPath("$.[*].totalDesconto").value(hasItem(sameNumber(DEFAULT_TOTAL_DESCONTO))))
            .andExpect(jsonPath("$.[*].totalDevido").value(hasItem(sameNumber(DEFAULT_TOTAL_DEVIDO))))
            .andExpect(jsonPath("$.[*].observacoes").value(hasItem(DEFAULT_OBSERVACOES)));
    }

    @Test
    @Transactional
    void getDebito() throws Exception {
        // Initialize the database
        debitoRepository.saveAndFlush(debito);

        // Get the debito
        restDebitoMockMvc
            .perform(get(ENTITY_API_URL_ID, debito.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(debito.getId().intValue()))
            .andExpect(jsonPath("$.tipoDebito").value(DEFAULT_TIPO_DEBITO.toString()))
            .andExpect(jsonPath("$.situacaoDebito").value(DEFAULT_SITUACAO_DEBITO.toString()))
            .andExpect(jsonPath("$.dataVencimento").value(DEFAULT_DATA_VENCIMENTO.toString()))
            .andExpect(jsonPath("$.dataPagamento").value(DEFAULT_DATA_PAGAMENTO.toString()))
            .andExpect(jsonPath("$.valorOriginal").value(sameNumber(DEFAULT_VALOR_ORIGINAL)))
            .andExpect(jsonPath("$.totalPago").value(sameNumber(DEFAULT_TOTAL_PAGO)))
            .andExpect(jsonPath("$.totalDesconto").value(sameNumber(DEFAULT_TOTAL_DESCONTO)))
            .andExpect(jsonPath("$.totalDevido").value(sameNumber(DEFAULT_TOTAL_DEVIDO)))
            .andExpect(jsonPath("$.observacoes").value(DEFAULT_OBSERVACOES));
    }

    @Test
    @Transactional
    void getNonExistingDebito() throws Exception {
        // Get the debito
        restDebitoMockMvc.perform(get(ENTITY_API_URL_ID, Long.MAX_VALUE)).andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    void putNewDebito() throws Exception {
        // Initialize the database
        debitoRepository.saveAndFlush(debito);

        int databaseSizeBeforeUpdate = debitoRepository.findAll().size();

        // Update the debito
        Debito updatedDebito = debitoRepository.findById(debito.getId()).get();
        // Disconnect from session so that the updates on updatedDebito are not directly saved in db
        em.detach(updatedDebito);
        updatedDebito
            .tipoDebito(UPDATED_TIPO_DEBITO)
            .situacaoDebito(UPDATED_SITUACAO_DEBITO)
            .dataVencimento(UPDATED_DATA_VENCIMENTO)
            .dataPagamento(UPDATED_DATA_PAGAMENTO)
            .valorOriginal(UPDATED_VALOR_ORIGINAL)
            .totalPago(UPDATED_TOTAL_PAGO)
            .totalDesconto(UPDATED_TOTAL_DESCONTO)
            .totalDevido(UPDATED_TOTAL_DEVIDO)
            .observacoes(UPDATED_OBSERVACOES);

        restDebitoMockMvc
            .perform(
                put(ENTITY_API_URL_ID, updatedDebito.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(updatedDebito))
            )
            .andExpect(status().isOk());

        // Validate the Debito in the database
        List<Debito> debitoList = debitoRepository.findAll();
        assertThat(debitoList).hasSize(databaseSizeBeforeUpdate);
        Debito testDebito = debitoList.get(debitoList.size() - 1);
        assertThat(testDebito.getTipoDebito()).isEqualTo(UPDATED_TIPO_DEBITO);
        assertThat(testDebito.getSituacaoDebito()).isEqualTo(UPDATED_SITUACAO_DEBITO);
        assertThat(testDebito.getDataVencimento()).isEqualTo(UPDATED_DATA_VENCIMENTO);
        assertThat(testDebito.getDataPagamento()).isEqualTo(UPDATED_DATA_PAGAMENTO);
        assertThat(testDebito.getValorOriginal()).isEqualTo(UPDATED_VALOR_ORIGINAL);
        assertThat(testDebito.getTotalPago()).isEqualTo(UPDATED_TOTAL_PAGO);
        assertThat(testDebito.getTotalDesconto()).isEqualTo(UPDATED_TOTAL_DESCONTO);
        assertThat(testDebito.getTotalDevido()).isEqualTo(UPDATED_TOTAL_DEVIDO);
        assertThat(testDebito.getObservacoes()).isEqualTo(UPDATED_OBSERVACOES);
    }

    @Test
    @Transactional
    void putNonExistingDebito() throws Exception {
        int databaseSizeBeforeUpdate = debitoRepository.findAll().size();
        debito.setId(count.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restDebitoMockMvc
            .perform(
                put(ENTITY_API_URL_ID, debito.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(debito))
            )
            .andExpect(status().isBadRequest());

        // Validate the Debito in the database
        List<Debito> debitoList = debitoRepository.findAll();
        assertThat(debitoList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithIdMismatchDebito() throws Exception {
        int databaseSizeBeforeUpdate = debitoRepository.findAll().size();
        debito.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restDebitoMockMvc
            .perform(
                put(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(debito))
            )
            .andExpect(status().isBadRequest());

        // Validate the Debito in the database
        List<Debito> debitoList = debitoRepository.findAll();
        assertThat(debitoList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithMissingIdPathParamDebito() throws Exception {
        int databaseSizeBeforeUpdate = debitoRepository.findAll().size();
        debito.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restDebitoMockMvc
            .perform(put(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(debito)))
            .andExpect(status().isMethodNotAllowed());

        // Validate the Debito in the database
        List<Debito> debitoList = debitoRepository.findAll();
        assertThat(debitoList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void partialUpdateDebitoWithPatch() throws Exception {
        // Initialize the database
        debitoRepository.saveAndFlush(debito);

        int databaseSizeBeforeUpdate = debitoRepository.findAll().size();

        // Update the debito using partial update
        Debito partialUpdatedDebito = new Debito();
        partialUpdatedDebito.setId(debito.getId());

        partialUpdatedDebito
            .tipoDebito(UPDATED_TIPO_DEBITO)
            .dataPagamento(UPDATED_DATA_PAGAMENTO)
            .valorOriginal(UPDATED_VALOR_ORIGINAL)
            .totalDesconto(UPDATED_TOTAL_DESCONTO)
            .totalDevido(UPDATED_TOTAL_DEVIDO)
            .observacoes(UPDATED_OBSERVACOES);

        restDebitoMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedDebito.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedDebito))
            )
            .andExpect(status().isOk());

        // Validate the Debito in the database
        List<Debito> debitoList = debitoRepository.findAll();
        assertThat(debitoList).hasSize(databaseSizeBeforeUpdate);
        Debito testDebito = debitoList.get(debitoList.size() - 1);
        assertThat(testDebito.getTipoDebito()).isEqualTo(UPDATED_TIPO_DEBITO);
        assertThat(testDebito.getSituacaoDebito()).isEqualTo(DEFAULT_SITUACAO_DEBITO);
        assertThat(testDebito.getDataVencimento()).isEqualTo(DEFAULT_DATA_VENCIMENTO);
        assertThat(testDebito.getDataPagamento()).isEqualTo(UPDATED_DATA_PAGAMENTO);
        assertThat(testDebito.getValorOriginal()).isEqualByComparingTo(UPDATED_VALOR_ORIGINAL);
        assertThat(testDebito.getTotalPago()).isEqualByComparingTo(DEFAULT_TOTAL_PAGO);
        assertThat(testDebito.getTotalDesconto()).isEqualByComparingTo(UPDATED_TOTAL_DESCONTO);
        assertThat(testDebito.getTotalDevido()).isEqualByComparingTo(UPDATED_TOTAL_DEVIDO);
        assertThat(testDebito.getObservacoes()).isEqualTo(UPDATED_OBSERVACOES);
    }

    @Test
    @Transactional
    void fullUpdateDebitoWithPatch() throws Exception {
        // Initialize the database
        debitoRepository.saveAndFlush(debito);

        int databaseSizeBeforeUpdate = debitoRepository.findAll().size();

        // Update the debito using partial update
        Debito partialUpdatedDebito = new Debito();
        partialUpdatedDebito.setId(debito.getId());

        partialUpdatedDebito
            .tipoDebito(UPDATED_TIPO_DEBITO)
            .situacaoDebito(UPDATED_SITUACAO_DEBITO)
            .dataVencimento(UPDATED_DATA_VENCIMENTO)
            .dataPagamento(UPDATED_DATA_PAGAMENTO)
            .valorOriginal(UPDATED_VALOR_ORIGINAL)
            .totalPago(UPDATED_TOTAL_PAGO)
            .totalDesconto(UPDATED_TOTAL_DESCONTO)
            .totalDevido(UPDATED_TOTAL_DEVIDO)
            .observacoes(UPDATED_OBSERVACOES);

        restDebitoMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedDebito.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedDebito))
            )
            .andExpect(status().isOk());

        // Validate the Debito in the database
        List<Debito> debitoList = debitoRepository.findAll();
        assertThat(debitoList).hasSize(databaseSizeBeforeUpdate);
        Debito testDebito = debitoList.get(debitoList.size() - 1);
        assertThat(testDebito.getTipoDebito()).isEqualTo(UPDATED_TIPO_DEBITO);
        assertThat(testDebito.getSituacaoDebito()).isEqualTo(UPDATED_SITUACAO_DEBITO);
        assertThat(testDebito.getDataVencimento()).isEqualTo(UPDATED_DATA_VENCIMENTO);
        assertThat(testDebito.getDataPagamento()).isEqualTo(UPDATED_DATA_PAGAMENTO);
        assertThat(testDebito.getValorOriginal()).isEqualByComparingTo(UPDATED_VALOR_ORIGINAL);
        assertThat(testDebito.getTotalPago()).isEqualByComparingTo(UPDATED_TOTAL_PAGO);
        assertThat(testDebito.getTotalDesconto()).isEqualByComparingTo(UPDATED_TOTAL_DESCONTO);
        assertThat(testDebito.getTotalDevido()).isEqualByComparingTo(UPDATED_TOTAL_DEVIDO);
        assertThat(testDebito.getObservacoes()).isEqualTo(UPDATED_OBSERVACOES);
    }

    @Test
    @Transactional
    void patchNonExistingDebito() throws Exception {
        int databaseSizeBeforeUpdate = debitoRepository.findAll().size();
        debito.setId(count.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restDebitoMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, debito.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(debito))
            )
            .andExpect(status().isBadRequest());

        // Validate the Debito in the database
        List<Debito> debitoList = debitoRepository.findAll();
        assertThat(debitoList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithIdMismatchDebito() throws Exception {
        int databaseSizeBeforeUpdate = debitoRepository.findAll().size();
        debito.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restDebitoMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(debito))
            )
            .andExpect(status().isBadRequest());

        // Validate the Debito in the database
        List<Debito> debitoList = debitoRepository.findAll();
        assertThat(debitoList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithMissingIdPathParamDebito() throws Exception {
        int databaseSizeBeforeUpdate = debitoRepository.findAll().size();
        debito.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restDebitoMockMvc
            .perform(patch(ENTITY_API_URL).contentType("application/merge-patch+json").content(TestUtil.convertObjectToJsonBytes(debito)))
            .andExpect(status().isMethodNotAllowed());

        // Validate the Debito in the database
        List<Debito> debitoList = debitoRepository.findAll();
        assertThat(debitoList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void deleteDebito() throws Exception {
        // Initialize the database
        debitoRepository.saveAndFlush(debito);

        int databaseSizeBeforeDelete = debitoRepository.findAll().size();

        // Delete the debito
        restDebitoMockMvc
            .perform(delete(ENTITY_API_URL_ID, debito.getId()).accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Debito> debitoList = debitoRepository.findAll();
        assertThat(debitoList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
