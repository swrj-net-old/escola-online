package com.swrj.net.escolaonline.web.rest;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import com.swrj.net.escolaonline.EscolaOnlineApp;
import com.swrj.net.escolaonline.domain.Debito;
import com.swrj.net.escolaonline.domain.enumeration.SituacaoDebito;
import com.swrj.net.escolaonline.domain.enumeration.TipoDebito;
import com.swrj.net.escolaonline.repository.DebitoRepository;
import com.swrj.net.escolaonline.service.DebitoService;
import java.math.BigDecimal;
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
 * Integration tests for the {@link DebitoResource} REST controller.
 */
@SpringBootTest(classes = EscolaOnlineApp.class)
@AutoConfigureMockMvc
@WithMockUser
public class DebitoResourceIT {
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

    @Autowired
    private DebitoRepository debitoRepository;

    @Autowired
    private DebitoService debitoService;

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
    public void createDebito() throws Exception {
        int databaseSizeBeforeCreate = debitoRepository.findAll().size();
        // Create the Debito
        restDebitoMockMvc
            .perform(post("/api/debitos").contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(debito)))
            .andExpect(status().isCreated());

        // Validate the Debito in the database
        List<Debito> debitoList = debitoRepository.findAll();
        assertThat(debitoList).hasSize(databaseSizeBeforeCreate + 1);
        Debito testDebito = debitoList.get(debitoList.size() - 1);
        assertThat(testDebito.getTipoDebito()).isEqualTo(DEFAULT_TIPO_DEBITO);
        assertThat(testDebito.getSituacaoDebito()).isEqualTo(DEFAULT_SITUACAO_DEBITO);
        assertThat(testDebito.getDataVencimento()).isEqualTo(DEFAULT_DATA_VENCIMENTO);
        assertThat(testDebito.getDataPagamento()).isEqualTo(DEFAULT_DATA_PAGAMENTO);
        assertThat(testDebito.getValorOriginal()).isEqualTo(DEFAULT_VALOR_ORIGINAL);
        assertThat(testDebito.getTotalPago()).isEqualTo(DEFAULT_TOTAL_PAGO);
        assertThat(testDebito.getTotalDesconto()).isEqualTo(DEFAULT_TOTAL_DESCONTO);
        assertThat(testDebito.getTotalDevido()).isEqualTo(DEFAULT_TOTAL_DEVIDO);
        assertThat(testDebito.getObservacoes()).isEqualTo(DEFAULT_OBSERVACOES);
    }

    @Test
    @Transactional
    public void createDebitoWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = debitoRepository.findAll().size();

        // Create the Debito with an existing ID
        debito.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restDebitoMockMvc
            .perform(post("/api/debitos").contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(debito)))
            .andExpect(status().isBadRequest());

        // Validate the Debito in the database
        List<Debito> debitoList = debitoRepository.findAll();
        assertThat(debitoList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllDebitos() throws Exception {
        // Initialize the database
        debitoRepository.saveAndFlush(debito);

        // Get all the debitoList
        restDebitoMockMvc
            .perform(get("/api/debitos?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(debito.getId().intValue())))
            .andExpect(jsonPath("$.[*].tipoDebito").value(hasItem(DEFAULT_TIPO_DEBITO.toString())))
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
    public void getDebito() throws Exception {
        // Initialize the database
        debitoRepository.saveAndFlush(debito);

        // Get the debito
        restDebitoMockMvc
            .perform(get("/api/debitos/{id}", debito.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(debito.getId().intValue()))
            .andExpect(jsonPath("$.tipoDebito").value(DEFAULT_TIPO_DEBITO.toString()))
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
    public void getNonExistingDebito() throws Exception {
        // Get the debito
        restDebitoMockMvc.perform(get("/api/debitos/{id}", Long.MAX_VALUE)).andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateDebito() throws Exception {
        // Initialize the database
        debitoService.save(debito);

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
            .perform(put("/api/debitos").contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(updatedDebito)))
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
    public void updateNonExistingDebito() throws Exception {
        int databaseSizeBeforeUpdate = debitoRepository.findAll().size();

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restDebitoMockMvc
            .perform(put("/api/debitos").contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(debito)))
            .andExpect(status().isBadRequest());

        // Validate the Debito in the database
        List<Debito> debitoList = debitoRepository.findAll();
        assertThat(debitoList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteDebito() throws Exception {
        // Initialize the database
        debitoService.save(debito);

        int databaseSizeBeforeDelete = debitoRepository.findAll().size();

        // Delete the debito
        restDebitoMockMvc
            .perform(delete("/api/debitos/{id}", debito.getId()).accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Debito> debitoList = debitoRepository.findAll();
        assertThat(debitoList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
