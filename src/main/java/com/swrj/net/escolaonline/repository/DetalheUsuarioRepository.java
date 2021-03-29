package com.swrj.net.escolaonline.repository;

import com.swrj.net.escolaonline.domain.DetalheUsuario;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data  repository for the DetalheUsuario entity.
 */
@SuppressWarnings("unused")
@Repository
public interface DetalheUsuarioRepository extends JpaRepository<DetalheUsuario, Long> {
}
