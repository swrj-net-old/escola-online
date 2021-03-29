package com.swrj.net.escolaonline.web.rest;

import com.swrj.net.escolaonline.domain.TipoSolicitacao;
import com.swrj.net.escolaonline.repository.TipoSolicitacaoRepository;
import com.swrj.net.escolaonline.web.rest.errors.BadRequestAlertException;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Objects;
import java.util.Optional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;
import tech.jhipster.web.util.HeaderUtil;
import tech.jhipster.web.util.ResponseUtil;

/**
 * REST controller for managing {@link com.swrj.net.escolaonline.domain.TipoSolicitacao}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class TipoSolicitacaoResource {

    private final Logger log = LoggerFactory.getLogger(TipoSolicitacaoResource.class);

    private static final String ENTITY_NAME = "tipoSolicitacao";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final TipoSolicitacaoRepository tipoSolicitacaoRepository;

    public TipoSolicitacaoResource(TipoSolicitacaoRepository tipoSolicitacaoRepository) {
        this.tipoSolicitacaoRepository = tipoSolicitacaoRepository;
    }

    /**
     * {@code POST  /tipo-solicitacaos} : Create a new tipoSolicitacao.
     *
     * @param tipoSolicitacao the tipoSolicitacao to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new tipoSolicitacao, or with status {@code 400 (Bad Request)} if the tipoSolicitacao has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/tipo-solicitacaos")
    public ResponseEntity<TipoSolicitacao> createTipoSolicitacao(@RequestBody TipoSolicitacao tipoSolicitacao) throws URISyntaxException {
        log.debug("REST request to save TipoSolicitacao : {}", tipoSolicitacao);
        if (tipoSolicitacao.getId() != null) {
            throw new BadRequestAlertException("A new tipoSolicitacao cannot already have an ID", ENTITY_NAME, "idexists");
        }
        TipoSolicitacao result = tipoSolicitacaoRepository.save(tipoSolicitacao);
        return ResponseEntity
            .created(new URI("/api/tipo-solicitacaos/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /tipo-solicitacaos/:id} : Updates an existing tipoSolicitacao.
     *
     * @param id the id of the tipoSolicitacao to save.
     * @param tipoSolicitacao the tipoSolicitacao to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated tipoSolicitacao,
     * or with status {@code 400 (Bad Request)} if the tipoSolicitacao is not valid,
     * or with status {@code 500 (Internal Server Error)} if the tipoSolicitacao couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/tipo-solicitacaos/{id}")
    public ResponseEntity<TipoSolicitacao> updateTipoSolicitacao(
        @PathVariable(value = "id", required = false) final Long id,
        @RequestBody TipoSolicitacao tipoSolicitacao
    ) throws URISyntaxException {
        log.debug("REST request to update TipoSolicitacao : {}, {}", id, tipoSolicitacao);
        if (tipoSolicitacao.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, tipoSolicitacao.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!tipoSolicitacaoRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        TipoSolicitacao result = tipoSolicitacaoRepository.save(tipoSolicitacao);
        return ResponseEntity
            .ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, tipoSolicitacao.getId().toString()))
            .body(result);
    }

    /**
     * {@code PATCH  /tipo-solicitacaos/:id} : Partial updates given fields of an existing tipoSolicitacao, field will ignore if it is null
     *
     * @param id the id of the tipoSolicitacao to save.
     * @param tipoSolicitacao the tipoSolicitacao to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated tipoSolicitacao,
     * or with status {@code 400 (Bad Request)} if the tipoSolicitacao is not valid,
     * or with status {@code 404 (Not Found)} if the tipoSolicitacao is not found,
     * or with status {@code 500 (Internal Server Error)} if the tipoSolicitacao couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PatchMapping(value = "/tipo-solicitacaos/{id}", consumes = "application/merge-patch+json")
    public ResponseEntity<TipoSolicitacao> partialUpdateTipoSolicitacao(
        @PathVariable(value = "id", required = false) final Long id,
        @RequestBody TipoSolicitacao tipoSolicitacao
    ) throws URISyntaxException {
        log.debug("REST request to partial update TipoSolicitacao partially : {}, {}", id, tipoSolicitacao);
        if (tipoSolicitacao.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, tipoSolicitacao.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!tipoSolicitacaoRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Optional<TipoSolicitacao> result = tipoSolicitacaoRepository
            .findById(tipoSolicitacao.getId())
            .map(
                existingTipoSolicitacao -> {
                    if (tipoSolicitacao.getNome() != null) {
                        existingTipoSolicitacao.setNome(tipoSolicitacao.getNome());
                    }
                    if (tipoSolicitacao.getPrazoAtendimento() != null) {
                        existingTipoSolicitacao.setPrazoAtendimento(tipoSolicitacao.getPrazoAtendimento());
                    }
                    if (tipoSolicitacao.getValorEmissao() != null) {
                        existingTipoSolicitacao.setValorEmissao(tipoSolicitacao.getValorEmissao());
                    }

                    return existingTipoSolicitacao;
                }
            )
            .map(tipoSolicitacaoRepository::save);

        return ResponseUtil.wrapOrNotFound(
            result,
            HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, tipoSolicitacao.getId().toString())
        );
    }

    /**
     * {@code GET  /tipo-solicitacaos} : get all the tipoSolicitacaos.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of tipoSolicitacaos in body.
     */
    @GetMapping("/tipo-solicitacaos")
    public List<TipoSolicitacao> getAllTipoSolicitacaos() {
        log.debug("REST request to get all TipoSolicitacaos");
        return tipoSolicitacaoRepository.findAll();
    }

    /**
     * {@code GET  /tipo-solicitacaos/:id} : get the "id" tipoSolicitacao.
     *
     * @param id the id of the tipoSolicitacao to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the tipoSolicitacao, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/tipo-solicitacaos/{id}")
    public ResponseEntity<TipoSolicitacao> getTipoSolicitacao(@PathVariable Long id) {
        log.debug("REST request to get TipoSolicitacao : {}", id);
        Optional<TipoSolicitacao> tipoSolicitacao = tipoSolicitacaoRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(tipoSolicitacao);
    }

    /**
     * {@code DELETE  /tipo-solicitacaos/:id} : delete the "id" tipoSolicitacao.
     *
     * @param id the id of the tipoSolicitacao to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/tipo-solicitacaos/{id}")
    public ResponseEntity<Void> deleteTipoSolicitacao(@PathVariable Long id) {
        log.debug("REST request to delete TipoSolicitacao : {}", id);
        tipoSolicitacaoRepository.deleteById(id);
        return ResponseEntity
            .noContent()
            .headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString()))
            .build();
    }
}
