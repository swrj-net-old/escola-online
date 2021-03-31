package com.swrj.net.escolaonline.service;

import com.swrj.net.escolaonline.domain.Materia;
import com.swrj.net.escolaonline.repository.MateriaRepository;
import java.util.Optional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * Service Implementation for managing {@link Materia}.
 */
@Service
@Transactional
public class MateriaService {

    private final Logger log = LoggerFactory.getLogger(MateriaService.class);

    private final MateriaRepository materiaRepository;

    public MateriaService(MateriaRepository materiaRepository) {
        this.materiaRepository = materiaRepository;
    }

    /**
     * Save a materia.
     *
     * @param materia the entity to save.
     * @return the persisted entity.
     */
    public Materia save(Materia materia) {
        log.debug("Request to save Materia : {}", materia);
        return materiaRepository.save(materia);
    }

    /**
     * Partially update a materia.
     *
     * @param materia the entity to update partially.
     * @return the persisted entity.
     */
    public Optional<Materia> partialUpdate(Materia materia) {
        log.debug("Request to partially update Materia : {}", materia);

        return materiaRepository
            .findById(materia.getId())
            .map(
                existingMateria -> {
                    if (materia.getNome() != null) {
                        existingMateria.setNome(materia.getNome());
                    }
                    if (materia.getSigla() != null) {
                        existingMateria.setSigla(materia.getSigla());
                    }

                    return existingMateria;
                }
            )
            .map(materiaRepository::save);
    }

    /**
     * Get all the materias.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    @Transactional(readOnly = true)
    public Page<Materia> findAll(Pageable pageable) {
        log.debug("Request to get all Materias");
        return materiaRepository.findAll(pageable);
    }

    /**
     * Get one materia by id.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    @Transactional(readOnly = true)
    public Optional<Materia> findOne(Long id) {
        log.debug("Request to get Materia : {}", id);
        return materiaRepository.findById(id);
    }

    /**
     * Delete the materia by id.
     *
     * @param id the id of the entity.
     */
    public void delete(Long id) {
        log.debug("Request to delete Materia : {}", id);
        materiaRepository.deleteById(id);
    }
}
