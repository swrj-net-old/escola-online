package com.swrj.net.escolaonline.repository;

import com.swrj.net.escolaonline.domain.Unidade;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data SQL repository for the Unidade entity.
 */
@SuppressWarnings("unused")
@Repository
public interface UnidadeRepository extends JpaRepository<Unidade, Long> {}
