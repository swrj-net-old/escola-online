package com.swrj.net.escolaonline.service;

import com.swrj.net.escolaonline.domain.HistoricoDebito;
import com.swrj.net.escolaonline.repository.HistoricoDebitoRepository;
import java.util.Optional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * Service Implementation for managing {@link HistoricoDebito}.
 */
@Service
@Transactional
public class HistoricoDebitoService {

    private final Logger log = LoggerFactory.getLogger(HistoricoDebitoService.class);

    private final HistoricoDebitoRepository historicoDebitoRepository;

    public HistoricoDebitoService(HistoricoDebitoRepository historicoDebitoRepository) {
        this.historicoDebitoRepository = historicoDebitoRepository;
    }

    /**
     * Save a historicoDebito.
     *
     * @param historicoDebito the entity to save.
     * @return the persisted entity.
     */
    public HistoricoDebito save(HistoricoDebito historicoDebito) {
        log.debug("Request to save HistoricoDebito : {}", historicoDebito);
        return historicoDebitoRepository.save(historicoDebito);
    }

    /**
     * Partially update a historicoDebito.
     *
     * @param historicoDebito the entity to update partially.
     * @return the persisted entity.
     */
    public Optional<HistoricoDebito> partialUpdate(HistoricoDebito historicoDebito) {
        log.debug("Request to partially update HistoricoDebito : {}", historicoDebito);

        return historicoDebitoRepository
            .findById(historicoDebito.getId())
            .map(
                existingHistoricoDebito -> {
                    if (historicoDebito.getDataLancamento() != null) {
                        existingHistoricoDebito.setDataLancamento(historicoDebito.getDataLancamento());
                    }
                    if (historicoDebito.getSituacaoDebito() != null) {
                        existingHistoricoDebito.setSituacaoDebito(historicoDebito.getSituacaoDebito());
                    }
                    if (historicoDebito.getDataVencimento() != null) {
                        existingHistoricoDebito.setDataVencimento(historicoDebito.getDataVencimento());
                    }
                    if (historicoDebito.getDataPagamento() != null) {
                        existingHistoricoDebito.setDataPagamento(historicoDebito.getDataPagamento());
                    }
                    if (historicoDebito.getValorOriginal() != null) {
                        existingHistoricoDebito.setValorOriginal(historicoDebito.getValorOriginal());
                    }
                    if (historicoDebito.getTotalPago() != null) {
                        existingHistoricoDebito.setTotalPago(historicoDebito.getTotalPago());
                    }
                    if (historicoDebito.getTotalDesconto() != null) {
                        existingHistoricoDebito.setTotalDesconto(historicoDebito.getTotalDesconto());
                    }
                    if (historicoDebito.getTotalDevido() != null) {
                        existingHistoricoDebito.setTotalDevido(historicoDebito.getTotalDevido());
                    }
                    if (historicoDebito.getObservacoes() != null) {
                        existingHistoricoDebito.setObservacoes(historicoDebito.getObservacoes());
                    }

                    return existingHistoricoDebito;
                }
            )
            .map(historicoDebitoRepository::save);
    }

    /**
     * Get all the historicoDebitos.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    @Transactional(readOnly = true)
    public Page<HistoricoDebito> findAll(Pageable pageable) {
        log.debug("Request to get all HistoricoDebitos");
        return historicoDebitoRepository.findAll(pageable);
    }

    /**
     * Get one historicoDebito by id.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    @Transactional(readOnly = true)
    public Optional<HistoricoDebito> findOne(Long id) {
        log.debug("Request to get HistoricoDebito : {}", id);
        return historicoDebitoRepository.findById(id);
    }

    /**
     * Delete the historicoDebito by id.
     *
     * @param id the id of the entity.
     */
    public void delete(Long id) {
        log.debug("Request to delete HistoricoDebito : {}", id);
        historicoDebitoRepository.deleteById(id);
    }
}
