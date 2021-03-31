package com.swrj.net.escolaonline.repository;

import com.swrj.net.escolaonline.domain.Chamada;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data SQL repository for the Chamada entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ChamadaRepository extends JpaRepository<Chamada, Long> {}
