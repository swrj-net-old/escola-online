package com.swrj.net.escolaonline.web.rest;

import com.swrj.net.escolaonline.domain.Aluno;
import com.swrj.net.escolaonline.repository.AlunoRepository;
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
 * REST controller for managing {@link com.swrj.net.escolaonline.domain.Aluno}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class AlunoResource {

    private final Logger log = LoggerFactory.getLogger(AlunoResource.class);

    private static final String ENTITY_NAME = "aluno";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final AlunoRepository alunoRepository;

    public AlunoResource(AlunoRepository alunoRepository) {
        this.alunoRepository = alunoRepository;
    }

    /**
     * {@code POST  /alunos} : Create a new aluno.
     *
     * @param aluno the aluno to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new aluno, or with status {@code 400 (Bad Request)} if the aluno has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/alunos")
    public ResponseEntity<Aluno> createAluno(@RequestBody Aluno aluno) throws URISyntaxException {
        log.debug("REST request to save Aluno : {}", aluno);
        if (aluno.getId() != null) {
            throw new BadRequestAlertException("A new aluno cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Aluno result = alunoRepository.save(aluno);
        return ResponseEntity
            .created(new URI("/api/alunos/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /alunos/:id} : Updates an existing aluno.
     *
     * @param id the id of the aluno to save.
     * @param aluno the aluno to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated aluno,
     * or with status {@code 400 (Bad Request)} if the aluno is not valid,
     * or with status {@code 500 (Internal Server Error)} if the aluno couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/alunos/{id}")
    public ResponseEntity<Aluno> updateAluno(@PathVariable(value = "id", required = false) final Long id, @RequestBody Aluno aluno)
        throws URISyntaxException {
        log.debug("REST request to update Aluno : {}, {}", id, aluno);
        if (aluno.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, aluno.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!alunoRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Aluno result = alunoRepository.save(aluno);
        return ResponseEntity
            .ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, aluno.getId().toString()))
            .body(result);
    }

    /**
     * {@code PATCH  /alunos/:id} : Partial updates given fields of an existing aluno, field will ignore if it is null
     *
     * @param id the id of the aluno to save.
     * @param aluno the aluno to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated aluno,
     * or with status {@code 400 (Bad Request)} if the aluno is not valid,
     * or with status {@code 404 (Not Found)} if the aluno is not found,
     * or with status {@code 500 (Internal Server Error)} if the aluno couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PatchMapping(value = "/alunos/{id}", consumes = "application/merge-patch+json")
    public ResponseEntity<Aluno> partialUpdateAluno(@PathVariable(value = "id", required = false) final Long id, @RequestBody Aluno aluno)
        throws URISyntaxException {
        log.debug("REST request to partial update Aluno partially : {}, {}", id, aluno);
        if (aluno.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, aluno.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!alunoRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Optional<Aluno> result = alunoRepository
            .findById(aluno.getId())
            .map(
                existingAluno -> {
                    if (aluno.getDataNascimento() != null) {
                        existingAluno.setDataNascimento(aluno.getDataNascimento());
                    }
                    if (aluno.getTipoSanguineo() != null) {
                        existingAluno.setTipoSanguineo(aluno.getTipoSanguineo());
                    }
                    if (aluno.getNomePai() != null) {
                        existingAluno.setNomePai(aluno.getNomePai());
                    }
                    if (aluno.getTelefonePai() != null) {
                        existingAluno.setTelefonePai(aluno.getTelefonePai());
                    }
                    if (aluno.getNomeMae() != null) {
                        existingAluno.setNomeMae(aluno.getNomeMae());
                    }
                    if (aluno.getTelefoneMae() != null) {
                        existingAluno.setTelefoneMae(aluno.getTelefoneMae());
                    }
                    if (aluno.getNomeResponsavel() != null) {
                        existingAluno.setNomeResponsavel(aluno.getNomeResponsavel());
                    }
                    if (aluno.getCpfResponsavel() != null) {
                        existingAluno.setCpfResponsavel(aluno.getCpfResponsavel());
                    }
                    if (aluno.getObservacoes() != null) {
                        existingAluno.setObservacoes(aluno.getObservacoes());
                    }

                    return existingAluno;
                }
            )
            .map(alunoRepository::save);

        return ResponseUtil.wrapOrNotFound(
            result,
            HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, aluno.getId().toString())
        );
    }

    /**
     * {@code GET  /alunos} : get all the alunos.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of alunos in body.
     */
    @GetMapping("/alunos")
    public List<Aluno> getAllAlunos() {
        log.debug("REST request to get all Alunos");
        return alunoRepository.findAll();
    }

    /**
     * {@code GET  /alunos/:id} : get the "id" aluno.
     *
     * @param id the id of the aluno to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the aluno, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/alunos/{id}")
    public ResponseEntity<Aluno> getAluno(@PathVariable Long id) {
        log.debug("REST request to get Aluno : {}", id);
        Optional<Aluno> aluno = alunoRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(aluno);
    }

    /**
     * {@code DELETE  /alunos/:id} : delete the "id" aluno.
     *
     * @param id the id of the aluno to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/alunos/{id}")
    public ResponseEntity<Void> deleteAluno(@PathVariable Long id) {
        log.debug("REST request to delete Aluno : {}", id);
        alunoRepository.deleteById(id);
        return ResponseEntity
            .noContent()
            .headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString()))
            .build();
    }
}
