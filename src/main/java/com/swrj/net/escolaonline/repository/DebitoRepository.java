package com.swrj.net.escolaonline.repository;

import com.swrj.net.escolaonline.domain.Debito;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data  repository for the Debito entity.
 */
@SuppressWarnings("unused")
@Repository
public interface DebitoRepository extends JpaRepository<Debito, Long> {
}
