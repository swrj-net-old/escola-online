package com.swrj.net.escolaonline.web.rest;

import com.swrj.net.escolaonline.domain.Solicitacao;
import com.swrj.net.escolaonline.repository.SolicitacaoRepository;
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
 * REST controller for managing {@link com.swrj.net.escolaonline.domain.Solicitacao}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class SolicitacaoResource {

    private final Logger log = LoggerFactory.getLogger(SolicitacaoResource.class);

    private static final String ENTITY_NAME = "solicitacao";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final SolicitacaoRepository solicitacaoRepository;

    public SolicitacaoResource(SolicitacaoRepository solicitacaoRepository) {
        this.solicitacaoRepository = solicitacaoRepository;
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
        Solicitacao result = solicitacaoRepository.save(solicitacao);
        return ResponseEntity.created(new URI("/api/solicitacaos/" + result.getId()))
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
        Solicitacao result = solicitacaoRepository.save(solicitacao);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, solicitacao.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /solicitacaos} : get all the solicitacaos.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of solicitacaos in body.
     */
    @GetMapping("/solicitacaos")
    public List<Solicitacao> getAllSolicitacaos() {
        log.debug("REST request to get all Solicitacaos");
        return solicitacaoRepository.findAll();
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
        Optional<Solicitacao> solicitacao = solicitacaoRepository.findById(id);
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
        solicitacaoRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}
