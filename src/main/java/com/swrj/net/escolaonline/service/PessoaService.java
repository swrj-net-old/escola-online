package com.swrj.net.escolaonline.service;

import com.swrj.net.escolaonline.domain.Pessoa;
import com.swrj.net.escolaonline.repository.PessoaRepository;
import java.util.Optional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * Service Implementation for managing {@link Pessoa}.
 */
@Service
@Transactional
public class PessoaService {

    private final Logger log = LoggerFactory.getLogger(PessoaService.class);

    private final PessoaRepository pessoaRepository;

    public PessoaService(PessoaRepository pessoaRepository) {
        this.pessoaRepository = pessoaRepository;
    }

    /**
     * Save a pessoa.
     *
     * @param pessoa the entity to save.
     * @return the persisted entity.
     */
    public Pessoa save(Pessoa pessoa) {
        log.debug("Request to save Pessoa : {}", pessoa);
        return pessoaRepository.save(pessoa);
    }

    /**
     * Partially update a pessoa.
     *
     * @param pessoa the entity to update partially.
     * @return the persisted entity.
     */
    public Optional<Pessoa> partialUpdate(Pessoa pessoa) {
        log.debug("Request to partially update Pessoa : {}", pessoa);

        return pessoaRepository
            .findById(pessoa.getId())
            .map(
                existingPessoa -> {
                    if (pessoa.getNome() != null) {
                        existingPessoa.setNome(pessoa.getNome());
                    }
                    if (pessoa.getCpf() != null) {
                        existingPessoa.setCpf(pessoa.getCpf());
                    }
                    if (pessoa.getRg() != null) {
                        existingPessoa.setRg(pessoa.getRg());
                    }
                    if (pessoa.getEndereco() != null) {
                        existingPessoa.setEndereco(pessoa.getEndereco());
                    }
                    if (pessoa.getComplemento() != null) {
                        existingPessoa.setComplemento(pessoa.getComplemento());
                    }
                    if (pessoa.getBairro() != null) {
                        existingPessoa.setBairro(pessoa.getBairro());
                    }
                    if (pessoa.getCidade() != null) {
                        existingPessoa.setCidade(pessoa.getCidade());
                    }
                    if (pessoa.getCep() != null) {
                        existingPessoa.setCep(pessoa.getCep());
                    }
                    if (pessoa.getTelefoneCelular() != null) {
                        existingPessoa.setTelefoneCelular(pessoa.getTelefoneCelular());
                    }
                    if (pessoa.getTelefoneResidencial() != null) {
                        existingPessoa.setTelefoneResidencial(pessoa.getTelefoneResidencial());
                    }
                    if (pessoa.getTelefoneComercial() != null) {
                        existingPessoa.setTelefoneComercial(pessoa.getTelefoneComercial());
                    }
                    if (pessoa.getEmail() != null) {
                        existingPessoa.setEmail(pessoa.getEmail());
                    }
                    if (pessoa.getObservacoes() != null) {
                        existingPessoa.setObservacoes(pessoa.getObservacoes());
                    }

                    return existingPessoa;
                }
            )
            .map(pessoaRepository::save);
    }

    /**
     * Get all the pessoas.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    @Transactional(readOnly = true)
    public Page<Pessoa> findAll(Pageable pageable) {
        log.debug("Request to get all Pessoas");
        return pessoaRepository.findAll(pageable);
    }

    /**
     * Get one pessoa by id.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    @Transactional(readOnly = true)
    public Optional<Pessoa> findOne(Long id) {
        log.debug("Request to get Pessoa : {}", id);
        return pessoaRepository.findById(id);
    }

    /**
     * Delete the pessoa by id.
     *
     * @param id the id of the entity.
     */
    public void delete(Long id) {
        log.debug("Request to delete Pessoa : {}", id);
        pessoaRepository.deleteById(id);
    }
}
