package com.swrj.net.escolaonline.repository;

import com.swrj.net.escolaonline.domain.Diretor;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data SQL repository for the Diretor entity.
 */
@SuppressWarnings("unused")
@Repository
public interface DiretorRepository extends JpaRepository<Diretor, Long> {}
