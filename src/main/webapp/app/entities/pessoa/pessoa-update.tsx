import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
import { Translate, translate } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { ICidade } from 'app/shared/model/cidade.model';
import { getEntities as getCidades } from 'app/entities/cidade/cidade.reducer';
import { IEscola } from 'app/shared/model/escola.model';
import { getEntities as getEscolas } from 'app/entities/escola/escola.reducer';
import { getEntity, updateEntity, createEntity, reset } from './pessoa.reducer';
import { IPessoa } from 'app/shared/model/pessoa.model';
import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IPessoaUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const PessoaUpdate = (props: IPessoaUpdateProps) => {
  const [isNew] = useState(!props.match.params || !props.match.params.id);

  const { pessoaEntity, cidades, escolas, loading, updating } = props;

  const handleClose = () => {
    props.history.push('/pessoa' + props.location.search);
  };

  useEffect(() => {
    if (isNew) {
      props.reset();
    } else {
      props.getEntity(props.match.params.id);
    }

    props.getCidades();
    props.getEscolas();
  }, []);

  useEffect(() => {
    if (props.updateSuccess) {
      handleClose();
    }
  }, [props.updateSuccess]);

  const saveEntity = (event, errors, values) => {
    if (errors.length === 0) {
      const entity = {
        ...pessoaEntity,
        ...values,
        cidadePessoa: cidades.find(it => it.id.toString() === values.cidadePessoaId.toString()),
        escolaPessoa: escolas.find(it => it.id.toString() === values.escolaPessoaId.toString()),
      };

      if (isNew) {
        props.createEntity(entity);
      } else {
        props.updateEntity(entity);
      }
    }
  };

  return (
    <div>
      <Row className="justify-content-center">
        <Col md="8">
          <h2 id="escolaOnlineApp.pessoa.home.createOrEditLabel" data-cy="PessoaCreateUpdateHeading">
            <Translate contentKey="escolaOnlineApp.pessoa.home.createOrEditLabel">Create or edit a Pessoa</Translate>
          </h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <AvForm model={isNew ? {} : pessoaEntity} onSubmit={saveEntity}>
              {!isNew ? (
                <AvGroup>
                  <Label for="pessoa-id">
                    <Translate contentKey="global.field.id">ID</Translate>
                  </Label>
                  <AvInput id="pessoa-id" type="text" className="form-control" name="id" required readOnly />
                </AvGroup>
              ) : null}
              <AvGroup>
                <Label id="nomeLabel" for="pessoa-nome">
                  <Translate contentKey="escolaOnlineApp.pessoa.nome">Nome</Translate>
                </Label>
                <AvField id="pessoa-nome" data-cy="nome" type="text" name="nome" />
              </AvGroup>
              <AvGroup>
                <Label id="cpfLabel" for="pessoa-cpf">
                  <Translate contentKey="escolaOnlineApp.pessoa.cpf">Cpf</Translate>
                </Label>
                <AvField id="pessoa-cpf" data-cy="cpf" type="text" name="cpf" />
              </AvGroup>
              <AvGroup>
                <Label id="rgLabel" for="pessoa-rg">
                  <Translate contentKey="escolaOnlineApp.pessoa.rg">Rg</Translate>
                </Label>
                <AvField id="pessoa-rg" data-cy="rg" type="text" name="rg" />
              </AvGroup>
              <AvGroup>
                <Label id="enderecoLabel" for="pessoa-endereco">
                  <Translate contentKey="escolaOnlineApp.pessoa.endereco">Endereco</Translate>
                </Label>
                <AvField id="pessoa-endereco" data-cy="endereco" type="text" name="endereco" />
              </AvGroup>
              <AvGroup>
                <Label id="complementoLabel" for="pessoa-complemento">
                  <Translate contentKey="escolaOnlineApp.pessoa.complemento">Complemento</Translate>
                </Label>
                <AvField id="pessoa-complemento" data-cy="complemento" type="text" name="complemento" />
              </AvGroup>
              <AvGroup>
                <Label id="bairroLabel" for="pessoa-bairro">
                  <Translate contentKey="escolaOnlineApp.pessoa.bairro">Bairro</Translate>
                </Label>
                <AvField id="pessoa-bairro" data-cy="bairro" type="text" name="bairro" />
              </AvGroup>
              <AvGroup>
                <Label id="cidadeLabel" for="pessoa-cidade">
                  <Translate contentKey="escolaOnlineApp.pessoa.cidade">Cidade</Translate>
                </Label>
                <AvField id="pessoa-cidade" data-cy="cidade" type="text" name="cidade" />
              </AvGroup>
              <AvGroup>
                <Label id="cepLabel" for="pessoa-cep">
                  <Translate contentKey="escolaOnlineApp.pessoa.cep">Cep</Translate>
                </Label>
                <AvField id="pessoa-cep" data-cy="cep" type="text" name="cep" />
              </AvGroup>
              <AvGroup>
                <Label id="telefoneCelularLabel" for="pessoa-telefoneCelular">
                  <Translate contentKey="escolaOnlineApp.pessoa.telefoneCelular">Telefone Celular</Translate>
                </Label>
                <AvField id="pessoa-telefoneCelular" data-cy="telefoneCelular" type="text" name="telefoneCelular" />
              </AvGroup>
              <AvGroup>
                <Label id="telefoneResidencialLabel" for="pessoa-telefoneResidencial">
                  <Translate contentKey="escolaOnlineApp.pessoa.telefoneResidencial">Telefone Residencial</Translate>
                </Label>
                <AvField id="pessoa-telefoneResidencial" data-cy="telefoneResidencial" type="text" name="telefoneResidencial" />
              </AvGroup>
              <AvGroup>
                <Label id="telefoneComercialLabel" for="pessoa-telefoneComercial">
                  <Translate contentKey="escolaOnlineApp.pessoa.telefoneComercial">Telefone Comercial</Translate>
                </Label>
                <AvField id="pessoa-telefoneComercial" data-cy="telefoneComercial" type="text" name="telefoneComercial" />
              </AvGroup>
              <AvGroup>
                <Label id="emailLabel" for="pessoa-email">
                  <Translate contentKey="escolaOnlineApp.pessoa.email">Email</Translate>
                </Label>
                <AvField id="pessoa-email" data-cy="email" type="text" name="email" />
              </AvGroup>
              <AvGroup>
                <Label id="observacoesLabel" for="pessoa-observacoes">
                  <Translate contentKey="escolaOnlineApp.pessoa.observacoes">Observacoes</Translate>
                </Label>
                <AvField id="pessoa-observacoes" data-cy="observacoes" type="text" name="observacoes" />
              </AvGroup>
              <AvGroup>
                <Label for="pessoa-cidadePessoa">
                  <Translate contentKey="escolaOnlineApp.pessoa.cidadePessoa">Cidade Pessoa</Translate>
                </Label>
                <AvInput id="pessoa-cidadePessoa" data-cy="cidadePessoa" type="select" className="form-control" name="cidadePessoaId">
                  <option value="" key="0" />
                  {cidades
                    ? cidades.map(otherEntity => (
                        <option value={otherEntity.id} key={otherEntity.id}>
                          {otherEntity.id}
                        </option>
                      ))
                    : null}
                </AvInput>
              </AvGroup>
              <AvGroup>
                <Label for="pessoa-escolaPessoa">
                  <Translate contentKey="escolaOnlineApp.pessoa.escolaPessoa">Escola Pessoa</Translate>
                </Label>
                <AvInput id="pessoa-escolaPessoa" data-cy="escolaPessoa" type="select" className="form-control" name="escolaPessoaId">
                  <option value="" key="0" />
                  {escolas
                    ? escolas.map(otherEntity => (
                        <option value={otherEntity.id} key={otherEntity.id}>
                          {otherEntity.id}
                        </option>
                      ))
                    : null}
                </AvInput>
              </AvGroup>
              <Button tag={Link} id="cancel-save" to="/pessoa" replace color="info">
                <FontAwesomeIcon icon="arrow-left" />
                &nbsp;
                <span className="d-none d-md-inline">
                  <Translate contentKey="entity.action.back">Back</Translate>
                </span>
              </Button>
              &nbsp;
              <Button color="primary" id="save-entity" data-cy="entityCreateSaveButton" type="submit" disabled={updating}>
                <FontAwesomeIcon icon="save" />
                &nbsp;
                <Translate contentKey="entity.action.save">Save</Translate>
              </Button>
            </AvForm>
          )}
        </Col>
      </Row>
    </div>
  );
};

const mapStateToProps = (storeState: IRootState) => ({
  cidades: storeState.cidade.entities,
  escolas: storeState.escola.entities,
  pessoaEntity: storeState.pessoa.entity,
  loading: storeState.pessoa.loading,
  updating: storeState.pessoa.updating,
  updateSuccess: storeState.pessoa.updateSuccess,
});

const mapDispatchToProps = {
  getCidades,
  getEscolas,
  getEntity,
  updateEntity,
  createEntity,
  reset,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(PessoaUpdate);
