package com.swrj.net.escolaonline.web.rest;

import com.swrj.net.escolaonline.domain.Escola;
import com.swrj.net.escolaonline.repository.EscolaRepository;
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
 * REST controller for managing {@link com.swrj.net.escolaonline.domain.Escola}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class EscolaResource {

    private final Logger log = LoggerFactory.getLogger(EscolaResource.class);

    private static final String ENTITY_NAME = "escola";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final EscolaRepository escolaRepository;

    public EscolaResource(EscolaRepository escolaRepository) {
        this.escolaRepository = escolaRepository;
    }

    /**
     * {@code POST  /escolas} : Create a new escola.
     *
     * @param escola the escola to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new escola, or with status {@code 400 (Bad Request)} if the escola has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/escolas")
    public ResponseEntity<Escola> createEscola(@RequestBody Escola escola) throws URISyntaxException {
        log.debug("REST request to save Escola : {}", escola);
        if (escola.getId() != null) {
            throw new BadRequestAlertException("A new escola cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Escola result = escolaRepository.save(escola);
        return ResponseEntity.created(new URI("/api/escolas/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /escolas} : Updates an existing escola.
     *
     * @param escola the escola to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated escola,
     * or with status {@code 400 (Bad Request)} if the escola is not valid,
     * or with status {@code 500 (Internal Server Error)} if the escola couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/escolas")
    public ResponseEntity<Escola> updateEscola(@RequestBody Escola escola) throws URISyntaxException {
        log.debug("REST request to update Escola : {}", escola);
        if (escola.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Escola result = escolaRepository.save(escola);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, escola.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /escolas} : get all the escolas.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of escolas in body.
     */
    @GetMapping("/escolas")
    public List<Escola> getAllEscolas() {
        log.debug("REST request to get all Escolas");
        return escolaRepository.findAll();
    }

    /**
     * {@code GET  /escolas/:id} : get the "id" escola.
     *
     * @param id the id of the escola to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the escola, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/escolas/{id}")
    public ResponseEntity<Escola> getEscola(@PathVariable Long id) {
        log.debug("REST request to get Escola : {}", id);
        Optional<Escola> escola = escolaRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(escola);
    }

    /**
     * {@code DELETE  /escolas/:id} : delete the "id" escola.
     *
     * @param id the id of the escola to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/escolas/{id}")
    public ResponseEntity<Void> deleteEscola(@PathVariable Long id) {
        log.debug("REST request to delete Escola : {}", id);
        escolaRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}
