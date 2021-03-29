package com.swrj.net.escolaonline.repository;

import com.swrj.net.escolaonline.domain.Serie;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data  repository for the Serie entity.
 */
@SuppressWarnings("unused")
@Repository
public interface SerieRepository extends JpaRepository<Serie, Long> {
}
