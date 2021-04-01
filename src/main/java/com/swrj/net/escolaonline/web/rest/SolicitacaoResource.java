package com.swrj.net.escolaonline.web.rest;

import com.swrj.net.escolaonline.domain.Solicitacao;
import com.swrj.net.escolaonline.service.SolicitacaoService;
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
 * REST controller for managing {@link com.swrj.net.escolaonline.domain.Solicitacao}.
 */
@RestController
@RequestMapping("/api")
public class SolicitacaoResource {
    private final Logger log = LoggerFactory.getLogger(SolicitacaoResource.class);

    private static final String ENTITY_NAME = "solicitacao";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final SolicitacaoService solicitacaoService;

    public SolicitacaoResource(SolicitacaoService solicitacaoService) {
        this.solicitacaoService = solicitacaoService;
    }

    /**
     * {@code POST  /solicitacaos} : Create a new solicitacao.
     *
     * @param solicitacao the solicitacao to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new solicitacao, or with status {@code 400 (Bad Request)} if the solicitacao has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/solicitacaos")
    public ResponseEntity<Solicitacao> createSolicitacao(@RequestBody Solicitacao solicitacao) throws URISyntaxException {
        log.debug("REST request to save Solicitacao : {}", solicitacao);
        if (solicitacao.getId() != null) {
            throw new BadRequestAlertException("A new solicitacao cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Solicitacao result = solicitacaoService.save(solicitacao);
        return ResponseEntity
            .created(new URI("/api/solicitacaos/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /solicitacaos} : Updates an existing solicitacao.
     *
     * @param solicitacao the solicitacao to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated solicitacao,
     * or with status {@code 400 (Bad Request)} if the solicitacao is not valid,
     * or with status {@code 500 (Internal Server Error)} if the solicitacao couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/solicitacaos")
    public ResponseEntity<Solicitacao> updateSolicitacao(@RequestBody Solicitacao solicitacao) throws URISyntaxException {
        log.debug("REST request to update Solicitacao : {}", solicitacao);
        if (solicitacao.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Solicitacao result = solicitacaoService.save(solicitacao);
        return ResponseEntity
            .ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, solicitacao.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /solicitacaos} : get all the solicitacaos.
     *
     * @param pageable the pagination information.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of solicitacaos in body.
     */
    @GetMapping("/solicitacaos")
    public ResponseEntity<List<Solicitacao>> getAllSolicitacaos(Pageable pageable) {
        log.debug("REST request to get a page of Solicitacaos");
        Page<Solicitacao> page = solicitacaoService.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(ServletUriComponentsBuilder.fromCurrentRequest(), page);
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    /**
     * {@code GET  /solicitacaos/:id} : get the "id" solicitacao.
     *
     * @param id the id of the solicitacao to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the solicitacao, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/solicitacaos/{id}")
    public ResponseEntity<Solicitacao> getSolicitacao(@PathVariable Long id) {
        log.debug("REST request to get Solicitacao : {}", id);
        Optional<Solicitacao> solicitacao = solicitacaoService.findOne(id);
        return ResponseUtil.wrapOrNotFound(solicitacao);
    }

    /**
     * {@code DELETE  /solicitacaos/:id} : delete the "id" solicitacao.
     *
     * @param id the id of the solicitacao to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/solicitacaos/{id}")
    public ResponseEntity<Void> deleteSolicitacao(@PathVariable Long id) {
        log.debug("REST request to delete Solicitacao : {}", id);
        solicitacaoService.delete(id);
        return ResponseEntity
            .noContent()
            .headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString()))
            .build();
    }
}
