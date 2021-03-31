package com.swrj.net.escolaonline.web.rest;

import com.swrj.net.escolaonline.domain.Debito;
import com.swrj.net.escolaonline.repository.DebitoRepository;
import com.swrj.net.escolaonline.service.DebitoService;
import com.swrj.net.escolaonline.web.rest.errors.BadRequestAlertException;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Objects;
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
import tech.jhipster.web.util.HeaderUtil;
import tech.jhipster.web.util.PaginationUtil;
import tech.jhipster.web.util.ResponseUtil;

/**
 * REST controller for managing {@link com.swrj.net.escolaonline.domain.Debito}.
 */
@RestController
@RequestMapping("/api")
public class DebitoResource {

    private final Logger log = LoggerFactory.getLogger(DebitoResource.class);

    private static final String ENTITY_NAME = "debito";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final DebitoService debitoService;

    private final DebitoRepository debitoRepository;

    public DebitoResource(DebitoService debitoService, DebitoRepository debitoRepository) {
        this.debitoService = debitoService;
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
        Debito result = debitoService.save(debito);
        return ResponseEntity
            .created(new URI("/api/debitos/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /debitos/:id} : Updates an existing debito.
     *
     * @param id the id of the debito to save.
     * @param debito the debito to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated debito,
     * or with status {@code 400 (Bad Request)} if the debito is not valid,
     * or with status {@code 500 (Internal Server Error)} if the debito couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/debitos/{id}")
    public ResponseEntity<Debito> updateDebito(@PathVariable(value = "id", required = false) final Long id, @RequestBody Debito debito)
        throws URISyntaxException {
        log.debug("REST request to update Debito : {}, {}", id, debito);
        if (debito.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, debito.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!debitoRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Debito result = debitoService.save(debito);
        return ResponseEntity
            .ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, debito.getId().toString()))
            .body(result);
    }

    /**
     * {@code PATCH  /debitos/:id} : Partial updates given fields of an existing debito, field will ignore if it is null
     *
     * @param id the id of the debito to save.
     * @param debito the debito to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated debito,
     * or with status {@code 400 (Bad Request)} if the debito is not valid,
     * or with status {@code 404 (Not Found)} if the debito is not found,
     * or with status {@code 500 (Internal Server Error)} if the debito couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PatchMapping(value = "/debitos/{id}", consumes = "application/merge-patch+json")
    public ResponseEntity<Debito> partialUpdateDebito(
        @PathVariable(value = "id", required = false) final Long id,
        @RequestBody Debito debito
    ) throws URISyntaxException {
        log.debug("REST request to partial update Debito partially : {}, {}", id, debito);
        if (debito.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, debito.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!debitoRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Optional<Debito> result = debitoService.partialUpdate(debito);

        return ResponseUtil.wrapOrNotFound(
            result,
            HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, debito.getId().toString())
        );
    }

    /**
     * {@code GET  /debitos} : get all the debitos.
     *
     * @param pageable the pagination information.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of debitos in body.
     */
    @GetMapping("/debitos")
    public ResponseEntity<List<Debito>> getAllDebitos(Pageable pageable) {
        log.debug("REST request to get a page of Debitos");
        Page<Debito> page = debitoService.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(ServletUriComponentsBuilder.fromCurrentRequest(), page);
        return ResponseEntity.ok().headers(headers).body(page.getContent());
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
        Optional<Debito> debito = debitoService.findOne(id);
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
        debitoService.delete(id);
        return ResponseEntity
            .noContent()
            .headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString()))
            .build();
    }
}
