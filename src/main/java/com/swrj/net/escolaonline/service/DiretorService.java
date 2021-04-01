package com.swrj.net.escolaonline.service;

import com.swrj.net.escolaonline.domain.Diretor;
import com.swrj.net.escolaonline.repository.DiretorRepository;
import java.util.Optional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * Service Implementation for managing {@link Diretor}.
 */
@Service
@Transactional
public class DiretorService {
    private final Logger log = LoggerFactory.getLogger(DiretorService.class);

    private final DiretorRepository diretorRepository;

    public DiretorService(DiretorRepository diretorRepository) {
        this.diretorRepository = diretorRepository;
    }

    /**
     * Save a diretor.
     *
     * @param diretor the entity to save.
     * @return the persisted entity.
     */
    public Diretor save(Diretor diretor) {
        log.debug("Request to save Diretor : {}", diretor);
        return diretorRepository.save(diretor);
    }

    /**
     * Get all the diretors.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    @Transactional(readOnly = true)
    public Page<Diretor> findAll(Pageable pageable) {
        log.debug("Request to get all Diretors");
        return diretorRepository.findAll(pageable);
    }

    /**
     * Get one diretor by id.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    @Transactional(readOnly = true)
    public Optional<Diretor> findOne(Long id) {
        log.debug("Request to get Diretor : {}", id);
        return diretorRepository.findById(id);
    }

    /**
     * Delete the diretor by id.
     *
     * @param id the id of the entity.
     */
    public void delete(Long id) {
        log.debug("Request to delete Diretor : {}", id);
        diretorRepository.deleteById(id);
    }
}
