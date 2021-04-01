package com.swrj.net.escolaonline.web.rest;

import com.swrj.net.escolaonline.domain.Chamada;
import com.swrj.net.escolaonline.repository.ChamadaRepository;
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
 * REST controller for managing {@link com.swrj.net.escolaonline.domain.Chamada}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class ChamadaResource {

    private final Logger log = LoggerFactory.getLogger(ChamadaResource.class);

    private static final String ENTITY_NAME = "chamada";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final ChamadaRepository chamadaRepository;

    public ChamadaResource(ChamadaRepository chamadaRepository) {
        this.chamadaRepository = chamadaRepository;
    }

    /**
     * {@code POST  /chamadas} : Create a new chamada.
     *
     * @param chamada the chamada to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new chamada, or with status {@code 400 (Bad Request)} if the chamada has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/chamadas")
    public ResponseEntity<Chamada> createChamada(@RequestBody Chamada chamada) throws URISyntaxException {
        log.debug("REST request to save Chamada : {}", chamada);
        if (chamada.getId() != null) {
            throw new BadRequestAlertException("A new chamada cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Chamada result = chamadaRepository.save(chamada);
        return ResponseEntity.created(new URI("/api/chamadas/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /chamadas} : Updates an existing chamada.
     *
     * @param chamada the chamada to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated chamada,
     * or with status {@code 400 (Bad Request)} if the chamada is not valid,
     * or with status {@code 500 (Internal Server Error)} if the chamada couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/chamadas")
    public ResponseEntity<Chamada> updateChamada(@RequestBody Chamada chamada) throws URISyntaxException {
        log.debug("REST request to update Chamada : {}", chamada);
        if (chamada.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Chamada result = chamadaRepository.save(chamada);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, chamada.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /chamadas} : get all the chamadas.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of chamadas in body.
     */
    @GetMapping("/chamadas")
    public List<Chamada> getAllChamadas() {
        log.debug("REST request to get all Chamadas");
        return chamadaRepository.findAll();
    }

    /**
     * {@code GET  /chamadas/:id} : get the "id" chamada.
     *
     * @param id the id of the chamada to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the chamada, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/chamadas/{id}")
    public ResponseEntity<Chamada> getChamada(@PathVariable Long id) {
        log.debug("REST request to get Chamada : {}", id);
        Optional<Chamada> chamada = chamadaRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(chamada);
    }

    /**
     * {@code DELETE  /chamadas/:id} : delete the "id" chamada.
     *
     * @param id the id of the chamada to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/chamadas/{id}")
    public ResponseEntity<Void> deleteChamada(@PathVariable Long id) {
        log.debug("REST request to delete Chamada : {}", id);
        chamadaRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}
