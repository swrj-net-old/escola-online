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
import { getEntity, updateEntity, createEntity, reset } from './tipo-solicitacao.reducer';
import { ITipoSolicitacao } from 'app/shared/model/tipo-solicitacao.model';
import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface ITipoSolicitacaoUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const TipoSolicitacaoUpdate = (props: ITipoSolicitacaoUpdateProps) => {
  const [isNew] = useState(!props.match.params || !props.match.params.id);

  const { tipoSolicitacaoEntity, escolas, loading, updating } = props;

  const handleClose = () => {
    props.history.push('/tipo-solicitacao' + props.location.search);
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
        ...tipoSolicitacaoEntity,
        ...values,
        escolaTipoSolicitacao: escolas.find(it => it.id.toString() === values.escolaTipoSolicitacaoId.toString()),
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
          <h2 id="escolaOnlineApp.tipoSolicitacao.home.createOrEditLabel" data-cy="TipoSolicitacaoCreateUpdateHeading">
            <Translate contentKey="escolaOnlineApp.tipoSolicitacao.home.createOrEditLabel">Create or edit a TipoSolicitacao</Translate>
          </h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <AvForm model={isNew ? {} : tipoSolicitacaoEntity} onSubmit={saveEntity}>
              {!isNew ? (
                <AvGroup>
                  <Label for="tipo-solicitacao-id">
                    <Translate contentKey="global.field.id">ID</Translate>
                  </Label>
                  <AvInput id="tipo-solicitacao-id" type="text" className="form-control" name="id" required readOnly />
                </AvGroup>
              ) : null}
              <AvGroup>
                <Label id="nomeLabel" for="tipo-solicitacao-nome">
                  <Translate contentKey="escolaOnlineApp.tipoSolicitacao.nome">Nome</Translate>
                </Label>
                <AvField id="tipo-solicitacao-nome" data-cy="nome" type="text" name="nome" />
              </AvGroup>
              <AvGroup>
                <Label id="prazoAtendimentoLabel" for="tipo-solicitacao-prazoAtendimento">
                  <Translate contentKey="escolaOnlineApp.tipoSolicitacao.prazoAtendimento">Prazo Atendimento</Translate>
                </Label>
                <AvField
                  id="tipo-solicitacao-prazoAtendimento"
                  data-cy="prazoAtendimento"
                  type="string"
                  className="form-control"
                  name="prazoAtendimento"
                />
              </AvGroup>
              <AvGroup>
                <Label id="valorEmissaoLabel" for="tipo-solicitacao-valorEmissao">
                  <Translate contentKey="escolaOnlineApp.tipoSolicitacao.valorEmissao">Valor Emissao</Translate>
                </Label>
                <AvField id="tipo-solicitacao-valorEmissao" data-cy="valorEmissao" type="text" name="valorEmissao" />
              </AvGroup>
              <AvGroup>
                <Label for="tipo-solicitacao-escolaTipoSolicitacao">
                  <Translate contentKey="escolaOnlineApp.tipoSolicitacao.escolaTipoSolicitacao">Escola Tipo Solicitacao</Translate>
                </Label>
                <AvInput
                  id="tipo-solicitacao-escolaTipoSolicitacao"
                  data-cy="escolaTipoSolicitacao"
                  type="select"
                  className="form-control"
                  name="escolaTipoSolicitacaoId"
                >
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
              <Button tag={Link} id="cancel-save" to="/tipo-solicitacao" replace color="info">
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
  tipoSolicitacaoEntity: storeState.tipoSolicitacao.entity,
  loading: storeState.tipoSolicitacao.loading,
  updating: storeState.tipoSolicitacao.updating,
  updateSuccess: storeState.tipoSolicitacao.updateSuccess,
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

export default connect(mapStateToProps, mapDispatchToProps)(TipoSolicitacaoUpdate);
