package com.swrj.net.escolaonline.service;

import com.swrj.net.escolaonline.domain.Aluno;
import com.swrj.net.escolaonline.repository.AlunoRepository;
import java.util.Optional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * Service Implementation for managing {@link Aluno}.
 */
@Service
@Transactional
public class AlunoService {
    private final Logger log = LoggerFactory.getLogger(AlunoService.class);

    private final AlunoRepository alunoRepository;

    public AlunoService(AlunoRepository alunoRepository) {
        this.alunoRepository = alunoRepository;
    }

    /**
     * Save a aluno.
     *
     * @param aluno the entity to save.
     * @return the persisted entity.
     */
    public Aluno save(Aluno aluno) {
        log.debug("Request to save Aluno : {}", aluno);
        return alunoRepository.save(aluno);
    }

    /**
     * Get all the alunos.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    @Transactional(readOnly = true)
    public Page<Aluno> findAll(Pageable pageable) {
        log.debug("Request to get all Alunos");
        return alunoRepository.findAll(pageable);
    }

    /**
     * Get one aluno by id.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    @Transactional(readOnly = true)
    public Optional<Aluno> findOne(Long id) {
        log.debug("Request to get Aluno : {}", id);
        return alunoRepository.findById(id);
    }

    /**
     * Delete the aluno by id.
     *
     * @param id the id of the entity.
     */
    public void delete(Long id) {
        log.debug("Request to delete Aluno : {}", id);
        alunoRepository.deleteById(id);
    }
}
