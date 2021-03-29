package com.swrj.net.escolaonline.repository;

import com.swrj.net.escolaonline.domain.HistoricoDebito;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data  repository for the HistoricoDebito entity.
 */
@SuppressWarnings("unused")
@Repository
public interface HistoricoDebitoRepository extends JpaRepository<HistoricoDebito, Long> {
}
