import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
import { Translate, translate } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { IEscola } from 'app/shared/model/escola.model';
import { getEntities as getEscolas } from 'app/entities/escola/escola.reducer';
import { getEntity, updateEntity, createEntity, reset } from './unidade.reducer';
import { IUnidade } from 'app/shared/model/unidade.model';
import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IUnidadeUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const UnidadeUpdate = (props: IUnidadeUpdateProps) => {
  const [isNew] = useState(!props.match.params || !props.match.params.id);

  const { unidadeEntity, escolas, loading, updating } = props;

  const handleClose = () => {
    props.history.push('/unidade' + props.location.search);
  };

  useEffect(() => {
    if (isNew) {
      props.reset();
    } else {
      props.getEntity(props.match.params.id);
    }

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
        ...unidadeEntity,
        ...values,
        escolaUnidade: escolas.find(it => it.id.toString() === values.escolaUnidadeId.toString()),
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
          <h2 id="escolaOnlineApp.unidade.home.createOrEditLabel" data-cy="UnidadeCreateUpdateHeading">
            <Translate contentKey="escolaOnlineApp.unidade.home.createOrEditLabel">Create or edit a Unidade</Translate>
          </h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <AvForm model={isNew ? {} : unidadeEntity} onSubmit={saveEntity}>
              {!isNew ? (
                <AvGroup>
                  <Label for="unidade-id">
                    <Translate contentKey="global.field.id">ID</Translate>
                  </Label>
                  <AvInput id="unidade-id" type="text" className="form-control" name="id" required readOnly />
                </AvGroup>
              ) : null}
              <AvGroup>
                <Label id="nomeLabel" for="unidade-nome">
                  <Translate contentKey="escolaOnlineApp.unidade.nome">Nome</Translate>
                </Label>
                <AvField id="unidade-nome" data-cy="nome" type="text" name="nome" />
              </AvGroup>
              <AvGroup>
                <Label id="cnpjLabel" for="unidade-cnpj">
                  <Translate contentKey="escolaOnlineApp.unidade.cnpj">Cnpj</Translate>
                </Label>
                <AvField id="unidade-cnpj" data-cy="cnpj" type="text" name="cnpj" />
              </AvGroup>
              <AvGroup>
                <Label id="enderecoLabel" for="unidade-endereco">
                  <Translate contentKey="escolaOnlineApp.unidade.endereco">Endereco</Translate>
                </Label>
                <AvField id="unidade-endereco" data-cy="endereco" type="text" name="endereco" />
              </AvGroup>
              <AvGroup>
                <Label id="complementoLabel" for="unidade-complemento">
                  <Translate contentKey="escolaOnlineApp.unidade.complemento">Complemento</Translate>
                </Label>
                <AvField id="unidade-complemento" data-cy="complemento" type="text" name="complemento" />
              </AvGroup>
              <AvGroup>
                <Label id="bairroLabel" for="unidade-bairro">
                  <Translate contentKey="escolaOnlineApp.unidade.bairro">Bairro</Translate>
                </Label>
                <AvField id="unidade-bairro" data-cy="bairro" type="text" name="bairro" />
              </AvGroup>
              <AvGroup>
                <Label id="cidadeLabel" for="unidade-cidade">
                  <Translate contentKey="escolaOnlineApp.unidade.cidade">Cidade</Translate>
                </Label>
                <AvField id="unidade-cidade" data-cy="cidade" type="text" name="cidade" />
              </AvGroup>
              <AvGroup>
                <Label id="cepLabel" for="unidade-cep">
                  <Translate contentKey="escolaOnlineApp.unidade.cep">Cep</Translate>
                </Label>
                <AvField id="unidade-cep" data-cy="cep" type="text" name="cep" />
              </AvGroup>
              <AvGroup>
                <Label id="telefoneComercialLabel" for="unidade-telefoneComercial">
                  <Translate contentKey="escolaOnlineApp.unidade.telefoneComercial">Telefone Comercial</Translate>
                </Label>
                <AvField id="unidade-telefoneComercial" data-cy="telefoneComercial" type="text" name="telefoneComercial" />
              </AvGroup>
              <AvGroup>
                <Label id="telefoneWhatsappLabel" for="unidade-telefoneWhatsapp">
                  <Translate contentKey="escolaOnlineApp.unidade.telefoneWhatsapp">Telefone Whatsapp</Translate>
                </Label>
                <AvField id="unidade-telefoneWhatsapp" data-cy="telefoneWhatsapp" type="text" name="telefoneWhatsapp" />
              </AvGroup>
              <AvGroup>
                <Label id="emailLabel" for="unidade-email">
                  <Translate contentKey="escolaOnlineApp.unidade.email">Email</Translate>
                </Label>
                <AvField id="unidade-email" data-cy="email" type="text" name="email" />
              </AvGroup>
              <AvGroup>
                <Label id="facebookLabel" for="unidade-facebook">
                  <Translate contentKey="escolaOnlineApp.unidade.facebook">Facebook</Translate>
                </Label>
                <AvField id="unidade-facebook" data-cy="facebook" type="text" name="facebook" />
              </AvGroup>
              <AvGroup>
                <Label id="observacoesLabel" for="unidade-observacoes">
                  <Translate contentKey="escolaOnlineApp.unidade.observacoes">Observacoes</Translate>
                </Label>
                <AvField id="unidade-observacoes" data-cy="observacoes" type="text" name="observacoes" />
              </AvGroup>
              <AvGroup>
                <Label for="unidade-escolaUnidade">
                  <Translate contentKey="escolaOnlineApp.unidade.escolaUnidade">Escola Unidade</Translate>
                </Label>
                <AvInput id="unidade-escolaUnidade" data-cy="escolaUnidade" type="select" className="form-control" name="escolaUnidadeId">
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
              <Button tag={Link} id="cancel-save" to="/unidade" replace color="info">
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
  escolas: storeState.escola.entities,
  unidadeEntity: storeState.unidade.entity,
  loading: storeState.unidade.loading,
  updating: storeState.unidade.updating,
  updateSuccess: storeState.unidade.updateSuccess,
});

const mapDispatchToProps = {
  getEscolas,
  getEntity,
  updateEntity,
  createEntity,
  reset,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(UnidadeUpdate);
