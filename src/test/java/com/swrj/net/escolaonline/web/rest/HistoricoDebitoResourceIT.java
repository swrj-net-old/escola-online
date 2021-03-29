package com.swrj.net.escolaonline.web.rest;

import com.swrj.net.escolaonline.EscolaOnlineApp;
import com.swrj.net.escolaonline.domain.HistoricoDebito;
import com.swrj.net.escolaonline.repository.HistoricoDebitoRepository;

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
import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.ZoneId;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import com.swrj.net.escolaonline.domain.enumeration.SituacaoDebito;
/**
 * Integration tests for the {@link HistoricoDebitoResource} REST controller.
 */
@SpringBootTest(classes = EscolaOnlineApp.class)
@AutoConfigureMockMvc
@WithMockUser
public class HistoricoDebitoResourceIT {

    private static final LocalDate DEFAULT_DATA_LANCAMENTO = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_DATA_LANCAMENTO = LocalDate.now(ZoneId.systemDefault());

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

    @Autowired
    private HistoricoDebitoRepository historicoDebitoRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restHistoricoDebitoMockMvc;

    private HistoricoDebito historicoDebito;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static HistoricoDebito createEntity(EntityManager em) {
        HistoricoDebito historicoDebito = new HistoricoDebito()
            .dataLancamento(DEFAULT_DATA_LANCAMENTO)
            .situacaoDebito(DEFAULT_SITUACAO_DEBITO)
            .dataVencimento(DEFAULT_DATA_VENCIMENTO)
            .dataPagamento(DEFAULT_DATA_PAGAMENTO)
            .valorOriginal(DEFAULT_VALOR_ORIGINAL)
            .totalPago(DEFAULT_TOTAL_PAGO)
            .totalDesconto(DEFAULT_TOTAL_DESCONTO)
            .totalDevido(DEFAULT_TOTAL_DEVIDO)
            .observacoes(DEFAULT_OBSERVACOES);
        return historicoDebito;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static HistoricoDebito createUpdatedEntity(EntityManager em) {
        HistoricoDebito historicoDebito = new HistoricoDebito()
            .dataLancamento(UPDATED_DATA_LANCAMENTO)
            .situacaoDebito(UPDATED_SITUACAO_DEBITO)
            .dataVencimento(UPDATED_DATA_VENCIMENTO)
            .dataPagamento(UPDATED_DATA_PAGAMENTO)
            .valorOriginal(UPDATED_VALOR_ORIGINAL)
            .totalPago(UPDATED_TOTAL_PAGO)
            .totalDesconto(UPDATED_TOTAL_DESCONTO)
            .totalDevido(UPDATED_TOTAL_DEVIDO)
            .observacoes(UPDATED_OBSERVACOES);
        return historicoDebito;
    }

    @BeforeEach
    public void initTest() {
        historicoDebito = createEntity(em);
    }

    @Test
    @Transactional
    public void createHistoricoDebito() throws Exception {
        int databaseSizeBeforeCreate = historicoDebitoRepository.findAll().size();
        // Create the HistoricoDebito
        restHistoricoDebitoMockMvc.perform(post("/api/historico-debitos")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(historicoDebito)))
            .andExpect(status().isCreated());

        // Validate the HistoricoDebito in the database
        List<HistoricoDebito> historicoDebitoList = historicoDebitoRepository.findAll();
        assertThat(historicoDebitoList).hasSize(databaseSizeBeforeCreate + 1);
        HistoricoDebito testHistoricoDebito = historicoDebitoList.get(historicoDebitoList.size() - 1);
        assertThat(testHistoricoDebito.getDataLancamento()).isEqualTo(DEFAULT_DATA_LANCAMENTO);
        assertThat(testHistoricoDebito.getSituacaoDebito()).isEqualTo(DEFAULT_SITUACAO_DEBITO);
        assertThat(testHistoricoDebito.getDataVencimento()).isEqualTo(DEFAULT_DATA_VENCIMENTO);
        assertThat(testHistoricoDebito.getDataPagamento()).isEqualTo(DEFAULT_DATA_PAGAMENTO);
        assertThat(testHistoricoDebito.getValorOriginal()).isEqualTo(DEFAULT_VALOR_ORIGINAL);
        assertThat(testHistoricoDebito.getTotalPago()).isEqualTo(DEFAULT_TOTAL_PAGO);
        assertThat(testHistoricoDebito.getTotalDesconto()).isEqualTo(DEFAULT_TOTAL_DESCONTO);
        assertThat(testHistoricoDebito.getTotalDevido()).isEqualTo(DEFAULT_TOTAL_DEVIDO);
        assertThat(testHistoricoDebito.getObservacoes()).isEqualTo(DEFAULT_OBSERVACOES);
    }

    @Test
    @Transactional
    public void createHistoricoDebitoWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = historicoDebitoRepository.findAll().size();

        // Create the HistoricoDebito with an existing ID
        historicoDebito.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restHistoricoDebitoMockMvc.perform(post("/api/historico-debitos")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(historicoDebito)))
            .andExpect(status().isBadRequest());

        // Validate the HistoricoDebito in the database
        List<HistoricoDebito> historicoDebitoList = historicoDebitoRepository.findAll();
        assertThat(historicoDebitoList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllHistoricoDebitos() throws Exception {
        // Initialize the database
        historicoDebitoRepository.saveAndFlush(historicoDebito);

        // Get all the historicoDebitoList
        restHistoricoDebitoMockMvc.perform(get("/api/historico-debitos?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(historicoDebito.getId().intValue())))
            .andExpect(jsonPath("$.[*].dataLancamento").value(hasItem(DEFAULT_DATA_LANCAMENTO.toString())))
            .andExpect(jsonPath("$.[*].situacaoDebito").value(hasItem(DEFAULT_SITUACAO_DEBITO.toString())))
            .andExpect(jsonPath("$.[*].dataVencimento").value(hasItem(DEFAULT_DATA_VENCIMENTO.toString())))
            .andExpect(jsonPath("$.[*].dataPagamento").value(hasItem(DEFAULT_DATA_PAGAMENTO.toString())))
            .andExpect(jsonPath("$.[*].valorOriginal").value(hasItem(DEFAULT_VALOR_ORIGINAL.intValue())))
            .andExpect(jsonPath("$.[*].totalPago").value(hasItem(DEFAULT_TOTAL_PAGO.intValue())))
            .andExpect(jsonPath("$.[*].totalDesconto").value(hasItem(DEFAULT_TOTAL_DESCONTO.intValue())))
            .andExpect(jsonPath("$.[*].totalDevido").value(hasItem(DEFAULT_TOTAL_DEVIDO.intValue())))
            .andExpect(jsonPath("$.[*].observacoes").value(hasItem(DEFAULT_OBSERVACOES)));
    }
    
    @Test
    @Transactional
    public void getHistoricoDebito() throws Exception {
        // Initialize the database
        historicoDebitoRepository.saveAndFlush(historicoDebito);

        // Get the historicoDebito
        restHistoricoDebitoMockMvc.perform(get("/api/historico-debitos/{id}", historicoDebito.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(historicoDebito.getId().intValue()))
            .andExpect(jsonPath("$.dataLancamento").value(DEFAULT_DATA_LANCAMENTO.toString()))
            .andExpect(jsonPath("$.situacaoDebito").value(DEFAULT_SITUACAO_DEBITO.toString()))
            .andExpect(jsonPath("$.dataVencimento").value(DEFAULT_DATA_VENCIMENTO.toString()))
            .andExpect(jsonPath("$.dataPagamento").value(DEFAULT_DATA_PAGAMENTO.toString()))
            .andExpect(jsonPath("$.valorOriginal").value(DEFAULT_VALOR_ORIGINAL.intValue()))
            .andExpect(jsonPath("$.totalPago").value(DEFAULT_TOTAL_PAGO.intValue()))
            .andExpect(jsonPath("$.totalDesconto").value(DEFAULT_TOTAL_DESCONTO.intValue()))
            .andExpect(jsonPath("$.totalDevido").value(DEFAULT_TOTAL_DEVIDO.intValue()))
            .andExpect(jsonPath("$.observacoes").value(DEFAULT_OBSERVACOES));
    }
    @Test
    @Transactional
    public void getNonExistingHistoricoDebito() throws Exception {
        // Get the historicoDebito
        restHistoricoDebitoMockMvc.perform(get("/api/historico-debitos/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateHistoricoDebito() throws Exception {
        // Initialize the database
        historicoDebitoRepository.saveAndFlush(historicoDebito);

        int databaseSizeBeforeUpdate = historicoDebitoRepository.findAll().size();

        // Update the historicoDebito
        HistoricoDebito updatedHistoricoDebito = historicoDebitoRepository.findById(historicoDebito.getId()).get();
        // Disconnect from session so that the updates on updatedHistoricoDebito are not directly saved in db
        em.detach(updatedHistoricoDebito);
        updatedHistoricoDebito
            .dataLancamento(UPDATED_DATA_LANCAMENTO)
            .situacaoDebito(UPDATED_SITUACAO_DEBITO)
            .dataVencimento(UPDATED_DATA_VENCIMENTO)
            .dataPagamento(UPDATED_DATA_PAGAMENTO)
            .valorOriginal(UPDATED_VALOR_ORIGINAL)
            .totalPago(UPDATED_TOTAL_PAGO)
            .totalDesconto(UPDATED_TOTAL_DESCONTO)
            .totalDevido(UPDATED_TOTAL_DEVIDO)
            .observacoes(UPDATED_OBSERVACOES);

        restHistoricoDebitoMockMvc.perform(put("/api/historico-debitos")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(updatedHistoricoDebito)))
            .andExpect(status().isOk());

        // Validate the HistoricoDebito in the database
        List<HistoricoDebito> historicoDebitoList = historicoDebitoRepository.findAll();
        assertThat(historicoDebitoList).hasSize(databaseSizeBeforeUpdate);
        HistoricoDebito testHistoricoDebito = historicoDebitoList.get(historicoDebitoList.size() - 1);
        assertThat(testHistoricoDebito.getDataLancamento()).isEqualTo(UPDATED_DATA_LANCAMENTO);
        assertThat(testHistoricoDebito.getSituacaoDebito()).isEqualTo(UPDATED_SITUACAO_DEBITO);
        assertThat(testHistoricoDebito.getDataVencimento()).isEqualTo(UPDATED_DATA_VENCIMENTO);
        assertThat(testHistoricoDebito.getDataPagamento()).isEqualTo(UPDATED_DATA_PAGAMENTO);
        assertThat(testHistoricoDebito.getValorOriginal()).isEqualTo(UPDATED_VALOR_ORIGINAL);
        assertThat(testHistoricoDebito.getTotalPago()).isEqualTo(UPDATED_TOTAL_PAGO);
        assertThat(testHistoricoDebito.getTotalDesconto()).isEqualTo(UPDATED_TOTAL_DESCONTO);
        assertThat(testHistoricoDebito.getTotalDevido()).isEqualTo(UPDATED_TOTAL_DEVIDO);
        assertThat(testHistoricoDebito.getObservacoes()).isEqualTo(UPDATED_OBSERVACOES);
    }

    @Test
    @Transactional
    public void updateNonExistingHistoricoDebito() throws Exception {
        int databaseSizeBeforeUpdate = historicoDebitoRepository.findAll().size();

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restHistoricoDebitoMockMvc.perform(put("/api/historico-debitos")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(historicoDebito)))
            .andExpect(status().isBadRequest());

        // Validate the HistoricoDebito in the database
        List<HistoricoDebito> historicoDebitoList = historicoDebitoRepository.findAll();
        assertThat(historicoDebitoList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteHistoricoDebito() throws Exception {
        // Initialize the database
        historicoDebitoRepository.saveAndFlush(historicoDebito);

        int databaseSizeBeforeDelete = historicoDebitoRepository.findAll().size();

        // Delete the historicoDebito
        restHistoricoDebitoMockMvc.perform(delete("/api/historico-debitos/{id}", historicoDebito.getId())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<HistoricoDebito> historicoDebitoList = historicoDebitoRepository.findAll();
        assertThat(historicoDebitoList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
