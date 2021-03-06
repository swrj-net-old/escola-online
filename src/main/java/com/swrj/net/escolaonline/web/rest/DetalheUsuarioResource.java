package com.swrj.net.escolaonline.web.rest;

import com.swrj.net.escolaonline.domain.DetalheUsuario;
import com.swrj.net.escolaonline.service.DetalheUsuarioService;
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
 * REST controller for managing {@link com.swrj.net.escolaonline.domain.DetalheUsuario}.
 */
@RestController
@RequestMapping("/api")
public class DetalheUsuarioResource {
    private final Logger log = LoggerFactory.getLogger(DetalheUsuarioResource.class);

    private static final String ENTITY_NAME = "detalheUsuario";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final DetalheUsuarioService detalheUsuarioService;

    public DetalheUsuarioResource(DetalheUsuarioService detalheUsuarioService) {
        this.detalheUsuarioService = detalheUsuarioService;
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
        DetalheUsuario result = detalheUsuarioService.save(detalheUsuario);
        return ResponseEntity
            .created(new URI("/api/detalhe-usuarios/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /detalhe-usuarios} : Updates an existing detalheUsuario.
     *
     * @param detalheUsuario the detalheUsuario to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated detalheUsuario,
     * or with status {@code 400 (Bad Request)} if the detalheUsuario is not valid,
     * or with status {@code 500 (Internal Server Error)} if the detalheUsuario couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/detalhe-usuarios")
    public ResponseEntity<DetalheUsuario> updateDetalheUsuario(@RequestBody DetalheUsuario detalheUsuario) throws URISyntaxException {
        log.debug("REST request to update DetalheUsuario : {}", detalheUsuario);
        if (detalheUsuario.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        DetalheUsuario result = detalheUsuarioService.save(detalheUsuario);
        return ResponseEntity
            .ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, detalheUsuario.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /detalhe-usuarios} : get all the detalheUsuarios.
     *
     * @param pageable the pagination information.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of detalheUsuarios in body.
     */
    @GetMapping("/detalhe-usuarios")
    public ResponseEntity<List<DetalheUsuario>> getAllDetalheUsuarios(Pageable pageable) {
        log.debug("REST request to get a page of DetalheUsuarios");
        Page<DetalheUsuario> page = detalheUsuarioService.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(ServletUriComponentsBuilder.fromCurrentRequest(), page);
        return ResponseEntity.ok().headers(headers).body(page.getContent());
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
        Optional<DetalheUsuario> detalheUsuario = detalheUsuarioService.findOne(id);
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
        detalheUsuarioService.delete(id);
        return ResponseEntity
            .noContent()
            .headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString()))
            .build();
    }
}
