package com.swrj.net.escolaonline.web.rest;

import com.swrj.net.escolaonline.domain.Escola;
import com.swrj.net.escolaonline.repository.EscolaRepository;
import com.swrj.net.escolaonline.service.EscolaService;
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
 * REST controller for managing {@link com.swrj.net.escolaonline.domain.Escola}.
 */
@RestController
@RequestMapping("/api")
public class EscolaResource {

    private final Logger log = LoggerFactory.getLogger(EscolaResource.class);

    private static final String ENTITY_NAME = "escola";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final EscolaService escolaService;

    private final EscolaRepository escolaRepository;

    public EscolaResource(EscolaService escolaService, EscolaRepository escolaRepository) {
        this.escolaService = escolaService;
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
        Escola result = escolaService.save(escola);
        return ResponseEntity
            .created(new URI("/api/escolas/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /escolas/:id} : Updates an existing escola.
     *
     * @param id the id of the escola to save.
     * @param escola the escola to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated escola,
     * or with status {@code 400 (Bad Request)} if the escola is not valid,
     * or with status {@code 500 (Internal Server Error)} if the escola couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/escolas/{id}")
    public ResponseEntity<Escola> updateEscola(@PathVariable(value = "id", required = false) final Long id, @RequestBody Escola escola)
        throws URISyntaxException {
        log.debug("REST request to update Escola : {}, {}", id, escola);
        if (escola.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, escola.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!escolaRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Escola result = escolaService.save(escola);
        return ResponseEntity
            .ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, escola.getId().toString()))
            .body(result);
    }

    /**
     * {@code PATCH  /escolas/:id} : Partial updates given fields of an existing escola, field will ignore if it is null
     *
     * @param id the id of the escola to save.
     * @param escola the escola to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated escola,
     * or with status {@code 400 (Bad Request)} if the escola is not valid,
     * or with status {@code 404 (Not Found)} if the escola is not found,
     * or with status {@code 500 (Internal Server Error)} if the escola couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PatchMapping(value = "/escolas/{id}", consumes = "application/merge-patch+json")
    public ResponseEntity<Escola> partialUpdateEscola(
        @PathVariable(value = "id", required = false) final Long id,
        @RequestBody Escola escola
    ) throws URISyntaxException {
        log.debug("REST request to partial update Escola partially : {}, {}", id, escola);
        if (escola.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, escola.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!escolaRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Optional<Escola> result = escolaService.partialUpdate(escola);

        return ResponseUtil.wrapOrNotFound(
            result,
            HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, escola.getId().toString())
        );
    }

    /**
     * {@code GET  /escolas} : get all the escolas.
     *
     * @param pageable the pagination information.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of escolas in body.
     */
    @GetMapping("/escolas")
    public ResponseEntity<List<Escola>> getAllEscolas(Pageable pageable) {
        log.debug("REST request to get a page of Escolas");
        Page<Escola> page = escolaService.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(ServletUriComponentsBuilder.fromCurrentRequest(), page);
        return ResponseEntity.ok().headers(headers).body(page.getContent());
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
        Optional<Escola> escola = escolaService.findOne(id);
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
        escolaService.delete(id);
        return ResponseEntity
            .noContent()
            .headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString()))
            .build();
    }
}
