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
