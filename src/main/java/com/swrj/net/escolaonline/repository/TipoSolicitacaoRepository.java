package com.swrj.net.escolaonline.repository;

import com.swrj.net.escolaonline.domain.TipoSolicitacao;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data  repository for the TipoSolicitacao entity.
 */
@SuppressWarnings("unused")
@Repository
public interface TipoSolicitacaoRepository extends JpaRepository<TipoSolicitacao, Long> {
}
