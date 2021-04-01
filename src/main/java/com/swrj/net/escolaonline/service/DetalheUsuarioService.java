package com.swrj.net.escolaonline.service;

import com.swrj.net.escolaonline.domain.DetalheUsuario;
import com.swrj.net.escolaonline.repository.DetalheUsuarioRepository;
import java.util.Optional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * Service Implementation for managing {@link DetalheUsuario}.
 */
@Service
@Transactional
public class DetalheUsuarioService {
    private final Logger log = LoggerFactory.getLogger(DetalheUsuarioService.class);

    private final DetalheUsuarioRepository detalheUsuarioRepository;

    public DetalheUsuarioService(DetalheUsuarioRepository detalheUsuarioRepository) {
        this.detalheUsuarioRepository = detalheUsuarioRepository;
    }

    /**
     * Save a detalheUsuario.
     *
     * @param detalheUsuario the entity to save.
     * @return the persisted entity.
     */
    public DetalheUsuario save(DetalheUsuario detalheUsuario) {
        log.debug("Request to save DetalheUsuario : {}", detalheUsuario);
        return detalheUsuarioRepository.save(detalheUsuario);
    }

    /**
     * Get all the detalheUsuarios.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    @Transactional(readOnly = true)
    public Page<DetalheUsuario> findAll(Pageable pageable) {
        log.debug("Request to get all DetalheUsuarios");
        return detalheUsuarioRepository.findAll(pageable);
    }

    /**
     * Get one detalheUsuario by id.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    @Transactional(readOnly = true)
    public Optional<DetalheUsuario> findOne(Long id) {
        log.debug("Request to get DetalheUsuario : {}", id);
        return detalheUsuarioRepository.findById(id);
    }

    /**
     * Delete the detalheUsuario by id.
     *
     * @param id the id of the entity.
     */
    public void delete(Long id) {
        log.debug("Request to delete DetalheUsuario : {}", id);
        detalheUsuarioRepository.deleteById(id);
    }
}
