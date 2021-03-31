package com.swrj.net.escolaonline.web.rest;

import com.swrj.net.escolaonline.domain.Conteudo;
import com.swrj.net.escolaonline.repository.ConteudoRepository;
import com.swrj.net.escolaonline.service.ConteudoService;
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
 * REST controller for managing {@link com.swrj.net.escolaonline.domain.Conteudo}.
 */
@RestController
@RequestMapping("/api")
public class ConteudoResource {

    private final Logger log = LoggerFactory.getLogger(ConteudoResource.class);

    private static final String ENTITY_NAME = "conteudo";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final ConteudoService conteudoService;

    private final ConteudoRepository conteudoRepository;

    public ConteudoResource(ConteudoService conteudoService, ConteudoRepository conteudoRepository) {
        this.conteudoService = conteudoService;
        this.conteudoRepository = conteudoRepository;
    }

    /**
     * {@code POST  /conteudos} : Create a new conteudo.
     *
     * @param conteudo the conteudo to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new conteudo, or with status {@code 400 (Bad Request)} if the conteudo has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/conteudos")
    public ResponseEntity<Conteudo> createConteudo(@RequestBody Conteudo conteudo) throws URISyntaxException {
        log.debug("REST request to save Conteudo : {}", conteudo);
        if (conteudo.getId() != null) {
            throw new BadRequestAlertException("A new conteudo cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Conteudo result = conteudoService.save(conteudo);
        return ResponseEntity
            .created(new URI("/api/conteudos/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /conteudos/:id} : Updates an existing conteudo.
     *
     * @param id the id of the conteudo to save.
     * @param conteudo the conteudo to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated conteudo,
     * or with status {@code 400 (Bad Request)} if the conteudo is not valid,
     * or with status {@code 500 (Internal Server Error)} if the conteudo couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/conteudos/{id}")
    public ResponseEntity<Conteudo> updateConteudo(
        @PathVariable(value = "id", required = false) final Long id,
        @RequestBody Conteudo conteudo
    ) throws URISyntaxException {
        log.debug("REST request to update Conteudo : {}, {}", id, conteudo);
        if (conteudo.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, conteudo.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!conteudoRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Conteudo result = conteudoService.save(conteudo);
        return ResponseEntity
            .ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, conteudo.getId().toString()))
            .body(result);
    }

    /**
     * {@code PATCH  /conteudos/:id} : Partial updates given fields of an existing conteudo, field will ignore if it is null
     *
     * @param id the id of the conteudo to save.
     * @param conteudo the conteudo to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated conteudo,
     * or with status {@code 400 (Bad Request)} if the conteudo is not valid,
     * or with status {@code 404 (Not Found)} if the conteudo is not found,
     * or with status {@code 500 (Internal Server Error)} if the conteudo couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PatchMapping(value = "/conteudos/{id}", consumes = "application/merge-patch+json")
    public ResponseEntity<Conteudo> partialUpdateConteudo(
        @PathVariable(value = "id", required = false) final Long id,
        @RequestBody Conteudo conteudo
    ) throws URISyntaxException {
        log.debug("REST request to partial update Conteudo partially : {}, {}", id, conteudo);
        if (conteudo.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, conteudo.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!conteudoRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Optional<Conteudo> result = conteudoService.partialUpdate(conteudo);

        return ResponseUtil.wrapOrNotFound(
            result,
            HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, conteudo.getId().toString())
        );
    }

    /**
     * {@code GET  /conteudos} : get all the conteudos.
     *
     * @param pageable the pagination information.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of conteudos in body.
     */
    @GetMapping("/conteudos")
    public ResponseEntity<List<Conteudo>> getAllConteudos(Pageable pageable) {
        log.debug("REST request to get a page of Conteudos");
        Page<Conteudo> page = conteudoService.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(ServletUriComponentsBuilder.fromCurrentRequest(), page);
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    /**
     * {@code GET  /conteudos/:id} : get the "id" conteudo.
     *
     * @param id the id of the conteudo to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the conteudo, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/conteudos/{id}")
    public ResponseEntity<Conteudo> getConteudo(@PathVariable Long id) {
        log.debug("REST request to get Conteudo : {}", id);
        Optional<Conteudo> conteudo = conteudoService.findOne(id);
        return ResponseUtil.wrapOrNotFound(conteudo);
    }

    /**
     * {@code DELETE  /conteudos/:id} : delete the "id" conteudo.
     *
     * @param id the id of the conteudo to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/conteudos/{id}")
    public ResponseEntity<Void> deleteConteudo(@PathVariable Long id) {
        log.debug("REST request to delete Conteudo : {}", id);
        conteudoService.delete(id);
        return ResponseEntity
            .noContent()
            .headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString()))
            .build();
    }
}
