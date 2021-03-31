import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
import { Translate, translate } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { getEntity, updateEntity, createEntity, reset } from './materia.reducer';
import { IMateria } from 'app/shared/model/materia.model';
import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IMateriaUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const MateriaUpdate = (props: IMateriaUpdateProps) => {
  const [isNew] = useState(!props.match.params || !props.match.params.id);

  const { materiaEntity, loading, updating } = props;

  const handleClose = () => {
    props.history.push('/materia' + props.location.search);
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
        ...materiaEntity,
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
          <h2 id="escolaOnlineApp.materia.home.createOrEditLabel" data-cy="MateriaCreateUpdateHeading">
            <Translate contentKey="escolaOnlineApp.materia.home.createOrEditLabel">Create or edit a Materia</Translate>
          </h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <AvForm model={isNew ? {} : materiaEntity} onSubmit={saveEntity}>
              {!isNew ? (
                <AvGroup>
                  <Label for="materia-id">
                    <Translate contentKey="global.field.id">ID</Translate>
                  </Label>
                  <AvInput id="materia-id" type="text" className="form-control" name="id" required readOnly />
                </AvGroup>
              ) : null}
              <AvGroup>
                <Label id="nomeLabel" for="materia-nome">
                  <Translate contentKey="escolaOnlineApp.materia.nome">Nome</Translate>
                </Label>
                <AvField id="materia-nome" data-cy="nome" type="text" name="nome" />
              </AvGroup>
              <AvGroup>
                <Label id="siglaLabel" for="materia-sigla">
                  <Translate contentKey="escolaOnlineApp.materia.sigla">Sigla</Translate>
                </Label>
                <AvField id="materia-sigla" data-cy="sigla" type="text" name="sigla" />
              </AvGroup>
              <Button tag={Link} id="cancel-save" to="/materia" replace color="info">
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
  materiaEntity: storeState.materia.entity,
  loading: storeState.materia.loading,
  updating: storeState.materia.updating,
  updateSuccess: storeState.materia.updateSuccess,
});

const mapDispatchToProps = {
  getEntity,
  updateEntity,
  createEntity,
  reset,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(MateriaUpdate);
