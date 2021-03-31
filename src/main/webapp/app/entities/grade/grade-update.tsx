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
import { IMateria } from 'app/shared/model/materia.model';
import { getEntities as getMaterias } from 'app/entities/materia/materia.reducer';
import { IEscola } from 'app/shared/model/escola.model';
import { getEntities as getEscolas } from 'app/entities/escola/escola.reducer';
import { getEntity, updateEntity, createEntity, reset } from './grade.reducer';
import { IGrade } from 'app/shared/model/grade.model';
import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IGradeUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const GradeUpdate = (props: IGradeUpdateProps) => {
  const [isNew] = useState(!props.match.params || !props.match.params.id);

  const { gradeEntity, series, materias, escolas, loading, updating } = props;

  const handleClose = () => {
    props.history.push('/grade' + props.location.search);
  };

  useEffect(() => {
    if (isNew) {
      props.reset();
    } else {
      props.getEntity(props.match.params.id);
    }

    props.getSeries();
    props.getMaterias();
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
        ...gradeEntity,
        ...values,
        serieGrade: series.find(it => it.id.toString() === values.serieGradeId.toString()),
        materiaGrade: materias.find(it => it.id.toString() === values.materiaGradeId.toString()),
        escolaGrade: escolas.find(it => it.id.toString() === values.escolaGradeId.toString()),
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
          <h2 id="escolaOnlineApp.grade.home.createOrEditLabel" data-cy="GradeCreateUpdateHeading">
            <Translate contentKey="escolaOnlineApp.grade.home.createOrEditLabel">Create or edit a Grade</Translate>
          </h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <AvForm model={isNew ? {} : gradeEntity} onSubmit={saveEntity}>
              {!isNew ? (
                <AvGroup>
                  <Label for="grade-id">
                    <Translate contentKey="global.field.id">ID</Translate>
                  </Label>
                  <AvInput id="grade-id" type="text" className="form-control" name="id" required readOnly />
                </AvGroup>
              ) : null}
              <AvGroup>
                <Label id="anoLetivoLabel" for="grade-anoLetivo">
                  <Translate contentKey="escolaOnlineApp.grade.anoLetivo">Ano Letivo</Translate>
                </Label>
                <AvField id="grade-anoLetivo" data-cy="anoLetivo" type="string" className="form-control" name="anoLetivo" />
              </AvGroup>
              <AvGroup>
                <Label for="grade-serieGrade">
                  <Translate contentKey="escolaOnlineApp.grade.serieGrade">Serie Grade</Translate>
                </Label>
                <AvInput id="grade-serieGrade" data-cy="serieGrade" type="select" className="form-control" name="serieGradeId">
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
                <Label for="grade-materiaGrade">
                  <Translate contentKey="escolaOnlineApp.grade.materiaGrade">Materia Grade</Translate>
                </Label>
                <AvInput id="grade-materiaGrade" data-cy="materiaGrade" type="select" className="form-control" name="materiaGradeId">
                  <option value="" key="0" />
                  {materias
                    ? materias.map(otherEntity => (
                        <option value={otherEntity.id} key={otherEntity.id}>
                          {otherEntity.id}
                        </option>
                      ))
                    : null}
                </AvInput>
              </AvGroup>
              <AvGroup>
                <Label for="grade-escolaGrade">
                  <Translate contentKey="escolaOnlineApp.grade.escolaGrade">Escola Grade</Translate>
                </Label>
                <AvInput id="grade-escolaGrade" data-cy="escolaGrade" type="select" className="form-control" name="escolaGradeId">
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
              <Button tag={Link} id="cancel-save" to="/grade" replace color="info">
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
  materias: storeState.materia.entities,
  escolas: storeState.escola.entities,
  gradeEntity: storeState.grade.entity,
  loading: storeState.grade.loading,
  updating: storeState.grade.updating,
  updateSuccess: storeState.grade.updateSuccess,
});

const mapDispatchToProps = {
  getSeries,
  getMaterias,
  getEscolas,
  getEntity,
  updateEntity,
  createEntity,
  reset,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(GradeUpdate);
