package com.swrj.net.escolaonline.web.rest;

import com.swrj.net.escolaonline.domain.Diretor;
import com.swrj.net.escolaonline.service.DiretorService;
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
 * REST controller for managing {@link com.swrj.net.escolaonline.domain.Diretor}.
 */
@RestController
@RequestMapping("/api")
public class DiretorResource {
    private final Logger log = LoggerFactory.getLogger(DiretorResource.class);

    private static final String ENTITY_NAME = "diretor";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final DiretorService diretorService;

    public DiretorResource(DiretorService diretorService) {
        this.diretorService = diretorService;
    }

    /**
     * {@code POST  /diretors} : Create a new diretor.
     *
     * @param diretor the diretor to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new diretor, or with status {@code 400 (Bad Request)} if the diretor has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/diretors")
    public ResponseEntity<Diretor> createDiretor(@RequestBody Diretor diretor) throws URISyntaxException {
        log.debug("REST request to save Diretor : {}", diretor);
        if (diretor.getId() != null) {
            throw new BadRequestAlertException("A new diretor cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Diretor result = diretorService.save(diretor);
        return ResponseEntity
            .created(new URI("/api/diretors/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /diretors} : Updates an existing diretor.
     *
     * @param diretor the diretor to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated diretor,
     * or with status {@code 400 (Bad Request)} if the diretor is not valid,
     * or with status {@code 500 (Internal Server Error)} if the diretor couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/diretors")
    public ResponseEntity<Diretor> updateDiretor(@RequestBody Diretor diretor) throws URISyntaxException {
        log.debug("REST request to update Diretor : {}", diretor);
        if (diretor.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Diretor result = diretorService.save(diretor);
        return ResponseEntity
            .ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, diretor.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /diretors} : get all the diretors.
     *
     * @param pageable the pagination information.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of diretors in body.
     */
    @GetMapping("/diretors")
    public ResponseEntity<List<Diretor>> getAllDiretors(Pageable pageable) {
        log.debug("REST request to get a page of Diretors");
        Page<Diretor> page = diretorService.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(ServletUriComponentsBuilder.fromCurrentRequest(), page);
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    /**
     * {@code GET  /diretors/:id} : get the "id" diretor.
     *
     * @param id the id of the diretor to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the diretor, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/diretors/{id}")
    public ResponseEntity<Diretor> getDiretor(@PathVariable Long id) {
        log.debug("REST request to get Diretor : {}", id);
        Optional<Diretor> diretor = diretorService.findOne(id);
        return ResponseUtil.wrapOrNotFound(diretor);
    }

    /**
     * {@code DELETE  /diretors/:id} : delete the "id" diretor.
     *
     * @param id the id of the diretor to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/diretors/{id}")
    public ResponseEntity<Void> deleteDiretor(@PathVariable Long id) {
        log.debug("REST request to delete Diretor : {}", id);
        diretorService.delete(id);
        return ResponseEntity
            .noContent()
            .headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString()))
            .build();
    }
}
