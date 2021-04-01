package com.swrj.net.escolaonline.repository;

import com.swrj.net.escolaonline.domain.Conteudo;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data  repository for the Conteudo entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ConteudoRepository extends JpaRepository<Conteudo, Long> {
}
