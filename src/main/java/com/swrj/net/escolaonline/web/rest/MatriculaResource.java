package com.swrj.net.escolaonline.web.rest;

import com.swrj.net.escolaonline.domain.Matricula;
import com.swrj.net.escolaonline.service.MatriculaService;
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
 * REST controller for managing {@link com.swrj.net.escolaonline.domain.Matricula}.
 */
@RestController
@RequestMapping("/api")
public class MatriculaResource {
    private final Logger log = LoggerFactory.getLogger(MatriculaResource.class);

    private static final String ENTITY_NAME = "matricula";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final MatriculaService matriculaService;

    public MatriculaResource(MatriculaService matriculaService) {
        this.matriculaService = matriculaService;
    }

    /**
     * {@code POST  /matriculas} : Create a new matricula.
     *
     * @param matricula the matricula to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new matricula, or with status {@code 400 (Bad Request)} if the matricula has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/matriculas")
    public ResponseEntity<Matricula> createMatricula(@RequestBody Matricula matricula) throws URISyntaxException {
        log.debug("REST request to save Matricula : {}", matricula);
        if (matricula.getId() != null) {
            throw new BadRequestAlertException("A new matricula cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Matricula result = matriculaService.save(matricula);
        return ResponseEntity
            .created(new URI("/api/matriculas/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /matriculas} : Updates an existing matricula.
     *
     * @param matricula the matricula to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated matricula,
     * or with status {@code 400 (Bad Request)} if the matricula is not valid,
     * or with status {@code 500 (Internal Server Error)} if the matricula couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/matriculas")
    public ResponseEntity<Matricula> updateMatricula(@RequestBody Matricula matricula) throws URISyntaxException {
        log.debug("REST request to update Matricula : {}", matricula);
        if (matricula.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Matricula result = matriculaService.save(matricula);
        return ResponseEntity
            .ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, matricula.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /matriculas} : get all the matriculas.
     *
     * @param pageable the pagination information.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of matriculas in body.
     */
    @GetMapping("/matriculas")
    public ResponseEntity<List<Matricula>> getAllMatriculas(Pageable pageable) {
        log.debug("REST request to get a page of Matriculas");
        Page<Matricula> page = matriculaService.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(ServletUriComponentsBuilder.fromCurrentRequest(), page);
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    /**
     * {@code GET  /matriculas/:id} : get the "id" matricula.
     *
     * @param id the id of the matricula to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the matricula, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/matriculas/{id}")
    public ResponseEntity<Matricula> getMatricula(@PathVariable Long id) {
        log.debug("REST request to get Matricula : {}", id);
        Optional<Matricula> matricula = matriculaService.findOne(id);
        return ResponseUtil.wrapOrNotFound(matricula);
    }

    /**
     * {@code DELETE  /matriculas/:id} : delete the "id" matricula.
     *
     * @param id the id of the matricula to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/matriculas/{id}")
    public ResponseEntity<Void> deleteMatricula(@PathVariable Long id) {
        log.debug("REST request to delete Matricula : {}", id);
        matriculaService.delete(id);
        return ResponseEntity
            .noContent()
            .headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString()))
            .build();
    }
}
