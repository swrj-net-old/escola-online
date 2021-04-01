package com.swrj.net.escolaonline.service;

import com.swrj.net.escolaonline.domain.Serie;
import com.swrj.net.escolaonline.repository.SerieRepository;
import java.util.Optional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * Service Implementation for managing {@link Serie}.
 */
@Service
@Transactional
public class SerieService {
    private final Logger log = LoggerFactory.getLogger(SerieService.class);

    private final SerieRepository serieRepository;

    public SerieService(SerieRepository serieRepository) {
        this.serieRepository = serieRepository;
    }

    /**
     * Save a serie.
     *
     * @param serie the entity to save.
     * @return the persisted entity.
     */
    public Serie save(Serie serie) {
        log.debug("Request to save Serie : {}", serie);
        return serieRepository.save(serie);
    }

    /**
     * Get all the series.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    @Transactional(readOnly = true)
    public Page<Serie> findAll(Pageable pageable) {
        log.debug("Request to get all Series");
        return serieRepository.findAll(pageable);
    }

    /**
     * Get one serie by id.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    @Transactional(readOnly = true)
    public Optional<Serie> findOne(Long id) {
        log.debug("Request to get Serie : {}", id);
        return serieRepository.findById(id);
    }

    /**
     * Delete the serie by id.
     *
     * @param id the id of the entity.
     */
    public void delete(Long id) {
        log.debug("Request to delete Serie : {}", id);
        serieRepository.deleteById(id);
    }
}
