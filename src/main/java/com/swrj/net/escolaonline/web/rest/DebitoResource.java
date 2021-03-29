package com.swrj.net.escolaonline.web.rest;

import com.swrj.net.escolaonline.domain.Debito;
import com.swrj.net.escolaonline.repository.DebitoRepository;
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
 * REST controller for managing {@link com.swrj.net.escolaonline.domain.Debito}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class DebitoResource {

    private final Logger log = LoggerFactory.getLogger(DebitoResource.class);

    private static final String ENTITY_NAME = "debito";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final DebitoRepository debitoRepository;

    public DebitoResource(DebitoRepository debitoRepository) {
        this.debitoRepository = debitoRepository;
    }

    /**
     * {@code POST  /debitos} : Create a new debito.
     *
     * @param debito the debito to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new debito, or with status {@code 400 (Bad Request)} if the debito has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/debitos")
    public ResponseEntity<Debito> createDebito(@RequestBody Debito debito) throws URISyntaxException {
        log.debug("REST request to save Debito : {}", debito);
        if (debito.getId() != null) {
            throw new BadRequestAlertException("A new debito cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Debito result = debitoRepository.save(debito);
        return ResponseEntity.created(new URI("/api/debitos/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /debitos} : Updates an existing debito.
     *
     * @param debito the debito to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated debito,
     * or with status {@code 400 (Bad Request)} if the debito is not valid,
     * or with status {@code 500 (Internal Server Error)} if the debito couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/debitos")
    public ResponseEntity<Debito> updateDebito(@RequestBody Debito debito) throws URISyntaxException {
        log.debug("REST request to update Debito : {}", debito);
        if (debito.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Debito result = debitoRepository.save(debito);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, debito.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /debitos} : get all the debitos.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of debitos in body.
     */
    @GetMapping("/debitos")
    public List<Debito> getAllDebitos() {
        log.debug("REST request to get all Debitos");
        return debitoRepository.findAll();
    }

    /**
     * {@code GET  /debitos/:id} : get the "id" debito.
     *
     * @param id the id of the debito to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the debito, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/debitos/{id}")
    public ResponseEntity<Debito> getDebito(@PathVariable Long id) {
        log.debug("REST request to get Debito : {}", id);
        Optional<Debito> debito = debitoRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(debito);
    }

    /**
     * {@code DELETE  /debitos/:id} : delete the "id" debito.
     *
     * @param id the id of the debito to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/debitos/{id}")
    public ResponseEntity<Void> deleteDebito(@PathVariable Long id) {
        log.debug("REST request to delete Debito : {}", id);
        debitoRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}
