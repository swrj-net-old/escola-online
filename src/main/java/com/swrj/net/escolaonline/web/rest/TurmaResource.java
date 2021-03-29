package com.swrj.net.escolaonline.web.rest;

import com.swrj.net.escolaonline.domain.Turma;
import com.swrj.net.escolaonline.repository.TurmaRepository;
import com.swrj.net.escolaonline.web.rest.errors.BadRequestAlertException;

import io.github.jhipster.web.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing {@link com.swrj.net.escolaonline.domain.Turma}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class TurmaResource {

    private final Logger log = LoggerFactory.getLogger(TurmaResource.class);

    private static final String ENTITY_NAME = "turma";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final TurmaRepository turmaRepository;

    public TurmaResource(TurmaRepository turmaRepository) {
        this.turmaRepository = turmaRepository;
    }

    /**
     * {@code POST  /turmas} : Create a new turma.
     *
     * @param turma the turma to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new turma, or with status {@code 400 (Bad Request)} if the turma has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/turmas")
    public ResponseEntity<Turma> createTurma(@RequestBody Turma turma) throws URISyntaxException {
        log.debug("REST request to save Turma : {}", turma);
        if (turma.getId() != null) {
            throw new BadRequestAlertException("A new turma cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Turma result = turmaRepository.save(turma);
        return ResponseEntity.created(new URI("/api/turmas/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /turmas} : Updates an existing turma.
     *
     * @param turma the turma to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated turma,
     * or with status {@code 400 (Bad Request)} if the turma is not valid,
     * or with status {@code 500 (Internal Server Error)} if the turma couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/turmas")
    public ResponseEntity<Turma> updateTurma(@RequestBody Turma turma) throws URISyntaxException {
        log.debug("REST request to update Turma : {}", turma);
        if (turma.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Turma result = turmaRepository.save(turma);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, turma.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /turmas} : get all the turmas.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of turmas in body.
     */
    @GetMapping("/turmas")
    public List<Turma> getAllTurmas() {
        log.debug("REST request to get all Turmas");
        return turmaRepository.findAll();
    }

    /**
     * {@code GET  /turmas/:id} : get the "id" turma.
     *
     * @param id the id of the turma to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the turma, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/turmas/{id}")
    public ResponseEntity<Turma> getTurma(@PathVariable Long id) {
        log.debug("REST request to get Turma : {}", id);
        Optional<Turma> turma = turmaRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(turma);
    }

    /**
     * {@code DELETE  /turmas/:id} : delete the "id" turma.
     *
     * @param id the id of the turma to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/turmas/{id}")
    public ResponseEntity<Void> deleteTurma(@PathVariable Long id) {
        log.debug("REST request to delete Turma : {}", id);
        turmaRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}