package com.swrj.net.escolaonline.web.rest;

import com.swrj.net.escolaonline.domain.Unidade;
import com.swrj.net.escolaonline.repository.UnidadeRepository;
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
 * REST controller for managing {@link com.swrj.net.escolaonline.domain.Unidade}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class UnidadeResource {

    private final Logger log = LoggerFactory.getLogger(UnidadeResource.class);

    private static final String ENTITY_NAME = "unidade";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final UnidadeRepository unidadeRepository;

    public UnidadeResource(UnidadeRepository unidadeRepository) {
        this.unidadeRepository = unidadeRepository;
    }

    /**
     * {@code POST  /unidades} : Create a new unidade.
     *
     * @param unidade the unidade to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new unidade, or with status {@code 400 (Bad Request)} if the unidade has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/unidades")
    public ResponseEntity<Unidade> createUnidade(@RequestBody Unidade unidade) throws URISyntaxException {
        log.debug("REST request to save Unidade : {}", unidade);
        if (unidade.getId() != null) {
            throw new BadRequestAlertException("A new unidade cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Unidade result = unidadeRepository.save(unidade);
        return ResponseEntity.created(new URI("/api/unidades/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /unidades} : Updates an existing unidade.
     *
     * @param unidade the unidade to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated unidade,
     * or with status {@code 400 (Bad Request)} if the unidade is not valid,
     * or with status {@code 500 (Internal Server Error)} if the unidade couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/unidades")
    public ResponseEntity<Unidade> updateUnidade(@RequestBody Unidade unidade) throws URISyntaxException {
        log.debug("REST request to update Unidade : {}", unidade);
        if (unidade.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Unidade result = unidadeRepository.save(unidade);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, unidade.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /unidades} : get all the unidades.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of unidades in body.
     */
    @GetMapping("/unidades")
    public List<Unidade> getAllUnidades() {
        log.debug("REST request to get all Unidades");
        return unidadeRepository.findAll();
    }

    /**
     * {@code GET  /unidades/:id} : get the "id" unidade.
     *
     * @param id the id of the unidade to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the unidade, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/unidades/{id}")
    public ResponseEntity<Unidade> getUnidade(@PathVariable Long id) {
        log.debug("REST request to get Unidade : {}", id);
        Optional<Unidade> unidade = unidadeRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(unidade);
    }

    /**
     * {@code DELETE  /unidades/:id} : delete the "id" unidade.
     *
     * @param id the id of the unidade to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/unidades/{id}")
    public ResponseEntity<Void> deleteUnidade(@PathVariable Long id) {
        log.debug("REST request to delete Unidade : {}", id);
        unidadeRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}
