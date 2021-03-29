package com.swrj.net.escolaonline.web.rest;

import com.swrj.net.escolaonline.domain.DetalheUsuario;
import com.swrj.net.escolaonline.repository.DetalheUsuarioRepository;
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
 * REST controller for managing {@link com.swrj.net.escolaonline.domain.DetalheUsuario}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class DetalheUsuarioResource {

    private final Logger log = LoggerFactory.getLogger(DetalheUsuarioResource.class);

    private static final String ENTITY_NAME = "detalheUsuario";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final DetalheUsuarioRepository detalheUsuarioRepository;

    public DetalheUsuarioResource(DetalheUsuarioRepository detalheUsuarioRepository) {
        this.detalheUsuarioRepository = detalheUsuarioRepository;
    }

    /**
     * {@code POST  /detalhe-usuarios} : Create a new detalheUsuario.
     *
     * @param detalheUsuario the detalheUsuario to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new detalheUsuario, or with status {@code 400 (Bad Request)} if the detalheUsuario has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/detalhe-usuarios")
    public ResponseEntity<DetalheUsuario> createDetalheUsuario(@RequestBody DetalheUsuario detalheUsuario) throws URISyntaxException {
        log.debug("REST request to save DetalheUsuario : {}", detalheUsuario);
        if (detalheUsuario.getId() != null) {
            throw new BadRequestAlertException("A new detalheUsuario cannot already have an ID", ENTITY_NAME, "idexists");
        }
        DetalheUsuario result = detalheUsuarioRepository.save(detalheUsuario);
        return ResponseEntity
            .created(new URI("/api/detalhe-usuarios/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /detalhe-usuarios/:id} : Updates an existing detalheUsuario.
     *
     * @param id the id of the detalheUsuario to save.
     * @param detalheUsuario the detalheUsuario to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated detalheUsuario,
     * or with status {@code 400 (Bad Request)} if the detalheUsuario is not valid,
     * or with status {@code 500 (Internal Server Error)} if the detalheUsuario couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/detalhe-usuarios/{id}")
    public ResponseEntity<DetalheUsuario> updateDetalheUsuario(
        @PathVariable(value = "id", required = false) final Long id,
        @RequestBody DetalheUsuario detalheUsuario
    ) throws URISyntaxException {
        log.debug("REST request to update DetalheUsuario : {}, {}", id, detalheUsuario);
        if (detalheUsuario.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, detalheUsuario.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!detalheUsuarioRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        DetalheUsuario result = detalheUsuarioRepository.save(detalheUsuario);
        return ResponseEntity
            .ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, detalheUsuario.getId().toString()))
            .body(result);
    }

    /**
     * {@code PATCH  /detalhe-usuarios/:id} : Partial updates given fields of an existing detalheUsuario, field will ignore if it is null
     *
     * @param id the id of the detalheUsuario to save.
     * @param detalheUsuario the detalheUsuario to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated detalheUsuario,
     * or with status {@code 400 (Bad Request)} if the detalheUsuario is not valid,
     * or with status {@code 404 (Not Found)} if the detalheUsuario is not found,
     * or with status {@code 500 (Internal Server Error)} if the detalheUsuario couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PatchMapping(value = "/detalhe-usuarios/{id}", consumes = "application/merge-patch+json")
    public ResponseEntity<DetalheUsuario> partialUpdateDetalheUsuario(
        @PathVariable(value = "id", required = false) final Long id,
        @RequestBody DetalheUsuario detalheUsuario
    ) throws URISyntaxException {
        log.debug("REST request to partial update DetalheUsuario partially : {}, {}", id, detalheUsuario);
        if (detalheUsuario.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, detalheUsuario.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!detalheUsuarioRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Optional<DetalheUsuario> result = detalheUsuarioRepository
            .findById(detalheUsuario.getId())
            .map(
                existingDetalheUsuario -> {
                    if (detalheUsuario.getCpf() != null) {
                        existingDetalheUsuario.setCpf(detalheUsuario.getCpf());
                    }
                    if (detalheUsuario.getCelular() != null) {
                        existingDetalheUsuario.setCelular(detalheUsuario.getCelular());
                    }

                    return existingDetalheUsuario;
                }
            )
            .map(detalheUsuarioRepository::save);

        return ResponseUtil.wrapOrNotFound(
            result,
            HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, detalheUsuario.getId().toString())
        );
    }

    /**
     * {@code GET  /detalhe-usuarios} : get all the detalheUsuarios.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of detalheUsuarios in body.
     */
    @GetMapping("/detalhe-usuarios")
    public List<DetalheUsuario> getAllDetalheUsuarios() {
        log.debug("REST request to get all DetalheUsuarios");
        return detalheUsuarioRepository.findAll();
    }

    /**
     * {@code GET  /detalhe-usuarios/:id} : get the "id" detalheUsuario.
     *
     * @param id the id of the detalheUsuario to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the detalheUsuario, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/detalhe-usuarios/{id}")
    public ResponseEntity<DetalheUsuario> getDetalheUsuario(@PathVariable Long id) {
        log.debug("REST request to get DetalheUsuario : {}", id);
        Optional<DetalheUsuario> detalheUsuario = detalheUsuarioRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(detalheUsuario);
    }

    /**
     * {@code DELETE  /detalhe-usuarios/:id} : delete the "id" detalheUsuario.
     *
     * @param id the id of the detalheUsuario to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/detalhe-usuarios/{id}")
    public ResponseEntity<Void> deleteDetalheUsuario(@PathVariable Long id) {
        log.debug("REST request to delete DetalheUsuario : {}", id);
        detalheUsuarioRepository.deleteById(id);
        return ResponseEntity
            .noContent()
            .headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString()))
            .build();
    }
}
