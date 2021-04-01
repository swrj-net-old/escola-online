package com.swrj.net.escolaonline.web.rest;

import com.swrj.net.escolaonline.domain.Unidade;
import com.swrj.net.escolaonline.service.UnidadeService;
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
 * REST controller for managing {@link com.swrj.net.escolaonline.domain.Unidade}.
 */
@RestController
@RequestMapping("/api")
public class UnidadeResource {
    private final Logger log = LoggerFactory.getLogger(UnidadeResource.class);

    private static final String ENTITY_NAME = "unidade";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final UnidadeService unidadeService;

    public UnidadeResource(UnidadeService unidadeService) {
        this.unidadeService = unidadeService;
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
        Unidade result = unidadeService.save(unidade);
        return ResponseEntity
            .created(new URI("/api/unidades/" + result.getId()))
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
        Unidade result = unidadeService.save(unidade);
        return ResponseEntity
            .ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, unidade.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /unidades} : get all the unidades.
     *
     * @param pageable the pagination information.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of unidades in body.
     */
    @GetMapping("/unidades")
    public ResponseEntity<List<Unidade>> getAllUnidades(Pageable pageable) {
        log.debug("REST request to get a page of Unidades");
        Page<Unidade> page = unidadeService.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(ServletUriComponentsBuilder.fromCurrentRequest(), page);
        return ResponseEntity.ok().headers(headers).body(page.getContent());
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
        Optional<Unidade> unidade = unidadeService.findOne(id);
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
        unidadeService.delete(id);
        return ResponseEntity
            .noContent()
            .headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString()))
            .build();
    }
}
