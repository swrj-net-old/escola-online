package com.swrj.net.escolaonline.service;

import com.swrj.net.escolaonline.domain.Professor;
import com.swrj.net.escolaonline.repository.ProfessorRepository;
import java.util.Optional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * Service Implementation for managing {@link Professor}.
 */
@Service
@Transactional
public class ProfessorService {
    private final Logger log = LoggerFactory.getLogger(ProfessorService.class);

    private final ProfessorRepository professorRepository;

    public ProfessorService(ProfessorRepository professorRepository) {
        this.professorRepository = professorRepository;
    }

    /**
     * Save a professor.
     *
     * @param professor the entity to save.
     * @return the persisted entity.
     */
    public Professor save(Professor professor) {
        log.debug("Request to save Professor : {}", professor);
        return professorRepository.save(professor);
    }

    /**
     * Get all the professors.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    @Transactional(readOnly = true)
    public Page<Professor> findAll(Pageable pageable) {
        log.debug("Request to get all Professors");
        return professorRepository.findAll(pageable);
    }

    /**
     * Get one professor by id.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    @Transactional(readOnly = true)
    public Optional<Professor> findOne(Long id) {
        log.debug("Request to get Professor : {}", id);
        return professorRepository.findById(id);
    }

    /**
     * Delete the professor by id.
     *
     * @param id the id of the entity.
     */
    public void delete(Long id) {
        log.debug("Request to delete Professor : {}", id);
        professorRepository.deleteById(id);
    }
}
