import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
import { Translate, translate } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { getEntity, updateEntity, createEntity, reset } from './escola.reducer';
import { IEscola } from 'app/shared/model/escola.model';
import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IEscolaUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const EscolaUpdate = (props: IEscolaUpdateProps) => {
  const [isNew] = useState(!props.match.params || !props.match.params.id);

  const { escolaEntity, loading, updating } = props;

  const handleClose = () => {
    props.history.push('/escola' + props.location.search);
  };

  useEffect(() => {
    if (isNew) {
      props.reset();
    } else {
      props.getEntity(props.match.params.id);
    }
  }, []);

  useEffect(() => {
    if (props.updateSuccess) {
      handleClose();
    }
  }, [props.updateSuccess]);

  const saveEntity = (event, errors, values) => {
    if (errors.length === 0) {
      const entity = {
        ...escolaEntity,
        ...values,
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
          <h2 id="escolaOnlineApp.escola.home.createOrEditLabel" data-cy="EscolaCreateUpdateHeading">
            <Translate contentKey="escolaOnlineApp.escola.home.createOrEditLabel">Create or edit a Escola</Translate>
          </h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <AvForm model={isNew ? {} : escolaEntity} onSubmit={saveEntity}>
              {!isNew ? (
                <AvGroup>
                  <Label for="escola-id">
                    <Translate contentKey="global.field.id">ID</Translate>
                  </Label>
                  <AvInput id="escola-id" type="text" className="form-control" name="id" required readOnly />
                </AvGroup>
              ) : null}
              <AvGroup>
                <Label id="nomeLabel" for="escola-nome">
                  <Translate contentKey="escolaOnlineApp.escola.nome">Nome</Translate>
                </Label>
                <AvField id="escola-nome" data-cy="nome" type="text" name="nome" />
              </AvGroup>
              <AvGroup>
                <Label id="razaoSocialLabel" for="escola-razaoSocial">
                  <Translate contentKey="escolaOnlineApp.escola.razaoSocial">Razao Social</Translate>
                </Label>
                <AvField id="escola-razaoSocial" data-cy="razaoSocial" type="text" name="razaoSocial" />
              </AvGroup>
              <AvGroup>
                <Label id="cnpjPrincipalLabel" for="escola-cnpjPrincipal">
                  <Translate contentKey="escolaOnlineApp.escola.cnpjPrincipal">Cnpj Principal</Translate>
                </Label>
                <AvField id="escola-cnpjPrincipal" data-cy="cnpjPrincipal" type="text" name="cnpjPrincipal" />
              </AvGroup>
              <AvGroup>
                <Label id="urlLabel" for="escola-url">
                  <Translate contentKey="escolaOnlineApp.escola.url">Url</Translate>
                </Label>
                <AvField id="escola-url" data-cy="url" type="text" name="url" />
              </AvGroup>
              <AvGroup>
                <Label id="prefixoLabel" for="escola-prefixo">
                  <Translate contentKey="escolaOnlineApp.escola.prefixo">Prefixo</Translate>
                </Label>
                <AvField id="escola-prefixo" data-cy="prefixo" type="text" name="prefixo" />
              </AvGroup>
              <AvGroup>
                <Label id="responsavelNomeLabel" for="escola-responsavelNome">
                  <Translate contentKey="escolaOnlineApp.escola.responsavelNome">Responsavel Nome</Translate>
                </Label>
                <AvField id="escola-responsavelNome" data-cy="responsavelNome" type="text" name="responsavelNome" />
              </AvGroup>
              <AvGroup>
                <Label id="responsavelCpfLabel" for="escola-responsavelCpf">
                  <Translate contentKey="escolaOnlineApp.escola.responsavelCpf">Responsavel Cpf</Translate>
                </Label>
                <AvField id="escola-responsavelCpf" data-cy="responsavelCpf" type="text" name="responsavelCpf" />
              </AvGroup>
              <AvGroup>
                <Label id="responsavelEmailLabel" for="escola-responsavelEmail">
                  <Translate contentKey="escolaOnlineApp.escola.responsavelEmail">Responsavel Email</Translate>
                </Label>
                <AvField id="escola-responsavelEmail" data-cy="responsavelEmail" type="text" name="responsavelEmail" />
              </AvGroup>
              <AvGroup>
                <Label id="responsavelCelularLabel" for="escola-responsavelCelular">
                  <Translate contentKey="escolaOnlineApp.escola.responsavelCelular">Responsavel Celular</Translate>
                </Label>
                <AvField id="escola-responsavelCelular" data-cy="responsavelCelular" type="text" name="responsavelCelular" />
              </AvGroup>
              <Button tag={Link} id="cancel-save" to="/escola" replace color="info">
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
  escolaEntity: storeState.escola.entity,
  loading: storeState.escola.loading,
  updating: storeState.escola.updating,
  updateSuccess: storeState.escola.updateSuccess,
});

const mapDispatchToProps = {
  getEntity,
  updateEntity,
  createEntity,
  reset,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(EscolaUpdate);
