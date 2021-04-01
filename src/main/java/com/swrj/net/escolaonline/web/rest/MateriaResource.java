package com.swrj.net.escolaonline.web.rest;

import com.swrj.net.escolaonline.domain.Materia;
import com.swrj.net.escolaonline.repository.MateriaRepository;
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
 * REST controller for managing {@link com.swrj.net.escolaonline.domain.Materia}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class MateriaResource {

    private final Logger log = LoggerFactory.getLogger(MateriaResource.class);

    private static final String ENTITY_NAME = "materia";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final MateriaRepository materiaRepository;

    public MateriaResource(MateriaRepository materiaRepository) {
        this.materiaRepository = materiaRepository;
    }

    /**
     * {@code POST  /materias} : Create a new materia.
     *
     * @param materia the materia to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new materia, or with status {@code 400 (Bad Request)} if the materia has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/materias")
    public ResponseEntity<Materia> createMateria(@RequestBody Materia materia) throws URISyntaxException {
        log.debug("REST request to save Materia : {}", materia);
        if (materia.getId() != null) {
            throw new BadRequestAlertException("A new materia cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Materia result = materiaRepository.save(materia);
        return ResponseEntity.created(new URI("/api/materias/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /materias} : Updates an existing materia.
     *
     * @param materia the materia to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated materia,
     * or with status {@code 400 (Bad Request)} if the materia is not valid,
     * or with status {@code 500 (Internal Server Error)} if the materia couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/materias")
    public ResponseEntity<Materia> updateMateria(@RequestBody Materia materia) throws URISyntaxException {
        log.debug("REST request to update Materia : {}", materia);
        if (materia.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Materia result = materiaRepository.save(materia);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, materia.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /materias} : get all the materias.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of materias in body.
     */
    @GetMapping("/materias")
    public List<Materia> getAllMaterias() {
        log.debug("REST request to get all Materias");
        return materiaRepository.findAll();
    }

    /**
     * {@code GET  /materias/:id} : get the "id" materia.
     *
     * @param id the id of the materia to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the materia, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/materias/{id}")
    public ResponseEntity<Materia> getMateria(@PathVariable Long id) {
        log.debug("REST request to get Materia : {}", id);
        Optional<Materia> materia = materiaRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(materia);
    }

    /**
     * {@code DELETE  /materias/:id} : delete the "id" materia.
     *
     * @param id the id of the materia to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/materias/{id}")
    public ResponseEntity<Void> deleteMateria(@PathVariable Long id) {
        log.debug("REST request to delete Materia : {}", id);
        materiaRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}
