package com.swrj.net.escolaonline.web.rest;

import com.swrj.net.escolaonline.domain.Materia;
import com.swrj.net.escolaonline.service.MateriaService;
import com.swrj.net.escolaonline.web.rest.errors.BadRequestAlertException;
import io.github.jhipster.web.util.HeaderUtil;
import io.github.jhipster.web.util.PaginationUtil;
import io.github.jhipster.web.util.ResponseUtil;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Optional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

/**
 * REST controller for managing {@link com.swrj.net.escolaonline.domain.Materia}.
 */
@RestController
@RequestMapping("/api")
public class MateriaResource {
    private final Logger log = LoggerFactory.getLogger(MateriaResource.class);

    private static final String ENTITY_NAME = "materia";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final MateriaService materiaService;

    public MateriaResource(MateriaService materiaService) {
        this.materiaService = materiaService;
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
        Materia result = materiaService.save(materia);
        return ResponseEntity
            .created(new URI("/api/materias/" + result.getId()))
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
        Materia result = materiaService.save(materia);
        return ResponseEntity
            .ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, materia.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /materias} : get all the materias.
     *
     * @param pageable the pagination information.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of materias in body.
     */
    @GetMapping("/materias")
    public ResponseEntity<List<Materia>> getAllMaterias(Pageable pageable) {
        log.debug("REST request to get a page of Materias");
        Page<Materia> page = materiaService.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(ServletUriComponentsBuilder.fromCurrentRequest(), page);
        return ResponseEntity.ok().headers(headers).body(page.getContent());
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
        Optional<Materia> materia = materiaService.findOne(id);
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
        materiaService.delete(id);
        return ResponseEntity
            .noContent()
            .headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString()))
            .build();
    }
}
