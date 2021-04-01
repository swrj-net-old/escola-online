package com.swrj.net.escolaonline.service;

import com.swrj.net.escolaonline.domain.Conteudo;
import com.swrj.net.escolaonline.repository.ConteudoRepository;
import java.util.Optional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * Service Implementation for managing {@link Conteudo}.
 */
@Service
@Transactional
public class ConteudoService {
    private final Logger log = LoggerFactory.getLogger(ConteudoService.class);

    private final ConteudoRepository conteudoRepository;

    public ConteudoService(ConteudoRepository conteudoRepository) {
        this.conteudoRepository = conteudoRepository;
    }

    /**
     * Save a conteudo.
     *
     * @param conteudo the entity to save.
     * @return the persisted entity.
     */
    public Conteudo save(Conteudo conteudo) {
        log.debug("Request to save Conteudo : {}", conteudo);
        return conteudoRepository.save(conteudo);
    }

    /**
     * Get all the conteudos.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    @Transactional(readOnly = true)
    public Page<Conteudo> findAll(Pageable pageable) {
        log.debug("Request to get all Conteudos");
        return conteudoRepository.findAll(pageable);
    }

    /**
     * Get one conteudo by id.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    @Transactional(readOnly = true)
    public Optional<Conteudo> findOne(Long id) {
        log.debug("Request to get Conteudo : {}", id);
        return conteudoRepository.findById(id);
    }

    /**
     * Delete the conteudo by id.
     *
     * @param id the id of the entity.
     */
    public void delete(Long id) {
        log.debug("Request to delete Conteudo : {}", id);
        conteudoRepository.deleteById(id);
    }
}
