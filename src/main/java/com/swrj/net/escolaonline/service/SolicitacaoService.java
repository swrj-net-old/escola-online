package com.swrj.net.escolaonline.service;

import com.swrj.net.escolaonline.domain.Solicitacao;
import com.swrj.net.escolaonline.repository.SolicitacaoRepository;
import java.util.Optional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * Service Implementation for managing {@link Solicitacao}.
 */
@Service
@Transactional
public class SolicitacaoService {
    private final Logger log = LoggerFactory.getLogger(SolicitacaoService.class);

    private final SolicitacaoRepository solicitacaoRepository;

    public SolicitacaoService(SolicitacaoRepository solicitacaoRepository) {
        this.solicitacaoRepository = solicitacaoRepository;
    }

    /**
     * Save a solicitacao.
     *
     * @param solicitacao the entity to save.
     * @return the persisted entity.
     */
    public Solicitacao save(Solicitacao solicitacao) {
        log.debug("Request to save Solicitacao : {}", solicitacao);
        return solicitacaoRepository.save(solicitacao);
    }

    /**
     * Get all the solicitacaos.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    @Transactional(readOnly = true)
    public Page<Solicitacao> findAll(Pageable pageable) {
        log.debug("Request to get all Solicitacaos");
        return solicitacaoRepository.findAll(pageable);
    }

    /**
     * Get one solicitacao by id.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    @Transactional(readOnly = true)
    public Optional<Solicitacao> findOne(Long id) {
        log.debug("Request to get Solicitacao : {}", id);
        return solicitacaoRepository.findById(id);
    }

    /**
     * Delete the solicitacao by id.
     *
     * @param id the id of the entity.
     */
    public void delete(Long id) {
        log.debug("Request to delete Solicitacao : {}", id);
        solicitacaoRepository.deleteById(id);
    }
}
