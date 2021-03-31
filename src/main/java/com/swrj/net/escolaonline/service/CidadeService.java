package com.swrj.net.escolaonline.service;

import com.swrj.net.escolaonline.domain.Cidade;
import com.swrj.net.escolaonline.repository.CidadeRepository;
import java.util.Optional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * Service Implementation for managing {@link Cidade}.
 */
@Service
@Transactional
public class CidadeService {

    private final Logger log = LoggerFactory.getLogger(CidadeService.class);

    private final CidadeRepository cidadeRepository;

    public CidadeService(CidadeRepository cidadeRepository) {
        this.cidadeRepository = cidadeRepository;
    }

    /**
     * Save a cidade.
     *
     * @param cidade the entity to save.
     * @return the persisted entity.
     */
    public Cidade save(Cidade cidade) {
        log.debug("Request to save Cidade : {}", cidade);
        return cidadeRepository.save(cidade);
    }

    /**
     * Partially update a cidade.
     *
     * @param cidade the entity to update partially.
     * @return the persisted entity.
     */
    public Optional<Cidade> partialUpdate(Cidade cidade) {
        log.debug("Request to partially update Cidade : {}", cidade);

        return cidadeRepository
            .findById(cidade.getId())
            .map(
                existingCidade -> {
                    if (cidade.getNome() != null) {
                        existingCidade.setNome(cidade.getNome());
                    }
                    if (cidade.getUf() != null) {
                        existingCidade.setUf(cidade.getUf());
                    }

                    return existingCidade;
                }
            )
            .map(cidadeRepository::save);
    }

    /**
     * Get all the cidades.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    @Transactional(readOnly = true)
    public Page<Cidade> findAll(Pageable pageable) {
        log.debug("Request to get all Cidades");
        return cidadeRepository.findAll(pageable);
    }

    /**
     * Get one cidade by id.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    @Transactional(readOnly = true)
    public Optional<Cidade> findOne(Long id) {
        log.debug("Request to get Cidade : {}", id);
        return cidadeRepository.findById(id);
    }

    /**
     * Delete the cidade by id.
     *
     * @param id the id of the entity.
     */
    public void delete(Long id) {
        log.debug("Request to delete Cidade : {}", id);
        cidadeRepository.deleteById(id);
    }
}
