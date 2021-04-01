package com.swrj.net.escolaonline.service;

import com.swrj.net.escolaonline.domain.Chamada;
import com.swrj.net.escolaonline.repository.ChamadaRepository;
import java.util.Optional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * Service Implementation for managing {@link Chamada}.
 */
@Service
@Transactional
public class ChamadaService {
    private final Logger log = LoggerFactory.getLogger(ChamadaService.class);

    private final ChamadaRepository chamadaRepository;

    public ChamadaService(ChamadaRepository chamadaRepository) {
        this.chamadaRepository = chamadaRepository;
    }

    /**
     * Save a chamada.
     *
     * @param chamada the entity to save.
     * @return the persisted entity.
     */
    public Chamada save(Chamada chamada) {
        log.debug("Request to save Chamada : {}", chamada);
        return chamadaRepository.save(chamada);
    }

    /**
     * Get all the chamadas.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    @Transactional(readOnly = true)
    public Page<Chamada> findAll(Pageable pageable) {
        log.debug("Request to get all Chamadas");
        return chamadaRepository.findAll(pageable);
    }

    /**
     * Get one chamada by id.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    @Transactional(readOnly = true)
    public Optional<Chamada> findOne(Long id) {
        log.debug("Request to get Chamada : {}", id);
        return chamadaRepository.findById(id);
    }

    /**
     * Delete the chamada by id.
     *
     * @param id the id of the entity.
     */
    public void delete(Long id) {
        log.debug("Request to delete Chamada : {}", id);
        chamadaRepository.deleteById(id);
    }
}
