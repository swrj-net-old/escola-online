package com.swrj.net.escolaonline.web.rest;

import com.swrj.net.escolaonline.domain.Chamada;
import com.swrj.net.escolaonline.repository.ChamadaRepository;
import com.swrj.net.escolaonline.service.ChamadaService;
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
 * REST controller for managing {@link com.swrj.net.escolaonline.domain.Chamada}.
 */
@RestController
@RequestMapping("/api")
public class ChamadaResource {

    private final Logger log = LoggerFactory.getLogger(ChamadaResource.class);

    private static final String ENTITY_NAME = "chamada";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final ChamadaService chamadaService;

    private final ChamadaRepository chamadaRepository;

    public ChamadaResource(ChamadaService chamadaService, ChamadaRepository chamadaRepository) {
        this.chamadaService = chamadaService;
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
        Chamada result = chamadaService.save(chamada);
        return ResponseEntity
            .created(new URI("/api/chamadas/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /chamadas/:id} : Updates an existing chamada.
     *
     * @param id the id of the chamada to save.
     * @param chamada the chamada to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated chamada,
     * or with status {@code 400 (Bad Request)} if the chamada is not valid,
     * or with status {@code 500 (Internal Server Error)} if the chamada couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/chamadas/{id}")
    public ResponseEntity<Chamada> updateChamada(@PathVariable(value = "id", required = false) final Long id, @RequestBody Chamada chamada)
        throws URISyntaxException {
        log.debug("REST request to update Chamada : {}, {}", id, chamada);
        if (chamada.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, chamada.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!chamadaRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Chamada result = chamadaService.save(chamada);
        return ResponseEntity
            .ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, chamada.getId().toString()))
            .body(result);
    }

    /**
     * {@code PATCH  /chamadas/:id} : Partial updates given fields of an existing chamada, field will ignore if it is null
     *
     * @param id the id of the chamada to save.
     * @param chamada the chamada to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated chamada,
     * or with status {@code 400 (Bad Request)} if the chamada is not valid,
     * or with status {@code 404 (Not Found)} if the chamada is not found,
     * or with status {@code 500 (Internal Server Error)} if the chamada couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PatchMapping(value = "/chamadas/{id}", consumes = "application/merge-patch+json")
    public ResponseEntity<Chamada> partialUpdateChamada(
        @PathVariable(value = "id", required = false) final Long id,
        @RequestBody Chamada chamada
    ) throws URISyntaxException {
        log.debug("REST request to partial update Chamada partially : {}, {}", id, chamada);
        if (chamada.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, chamada.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!chamadaRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Optional<Chamada> result = chamadaService.partialUpdate(chamada);

        return ResponseUtil.wrapOrNotFound(
            result,
            HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, chamada.getId().toString())
        );
    }

    /**
     * {@code GET  /chamadas} : get all the chamadas.
     *
     * @param pageable the pagination information.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of chamadas in body.
     */
    @GetMapping("/chamadas")
    public ResponseEntity<List<Chamada>> getAllChamadas(Pageable pageable) {
        log.debug("REST request to get a page of Chamadas");
        Page<Chamada> page = chamadaService.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(ServletUriComponentsBuilder.fromCurrentRequest(), page);
        return ResponseEntity.ok().headers(headers).body(page.getContent());
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
        Optional<Chamada> chamada = chamadaService.findOne(id);
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
        chamadaService.delete(id);
        return ResponseEntity
            .noContent()
            .headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString()))
            .build();
    }
}
