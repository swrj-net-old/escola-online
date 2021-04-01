package com.swrj.net.escolaonline.web.rest;

import com.swrj.net.escolaonline.domain.Debito;
import com.swrj.net.escolaonline.service.DebitoService;
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

    public DebitoResource(DebitoService debitoService) {
        this.debitoService = debitoService;
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
        Debito result = debitoService.save(debito);
        return ResponseEntity
            .ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, debito.getId().toString()))
            .body(result);
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
