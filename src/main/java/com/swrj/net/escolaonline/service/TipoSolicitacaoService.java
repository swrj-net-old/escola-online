package com.swrj.net.escolaonline.service;

import com.swrj.net.escolaonline.domain.TipoSolicitacao;
import com.swrj.net.escolaonline.repository.TipoSolicitacaoRepository;
import java.util.Optional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * Service Implementation for managing {@link TipoSolicitacao}.
 */
@Service
@Transactional
public class TipoSolicitacaoService {

    private final Logger log = LoggerFactory.getLogger(TipoSolicitacaoService.class);

    private final TipoSolicitacaoRepository tipoSolicitacaoRepository;

    public TipoSolicitacaoService(TipoSolicitacaoRepository tipoSolicitacaoRepository) {
        this.tipoSolicitacaoRepository = tipoSolicitacaoRepository;
    }

    /**
     * Save a tipoSolicitacao.
     *
     * @param tipoSolicitacao the entity to save.
     * @return the persisted entity.
     */
    public TipoSolicitacao save(TipoSolicitacao tipoSolicitacao) {
        log.debug("Request to save TipoSolicitacao : {}", tipoSolicitacao);
        return tipoSolicitacaoRepository.save(tipoSolicitacao);
    }

    /**
     * Partially update a tipoSolicitacao.
     *
     * @param tipoSolicitacao the entity to update partially.
     * @return the persisted entity.
     */
    public Optional<TipoSolicitacao> partialUpdate(TipoSolicitacao tipoSolicitacao) {
        log.debug("Request to partially update TipoSolicitacao : {}", tipoSolicitacao);

        return tipoSolicitacaoRepository
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
    }

    /**
     * Get all the tipoSolicitacaos.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    @Transactional(readOnly = true)
    public Page<TipoSolicitacao> findAll(Pageable pageable) {
        log.debug("Request to get all TipoSolicitacaos");
        return tipoSolicitacaoRepository.findAll(pageable);
    }

    /**
     * Get one tipoSolicitacao by id.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    @Transactional(readOnly = true)
    public Optional<TipoSolicitacao> findOne(Long id) {
        log.debug("Request to get TipoSolicitacao : {}", id);
        return tipoSolicitacaoRepository.findById(id);
    }

    /**
     * Delete the tipoSolicitacao by id.
     *
     * @param id the id of the entity.
     */
    public void delete(Long id) {
        log.debug("Request to delete TipoSolicitacao : {}", id);
        tipoSolicitacaoRepository.deleteById(id);
    }
}
