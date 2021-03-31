package com.swrj.net.escolaonline.service;

import com.swrj.net.escolaonline.domain.Unidade;
import com.swrj.net.escolaonline.repository.UnidadeRepository;
import java.util.Optional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * Service Implementation for managing {@link Unidade}.
 */
@Service
@Transactional
public class UnidadeService {

    private final Logger log = LoggerFactory.getLogger(UnidadeService.class);

    private final UnidadeRepository unidadeRepository;

    public UnidadeService(UnidadeRepository unidadeRepository) {
        this.unidadeRepository = unidadeRepository;
    }

    /**
     * Save a unidade.
     *
     * @param unidade the entity to save.
     * @return the persisted entity.
     */
    public Unidade save(Unidade unidade) {
        log.debug("Request to save Unidade : {}", unidade);
        return unidadeRepository.save(unidade);
    }

    /**
     * Partially update a unidade.
     *
     * @param unidade the entity to update partially.
     * @return the persisted entity.
     */
    public Optional<Unidade> partialUpdate(Unidade unidade) {
        log.debug("Request to partially update Unidade : {}", unidade);

        return unidadeRepository
            .findById(unidade.getId())
            .map(
                existingUnidade -> {
                    if (unidade.getNome() != null) {
                        existingUnidade.setNome(unidade.getNome());
                    }
                    if (unidade.getCnpj() != null) {
                        existingUnidade.setCnpj(unidade.getCnpj());
                    }
                    if (unidade.getEndereco() != null) {
                        existingUnidade.setEndereco(unidade.getEndereco());
                    }
                    if (unidade.getComplemento() != null) {
                        existingUnidade.setComplemento(unidade.getComplemento());
                    }
                    if (unidade.getBairro() != null) {
                        existingUnidade.setBairro(unidade.getBairro());
                    }
                    if (unidade.getCidade() != null) {
                        existingUnidade.setCidade(unidade.getCidade());
                    }
                    if (unidade.getCep() != null) {
                        existingUnidade.setCep(unidade.getCep());
                    }
                    if (unidade.getTelefoneComercial() != null) {
                        existingUnidade.setTelefoneComercial(unidade.getTelefoneComercial());
                    }
                    if (unidade.getTelefoneWhatsapp() != null) {
                        existingUnidade.setTelefoneWhatsapp(unidade.getTelefoneWhatsapp());
                    }
                    if (unidade.getEmail() != null) {
                        existingUnidade.setEmail(unidade.getEmail());
                    }
                    if (unidade.getFacebook() != null) {
                        existingUnidade.setFacebook(unidade.getFacebook());
                    }
                    if (unidade.getObservacoes() != null) {
                        existingUnidade.setObservacoes(unidade.getObservacoes());
                    }

                    return existingUnidade;
                }
            )
            .map(unidadeRepository::save);
    }

    /**
     * Get all the unidades.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    @Transactional(readOnly = true)
    public Page<Unidade> findAll(Pageable pageable) {
        log.debug("Request to get all Unidades");
        return unidadeRepository.findAll(pageable);
    }

    /**
     * Get one unidade by id.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    @Transactional(readOnly = true)
    public Optional<Unidade> findOne(Long id) {
        log.debug("Request to get Unidade : {}", id);
        return unidadeRepository.findById(id);
    }

    /**
     * Delete the unidade by id.
     *
     * @param id the id of the entity.
     */
    public void delete(Long id) {
        log.debug("Request to delete Unidade : {}", id);
        unidadeRepository.deleteById(id);
    }
}
