package com.swrj.net.escolaonline.service;

import com.swrj.net.escolaonline.domain.Turma;
import com.swrj.net.escolaonline.repository.TurmaRepository;
import java.util.Optional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * Service Implementation for managing {@link Turma}.
 */
@Service
@Transactional
public class TurmaService {

    private final Logger log = LoggerFactory.getLogger(TurmaService.class);

    private final TurmaRepository turmaRepository;

    public TurmaService(TurmaRepository turmaRepository) {
        this.turmaRepository = turmaRepository;
    }

    /**
     * Save a turma.
     *
     * @param turma the entity to save.
     * @return the persisted entity.
     */
    public Turma save(Turma turma) {
        log.debug("Request to save Turma : {}", turma);
        return turmaRepository.save(turma);
    }

    /**
     * Partially update a turma.
     *
     * @param turma the entity to update partially.
     * @return the persisted entity.
     */
    public Optional<Turma> partialUpdate(Turma turma) {
        log.debug("Request to partially update Turma : {}", turma);

        return turmaRepository
            .findById(turma.getId())
            .map(
                existingTurma -> {
                    if (turma.getNome() != null) {
                        existingTurma.setNome(turma.getNome());
                    }

                    return existingTurma;
                }
            )
            .map(turmaRepository::save);
    }

    /**
     * Get all the turmas.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    @Transactional(readOnly = true)
    public Page<Turma> findAll(Pageable pageable) {
        log.debug("Request to get all Turmas");
        return turmaRepository.findAll(pageable);
    }

    /**
     * Get one turma by id.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    @Transactional(readOnly = true)
    public Optional<Turma> findOne(Long id) {
        log.debug("Request to get Turma : {}", id);
        return turmaRepository.findById(id);
    }

    /**
     * Delete the turma by id.
     *
     * @param id the id of the entity.
     */
    public void delete(Long id) {
        log.debug("Request to delete Turma : {}", id);
        turmaRepository.deleteById(id);
    }
}
