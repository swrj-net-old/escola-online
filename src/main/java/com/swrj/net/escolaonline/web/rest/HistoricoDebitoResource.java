package com.swrj.net.escolaonline.web.rest;

import com.swrj.net.escolaonline.domain.HistoricoDebito;
import com.swrj.net.escolaonline.repository.HistoricoDebitoRepository;
import com.swrj.net.escolaonline.service.HistoricoDebitoService;
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
 * REST controller for managing {@link com.swrj.net.escolaonline.domain.HistoricoDebito}.
 */
@RestController
@RequestMapping("/api")
public class HistoricoDebitoResource {

    private final Logger log = LoggerFactory.getLogger(HistoricoDebitoResource.class);

    private static final String ENTITY_NAME = "historicoDebito";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final HistoricoDebitoService historicoDebitoService;

    private final HistoricoDebitoRepository historicoDebitoRepository;

    public HistoricoDebitoResource(HistoricoDebitoService historicoDebitoService, HistoricoDebitoRepository historicoDebitoRepository) {
        this.historicoDebitoService = historicoDebitoService;
        this.historicoDebitoRepository = historicoDebitoRepository;
    }

    /**
     * {@code POST  /historico-debitos} : Create a new historicoDebito.
     *
     * @param historicoDebito the historicoDebito to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new historicoDebito, or with status {@code 400 (Bad Request)} if the historicoDebito has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/historico-debitos")
    public ResponseEntity<HistoricoDebito> createHistoricoDebito(@RequestBody HistoricoDebito historicoDebito) throws URISyntaxException {
        log.debug("REST request to save HistoricoDebito : {}", historicoDebito);
        if (historicoDebito.getId() != null) {
            throw new BadRequestAlertException("A new historicoDebito cannot already have an ID", ENTITY_NAME, "idexists");
        }
        HistoricoDebito result = historicoDebitoService.save(historicoDebito);
        return ResponseEntity
            .created(new URI("/api/historico-debitos/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /historico-debitos/:id} : Updates an existing historicoDebito.
     *
     * @param id the id of the historicoDebito to save.
     * @param historicoDebito the historicoDebito to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated historicoDebito,
     * or with status {@code 400 (Bad Request)} if the historicoDebito is not valid,
     * or with status {@code 500 (Internal Server Error)} if the historicoDebito couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/historico-debitos/{id}")
    public ResponseEntity<HistoricoDebito> updateHistoricoDebito(
        @PathVariable(value = "id", required = false) final Long id,
        @RequestBody HistoricoDebito historicoDebito
    ) throws URISyntaxException {
        log.debug("REST request to update HistoricoDebito : {}, {}", id, historicoDebito);
        if (historicoDebito.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, historicoDebito.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!historicoDebitoRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        HistoricoDebito result = historicoDebitoService.save(historicoDebito);
        return ResponseEntity
            .ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, historicoDebito.getId().toString()))
            .body(result);
    }

    /**
     * {@code PATCH  /historico-debitos/:id} : Partial updates given fields of an existing historicoDebito, field will ignore if it is null
     *
     * @param id the id of the historicoDebito to save.
     * @param historicoDebito the historicoDebito to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated historicoDebito,
     * or with status {@code 400 (Bad Request)} if the historicoDebito is not valid,
     * or with status {@code 404 (Not Found)} if the historicoDebito is not found,
     * or with status {@code 500 (Internal Server Error)} if the historicoDebito couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PatchMapping(value = "/historico-debitos/{id}", consumes = "application/merge-patch+json")
    public ResponseEntity<HistoricoDebito> partialUpdateHistoricoDebito(
        @PathVariable(value = "id", required = false) final Long id,
        @RequestBody HistoricoDebito historicoDebito
    ) throws URISyntaxException {
        log.debug("REST request to partial update HistoricoDebito partially : {}, {}", id, historicoDebito);
        if (historicoDebito.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, historicoDebito.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!historicoDebitoRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Optional<HistoricoDebito> result = historicoDebitoService.partialUpdate(historicoDebito);

        return ResponseUtil.wrapOrNotFound(
            result,
            HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, historicoDebito.getId().toString())
        );
    }

    /**
     * {@code GET  /historico-debitos} : get all the historicoDebitos.
     *
     * @param pageable the pagination information.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of historicoDebitos in body.
     */
    @GetMapping("/historico-debitos")
    public ResponseEntity<List<HistoricoDebito>> getAllHistoricoDebitos(Pageable pageable) {
        log.debug("REST request to get a page of HistoricoDebitos");
        Page<HistoricoDebito> page = historicoDebitoService.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(ServletUriComponentsBuilder.fromCurrentRequest(), page);
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    /**
     * {@code GET  /historico-debitos/:id} : get the "id" historicoDebito.
     *
     * @param id the id of the historicoDebito to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the historicoDebito, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/historico-debitos/{id}")
    public ResponseEntity<HistoricoDebito> getHistoricoDebito(@PathVariable Long id) {
        log.debug("REST request to get HistoricoDebito : {}", id);
        Optional<HistoricoDebito> historicoDebito = historicoDebitoService.findOne(id);
        return ResponseUtil.wrapOrNotFound(historicoDebito);
    }

    /**
     * {@code DELETE  /historico-debitos/:id} : delete the "id" historicoDebito.
     *
     * @param id the id of the historicoDebito to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/historico-debitos/{id}")
    public ResponseEntity<Void> deleteHistoricoDebito(@PathVariable Long id) {
        log.debug("REST request to delete HistoricoDebito : {}", id);
        historicoDebitoService.delete(id);
        return ResponseEntity
            .noContent()
            .headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString()))
            .build();
    }
}
