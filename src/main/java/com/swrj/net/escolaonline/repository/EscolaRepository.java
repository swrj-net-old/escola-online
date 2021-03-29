package com.swrj.net.escolaonline.repository;

import com.swrj.net.escolaonline.domain.Escola;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data SQL repository for the Escola entity.
 */
@SuppressWarnings("unused")
@Repository
public interface EscolaRepository extends JpaRepository<Escola, Long> {}
