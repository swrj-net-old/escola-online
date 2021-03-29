package com.swrj.net.escolaonline.web.rest;

import com.swrj.net.escolaonline.domain.Diretor;
import com.swrj.net.escolaonline.repository.DiretorRepository;
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
 * REST controller for managing {@link com.swrj.net.escolaonline.domain.Diretor}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class DiretorResource {

    private final Logger log = LoggerFactory.getLogger(DiretorResource.class);

    private static final String ENTITY_NAME = "diretor";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final DiretorRepository diretorRepository;

    public DiretorResource(DiretorRepository diretorRepository) {
        this.diretorRepository = diretorRepository;
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
        Diretor result = diretorRepository.save(diretor);
        return ResponseEntity
            .created(new URI("/api/diretors/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /diretors/:id} : Updates an existing diretor.
     *
     * @param id the id of the diretor to save.
     * @param diretor the diretor to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated diretor,
     * or with status {@code 400 (Bad Request)} if the diretor is not valid,
     * or with status {@code 500 (Internal Server Error)} if the diretor couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/diretors/{id}")
    public ResponseEntity<Diretor> updateDiretor(@PathVariable(value = "id", required = false) final Long id, @RequestBody Diretor diretor)
        throws URISyntaxException {
        log.debug("REST request to update Diretor : {}, {}", id, diretor);
        if (diretor.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, diretor.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!diretorRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Diretor result = diretorRepository.save(diretor);
        return ResponseEntity
            .ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, diretor.getId().toString()))
            .body(result);
    }

    /**
     * {@code PATCH  /diretors/:id} : Partial updates given fields of an existing diretor, field will ignore if it is null
     *
     * @param id the id of the diretor to save.
     * @param diretor the diretor to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated diretor,
     * or with status {@code 400 (Bad Request)} if the diretor is not valid,
     * or with status {@code 404 (Not Found)} if the diretor is not found,
     * or with status {@code 500 (Internal Server Error)} if the diretor couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PatchMapping(value = "/diretors/{id}", consumes = "application/merge-patch+json")
    public ResponseEntity<Diretor> partialUpdateDiretor(
        @PathVariable(value = "id", required = false) final Long id,
        @RequestBody Diretor diretor
    ) throws URISyntaxException {
        log.debug("REST request to partial update Diretor partially : {}, {}", id, diretor);
        if (diretor.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, diretor.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!diretorRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Optional<Diretor> result = diretorRepository
            .findById(diretor.getId())
            .map(
                existingDiretor -> {
                    if (diretor.getAnoLetivo() != null) {
                        existingDiretor.setAnoLetivo(diretor.getAnoLetivo());
                    }
                    if (diretor.getDataInicio() != null) {
                        existingDiretor.setDataInicio(diretor.getDataInicio());
                    }
                    if (diretor.getDataFim() != null) {
                        existingDiretor.setDataFim(diretor.getDataFim());
                    }

                    return existingDiretor;
                }
            )
            .map(diretorRepository::save);

        return ResponseUtil.wrapOrNotFound(
            result,
            HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, diretor.getId().toString())
        );
    }

    /**
     * {@code GET  /diretors} : get all the diretors.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of diretors in body.
     */
    @GetMapping("/diretors")
    public List<Diretor> getAllDiretors() {
        log.debug("REST request to get all Diretors");
        return diretorRepository.findAll();
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
        Optional<Diretor> diretor = diretorRepository.findById(id);
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
        diretorRepository.deleteById(id);
        return ResponseEntity
            .noContent()
            .headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString()))
            .build();
    }
}