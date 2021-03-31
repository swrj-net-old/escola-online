package com.swrj.net.escolaonline.service;

import com.swrj.net.escolaonline.domain.Matricula;
import com.swrj.net.escolaonline.repository.MatriculaRepository;
import java.util.Optional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * Service Implementation for managing {@link Matricula}.
 */
@Service
@Transactional
public class MatriculaService {

    private final Logger log = LoggerFactory.getLogger(MatriculaService.class);

    private final MatriculaRepository matriculaRepository;

    public MatriculaService(MatriculaRepository matriculaRepository) {
        this.matriculaRepository = matriculaRepository;
    }

    /**
     * Save a matricula.
     *
     * @param matricula the entity to save.
     * @return the persisted entity.
     */
    public Matricula save(Matricula matricula) {
        log.debug("Request to save Matricula : {}", matricula);
        return matriculaRepository.save(matricula);
    }

    /**
     * Partially update a matricula.
     *
     * @param matricula the entity to update partially.
     * @return the persisted entity.
     */
    public Optional<Matricula> partialUpdate(Matricula matricula) {
        log.debug("Request to partially update Matricula : {}", matricula);

        return matriculaRepository
            .findById(matricula.getId())
            .map(
                existingMatricula -> {
                    if (matricula.getAnoLetivo() != null) {
                        existingMatricula.setAnoLetivo(matricula.getAnoLetivo());
                    }
                    if (matricula.getDataInicio() != null) {
                        existingMatricula.setDataInicio(matricula.getDataInicio());
                    }
                    if (matricula.getDataFim() != null) {
                        existingMatricula.setDataFim(matricula.getDataFim());
                    }

                    return existingMatricula;
                }
            )
            .map(matriculaRepository::save);
    }

    /**
     * Get all the matriculas.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    @Transactional(readOnly = true)
    public Page<Matricula> findAll(Pageable pageable) {
        log.debug("Request to get all Matriculas");
        return matriculaRepository.findAll(pageable);
    }

    /**
     * Get one matricula by id.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    @Transactional(readOnly = true)
    public Optional<Matricula> findOne(Long id) {
        log.debug("Request to get Matricula : {}", id);
        return matriculaRepository.findById(id);
    }

    /**
     * Delete the matricula by id.
     *
     * @param id the id of the entity.
     */
    public void delete(Long id) {
        log.debug("Request to delete Matricula : {}", id);
        matriculaRepository.deleteById(id);
    }
}
