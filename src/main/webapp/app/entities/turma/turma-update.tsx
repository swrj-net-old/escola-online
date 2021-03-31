import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
import { Translate, translate } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { ISerie } from 'app/shared/model/serie.model';
import { getEntities as getSeries } from 'app/entities/serie/serie.reducer';
import { IUnidade } from 'app/shared/model/unidade.model';
import { getEntities as getUnidades } from 'app/entities/unidade/unidade.reducer';
import { getEntity, updateEntity, createEntity, reset } from './turma.reducer';
import { ITurma } from 'app/shared/model/turma.model';
import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface ITurmaUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const TurmaUpdate = (props: ITurmaUpdateProps) => {
  const [isNew] = useState(!props.match.params || !props.match.params.id);

  const { turmaEntity, series, unidades, loading, updating } = props;

  const handleClose = () => {
    props.history.push('/turma' + props.location.search);
  };

  useEffect(() => {
    if (isNew) {
      props.reset();
    } else {
      props.getEntity(props.match.params.id);
    }

    props.getSeries();
    props.getUnidades();
  }, []);

  useEffect(() => {
    if (props.updateSuccess) {
      handleClose();
    }
  }, [props.updateSuccess]);

  const saveEntity = (event, errors, values) => {
    if (errors.length === 0) {
      const entity = {
        ...turmaEntity,
        ...values,
        serieTurma: series.find(it => it.id.toString() === values.serieTurmaId.toString()),
        unidadeTurma: unidades.find(it => it.id.toString() === values.unidadeTurmaId.toString()),
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
          <h2 id="escolaOnlineApp.turma.home.createOrEditLabel" data-cy="TurmaCreateUpdateHeading">
            <Translate contentKey="escolaOnlineApp.turma.home.createOrEditLabel">Create or edit a Turma</Translate>
          </h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <AvForm model={isNew ? {} : turmaEntity} onSubmit={saveEntity}>
              {!isNew ? (
                <AvGroup>
                  <Label for="turma-id">
                    <Translate contentKey="global.field.id">ID</Translate>
                  </Label>
                  <AvInput id="turma-id" type="text" className="form-control" name="id" required readOnly />
                </AvGroup>
              ) : null}
              <AvGroup>
                <Label id="nomeLabel" for="turma-nome">
                  <Translate contentKey="escolaOnlineApp.turma.nome">Nome</Translate>
                </Label>
                <AvField id="turma-nome" data-cy="nome" type="text" name="nome" />
              </AvGroup>
              <AvGroup>
                <Label for="turma-serieTurma">
                  <Translate contentKey="escolaOnlineApp.turma.serieTurma">Serie Turma</Translate>
                </Label>
                <AvInput id="turma-serieTurma" data-cy="serieTurma" type="select" className="form-control" name="serieTurmaId">
                  <option value="" key="0" />
                  {series
                    ? series.map(otherEntity => (
                        <option value={otherEntity.id} key={otherEntity.id}>
                          {otherEntity.id}
                        </option>
                      ))
                    : null}
                </AvInput>
              </AvGroup>
              <AvGroup>
                <Label for="turma-unidadeTurma">
                  <Translate contentKey="escolaOnlineApp.turma.unidadeTurma">Unidade Turma</Translate>
                </Label>
                <AvInput id="turma-unidadeTurma" data-cy="unidadeTurma" type="select" className="form-control" name="unidadeTurmaId">
                  <option value="" key="0" />
                  {unidades
                    ? unidades.map(otherEntity => (
                        <option value={otherEntity.id} key={otherEntity.id}>
                          {otherEntity.id}
                        </option>
                      ))
                    : null}
                </AvInput>
              </AvGroup>
              <Button tag={Link} id="cancel-save" to="/turma" replace color="info">
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
  series: storeState.serie.entities,
  unidades: storeState.unidade.entities,
  turmaEntity: storeState.turma.entity,
  loading: storeState.turma.loading,
  updating: storeState.turma.updating,
  updateSuccess: storeState.turma.updateSuccess,
});

const mapDispatchToProps = {
  getSeries,
  getUnidades,
  getEntity,
  updateEntity,
  createEntity,
  reset,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(TurmaUpdate);
