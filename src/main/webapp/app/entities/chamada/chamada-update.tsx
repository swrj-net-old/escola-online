import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
import { Translate, translate } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { IAluno } from 'app/shared/model/aluno.model';
import { getEntities as getAlunos } from 'app/entities/aluno/aluno.reducer';
import { ITurma } from 'app/shared/model/turma.model';
import { getEntities as getTurmas } from 'app/entities/turma/turma.reducer';
import { IProfessor } from 'app/shared/model/professor.model';
import { getEntities as getProfessors } from 'app/entities/professor/professor.reducer';
import { getEntity, updateEntity, createEntity, reset } from './chamada.reducer';
import { IChamada } from 'app/shared/model/chamada.model';
import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IChamadaUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const ChamadaUpdate = (props: IChamadaUpdateProps) => {
  const [isNew] = useState(!props.match.params || !props.match.params.id);

  const { chamadaEntity, alunos, turmas, professors, loading, updating } = props;

  const handleClose = () => {
    props.history.push('/chamada' + props.location.search);
  };

  useEffect(() => {
    if (isNew) {
      props.reset();
    } else {
      props.getEntity(props.match.params.id);
    }

    props.getAlunos();
    props.getTurmas();
    props.getProfessors();
  }, []);

  useEffect(() => {
    if (props.updateSuccess) {
      handleClose();
    }
  }, [props.updateSuccess]);

  const saveEntity = (event, errors, values) => {
    if (errors.length === 0) {
      const entity = {
        ...chamadaEntity,
        ...values,
        alunoChamada: alunos.find(it => it.id.toString() === values.alunoChamadaId.toString()),
        turmaChamada: turmas.find(it => it.id.toString() === values.turmaChamadaId.toString()),
        professorChamada: professors.find(it => it.id.toString() === values.professorChamadaId.toString()),
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
          <h2 id="escolaOnlineApp.chamada.home.createOrEditLabel" data-cy="ChamadaCreateUpdateHeading">
            <Translate contentKey="escolaOnlineApp.chamada.home.createOrEditLabel">Create or edit a Chamada</Translate>
          </h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <AvForm model={isNew ? {} : chamadaEntity} onSubmit={saveEntity}>
              {!isNew ? (
                <AvGroup>
                  <Label for="chamada-id">
                    <Translate contentKey="global.field.id">ID</Translate>
                  </Label>
                  <AvInput id="chamada-id" type="text" className="form-control" name="id" required readOnly />
                </AvGroup>
              ) : null}
              <AvGroup>
                <Label id="dataAulaLabel" for="chamada-dataAula">
                  <Translate contentKey="escolaOnlineApp.chamada.dataAula">Data Aula</Translate>
                </Label>
                <AvField id="chamada-dataAula" data-cy="dataAula" type="date" className="form-control" name="dataAula" />
              </AvGroup>
              <AvGroup>
                <Label id="observacoesLabel" for="chamada-observacoes">
                  <Translate contentKey="escolaOnlineApp.chamada.observacoes">Observacoes</Translate>
                </Label>
                <AvField id="chamada-observacoes" data-cy="observacoes" type="text" name="observacoes" />
              </AvGroup>
              <AvGroup>
                <Label for="chamada-alunoChamada">
                  <Translate contentKey="escolaOnlineApp.chamada.alunoChamada">Aluno Chamada</Translate>
                </Label>
                <AvInput id="chamada-alunoChamada" data-cy="alunoChamada" type="select" className="form-control" name="alunoChamadaId">
                  <option value="" key="0" />
                  {alunos
                    ? alunos.map(otherEntity => (
                        <option value={otherEntity.id} key={otherEntity.id}>
                          {otherEntity.id}
                        </option>
                      ))
                    : null}
                </AvInput>
              </AvGroup>
              <AvGroup>
                <Label for="chamada-turmaChamada">
                  <Translate contentKey="escolaOnlineApp.chamada.turmaChamada">Turma Chamada</Translate>
                </Label>
                <AvInput id="chamada-turmaChamada" data-cy="turmaChamada" type="select" className="form-control" name="turmaChamadaId">
                  <option value="" key="0" />
                  {turmas
                    ? turmas.map(otherEntity => (
                        <option value={otherEntity.id} key={otherEntity.id}>
                          {otherEntity.id}
                        </option>
                      ))
                    : null}
                </AvInput>
              </AvGroup>
              <AvGroup>
                <Label for="chamada-professorChamada">
                  <Translate contentKey="escolaOnlineApp.chamada.professorChamada">Professor Chamada</Translate>
                </Label>
                <AvInput
                  id="chamada-professorChamada"
                  data-cy="professorChamada"
                  type="select"
                  className="form-control"
                  name="professorChamadaId"
                >
                  <option value="" key="0" />
                  {professors
                    ? professors.map(otherEntity => (
                        <option value={otherEntity.id} key={otherEntity.id}>
                          {otherEntity.id}
                        </option>
                      ))
                    : null}
                </AvInput>
              </AvGroup>
              <Button tag={Link} id="cancel-save" to="/chamada" replace color="info">
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
  alunos: storeState.aluno.entities,
  turmas: storeState.turma.entities,
  professors: storeState.professor.entities,
  chamadaEntity: storeState.chamada.entity,
  loading: storeState.chamada.loading,
  updating: storeState.chamada.updating,
  updateSuccess: storeState.chamada.updateSuccess,
});

const mapDispatchToProps = {
  getAlunos,
  getTurmas,
  getProfessors,
  getEntity,
  updateEntity,
  createEntity,
  reset,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(ChamadaUpdate);
