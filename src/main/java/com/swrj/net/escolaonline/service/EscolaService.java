package com.swrj.net.escolaonline.service;

import com.swrj.net.escolaonline.domain.Escola;
import com.swrj.net.escolaonline.repository.EscolaRepository;
import java.util.Optional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * Service Implementation for managing {@link Escola}.
 */
@Service
@Transactional
public class EscolaService {

    private final Logger log = LoggerFactory.getLogger(EscolaService.class);

    private final EscolaRepository escolaRepository;

    public EscolaService(EscolaRepository escolaRepository) {
        this.escolaRepository = escolaRepository;
    }

    /**
     * Save a escola.
     *
     * @param escola the entity to save.
     * @return the persisted entity.
     */
    public Escola save(Escola escola) {
        log.debug("Request to save Escola : {}", escola);
        return escolaRepository.save(escola);
    }

    /**
     * Partially update a escola.
     *
     * @param escola the entity to update partially.
     * @return the persisted entity.
     */
    public Optional<Escola> partialUpdate(Escola escola) {
        log.debug("Request to partially update Escola : {}", escola);

        return escolaRepository
            .findById(escola.getId())
            .map(
                existingEscola -> {
                    if (escola.getNome() != null) {
                        existingEscola.setNome(escola.getNome());
                    }
                    if (escola.getRazaoSocial() != null) {
                        existingEscola.setRazaoSocial(escola.getRazaoSocial());
                    }
                    if (escola.getCnpjPrincipal() != null) {
                        existingEscola.setCnpjPrincipal(escola.getCnpjPrincipal());
                    }
                    if (escola.getUrl() != null) {
                        existingEscola.setUrl(escola.getUrl());
                    }
                    if (escola.getPrefixo() != null) {
                        existingEscola.setPrefixo(escola.getPrefixo());
                    }
                    if (escola.getResponsavelNome() != null) {
                        existingEscola.setResponsavelNome(escola.getResponsavelNome());
                    }
                    if (escola.getResponsavelCpf() != null) {
                        existingEscola.setResponsavelCpf(escola.getResponsavelCpf());
                    }
                    if (escola.getResponsavelEmail() != null) {
                        existingEscola.setResponsavelEmail(escola.getResponsavelEmail());
                    }
                    if (escola.getResponsavelCelular() != null) {
                        existingEscola.setResponsavelCelular(escola.getResponsavelCelular());
                    }

                    return existingEscola;
                }
            )
            .map(escolaRepository::save);
    }

    /**
     * Get all the escolas.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    @Transactional(readOnly = true)
    public Page<Escola> findAll(Pageable pageable) {
        log.debug("Request to get all Escolas");
        return escolaRepository.findAll(pageable);
    }

    /**
     * Get one escola by id.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    @Transactional(readOnly = true)
    public Optional<Escola> findOne(Long id) {
        log.debug("Request to get Escola : {}", id);
        return escolaRepository.findById(id);
    }

    /**
     * Delete the escola by id.
     *
     * @param id the id of the entity.
     */
    public void delete(Long id) {
        log.debug("Request to delete Escola : {}", id);
        escolaRepository.deleteById(id);
    }
}
