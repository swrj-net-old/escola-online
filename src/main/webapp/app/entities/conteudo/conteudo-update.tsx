import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
import { Translate, translate } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { ITurma } from 'app/shared/model/turma.model';
import { getEntities as getTurmas } from 'app/entities/turma/turma.reducer';
import { IProfessor } from 'app/shared/model/professor.model';
import { getEntities as getProfessors } from 'app/entities/professor/professor.reducer';
import { IMateria } from 'app/shared/model/materia.model';
import { getEntities as getMaterias } from 'app/entities/materia/materia.reducer';
import { getEntity, updateEntity, createEntity, reset } from './conteudo.reducer';
import { IConteudo } from 'app/shared/model/conteudo.model';
import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IConteudoUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const ConteudoUpdate = (props: IConteudoUpdateProps) => {
  const [isNew] = useState(!props.match.params || !props.match.params.id);

  const { conteudoEntity, turmas, professors, materias, loading, updating } = props;

  const handleClose = () => {
    props.history.push('/conteudo' + props.location.search);
  };

  useEffect(() => {
    if (isNew) {
      props.reset();
    } else {
      props.getEntity(props.match.params.id);
    }

    props.getTurmas();
    props.getProfessors();
    props.getMaterias();
  }, []);

  useEffect(() => {
    if (props.updateSuccess) {
      handleClose();
    }
  }, [props.updateSuccess]);

  const saveEntity = (event, errors, values) => {
    if (errors.length === 0) {
      const entity = {
        ...conteudoEntity,
        ...values,
        turmaConteudo: turmas.find(it => it.id.toString() === values.turmaConteudoId.toString()),
        professorConteudo: professors.find(it => it.id.toString() === values.professorConteudoId.toString()),
        materiaConteudo: materias.find(it => it.id.toString() === values.materiaConteudoId.toString()),
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
          <h2 id="escolaOnlineApp.conteudo.home.createOrEditLabel" data-cy="ConteudoCreateUpdateHeading">
            <Translate contentKey="escolaOnlineApp.conteudo.home.createOrEditLabel">Create or edit a Conteudo</Translate>
          </h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <AvForm model={isNew ? {} : conteudoEntity} onSubmit={saveEntity}>
              {!isNew ? (
                <AvGroup>
                  <Label for="conteudo-id">
                    <Translate contentKey="global.field.id">ID</Translate>
                  </Label>
                  <AvInput id="conteudo-id" type="text" className="form-control" name="id" required readOnly />
                </AvGroup>
              ) : null}
              <AvGroup>
                <Label id="dataAulaLabel" for="conteudo-dataAula">
                  <Translate contentKey="escolaOnlineApp.conteudo.dataAula">Data Aula</Translate>
                </Label>
                <AvField id="conteudo-dataAula" data-cy="dataAula" type="date" className="form-control" name="dataAula" />
              </AvGroup>
              <AvGroup>
                <Label id="habilidadesCompetenciasLabel" for="conteudo-habilidadesCompetencias">
                  <Translate contentKey="escolaOnlineApp.conteudo.habilidadesCompetencias">Habilidades Competencias</Translate>
                </Label>
                <AvField
                  id="conteudo-habilidadesCompetencias"
                  data-cy="habilidadesCompetencias"
                  type="text"
                  name="habilidadesCompetencias"
                />
              </AvGroup>
              <AvGroup>
                <Label id="observacoesLabel" for="conteudo-observacoes">
                  <Translate contentKey="escolaOnlineApp.conteudo.observacoes">Observacoes</Translate>
                </Label>
                <AvField id="conteudo-observacoes" data-cy="observacoes" type="text" name="observacoes" />
              </AvGroup>
              <AvGroup>
                <Label for="conteudo-turmaConteudo">
                  <Translate contentKey="escolaOnlineApp.conteudo.turmaConteudo">Turma Conteudo</Translate>
                </Label>
                <AvInput id="conteudo-turmaConteudo" data-cy="turmaConteudo" type="select" className="form-control" name="turmaConteudoId">
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
                <Label for="conteudo-professorConteudo">
                  <Translate contentKey="escolaOnlineApp.conteudo.professorConteudo">Professor Conteudo</Translate>
                </Label>
                <AvInput
                  id="conteudo-professorConteudo"
                  data-cy="professorConteudo"
                  type="select"
                  className="form-control"
                  name="professorConteudoId"
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
              <AvGroup>
                <Label for="conteudo-materiaConteudo">
                  <Translate contentKey="escolaOnlineApp.conteudo.materiaConteudo">Materia Conteudo</Translate>
                </Label>
                <AvInput
                  id="conteudo-materiaConteudo"
                  data-cy="materiaConteudo"
                  type="select"
                  className="form-control"
                  name="materiaConteudoId"
                >
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
              <Button tag={Link} id="cancel-save" to="/conteudo" replace color="info">
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
  turmas: storeState.turma.entities,
  professors: storeState.professor.entities,
  materias: storeState.materia.entities,
  conteudoEntity: storeState.conteudo.entity,
  loading: storeState.conteudo.loading,
  updating: storeState.conteudo.updating,
  updateSuccess: storeState.conteudo.updateSuccess,
});

const mapDispatchToProps = {
  getTurmas,
  getProfessors,
  getMaterias,
  getEntity,
  updateEntity,
  createEntity,
  reset,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(ConteudoUpdate);
