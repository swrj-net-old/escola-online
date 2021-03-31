package com.swrj.net.escolaonline.service;

import com.swrj.net.escolaonline.domain.Debito;
import com.swrj.net.escolaonline.repository.DebitoRepository;
import java.util.Optional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * Service Implementation for managing {@link Debito}.
 */
@Service
@Transactional
public class DebitoService {

    private final Logger log = LoggerFactory.getLogger(DebitoService.class);

    private final DebitoRepository debitoRepository;

    public DebitoService(DebitoRepository debitoRepository) {
        this.debitoRepository = debitoRepository;
    }

    /**
     * Save a debito.
     *
     * @param debito the entity to save.
     * @return the persisted entity.
     */
    public Debito save(Debito debito) {
        log.debug("Request to save Debito : {}", debito);
        return debitoRepository.save(debito);
    }

    /**
     * Partially update a debito.
     *
     * @param debito the entity to update partially.
     * @return the persisted entity.
     */
    public Optional<Debito> partialUpdate(Debito debito) {
        log.debug("Request to partially update Debito : {}", debito);

        return debitoRepository
            .findById(debito.getId())
            .map(
                existingDebito -> {
                    if (debito.getTipoDebito() != null) {
                        existingDebito.setTipoDebito(debito.getTipoDebito());
                    }
                    if (debito.getSituacaoDebito() != null) {
                        existingDebito.setSituacaoDebito(debito.getSituacaoDebito());
                    }
                    if (debito.getDataVencimento() != null) {
                        existingDebito.setDataVencimento(debito.getDataVencimento());
                    }
                    if (debito.getDataPagamento() != null) {
                        existingDebito.setDataPagamento(debito.getDataPagamento());
                    }
                    if (debito.getValorOriginal() != null) {
                        existingDebito.setValorOriginal(debito.getValorOriginal());
                    }
                    if (debito.getTotalPago() != null) {
                        existingDebito.setTotalPago(debito.getTotalPago());
                    }
                    if (debito.getTotalDesconto() != null) {
                        existingDebito.setTotalDesconto(debito.getTotalDesconto());
                    }
                    if (debito.getTotalDevido() != null) {
                        existingDebito.setTotalDevido(debito.getTotalDevido());
                    }
                    if (debito.getObservacoes() != null) {
                        existingDebito.setObservacoes(debito.getObservacoes());
                    }

                    return existingDebito;
                }
            )
            .map(debitoRepository::save);
    }

    /**
     * Get all the debitos.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    @Transactional(readOnly = true)
    public Page<Debito> findAll(Pageable pageable) {
        log.debug("Request to get all Debitos");
        return debitoRepository.findAll(pageable);
    }

    /**
     * Get one debito by id.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    @Transactional(readOnly = true)
    public Optional<Debito> findOne(Long id) {
        log.debug("Request to get Debito : {}", id);
        return debitoRepository.findById(id);
    }

    /**
     * Delete the debito by id.
     *
     * @param id the id of the entity.
     */
    public void delete(Long id) {
        log.debug("Request to delete Debito : {}", id);
        debitoRepository.deleteById(id);
    }
}
