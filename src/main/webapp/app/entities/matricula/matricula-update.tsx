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
import { IAluno } from 'app/shared/model/aluno.model';
import { getEntities as getAlunos } from 'app/entities/aluno/aluno.reducer';
import { getEntity, updateEntity, createEntity, reset } from './matricula.reducer';
import { IMatricula } from 'app/shared/model/matricula.model';
import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IMatriculaUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const MatriculaUpdate = (props: IMatriculaUpdateProps) => {
  const [isNew] = useState(!props.match.params || !props.match.params.id);

  const { matriculaEntity, turmas, alunos, loading, updating } = props;

  const handleClose = () => {
    props.history.push('/matricula' + props.location.search);
  };

  useEffect(() => {
    if (isNew) {
      props.reset();
    } else {
      props.getEntity(props.match.params.id);
    }

    props.getTurmas();
    props.getAlunos();
  }, []);

  useEffect(() => {
    if (props.updateSuccess) {
      handleClose();
    }
  }, [props.updateSuccess]);

  const saveEntity = (event, errors, values) => {
    if (errors.length === 0) {
      const entity = {
        ...matriculaEntity,
        ...values,
        turmaMatricula: turmas.find(it => it.id.toString() === values.turmaMatriculaId.toString()),
        alunoMatricula: alunos.find(it => it.id.toString() === values.alunoMatriculaId.toString()),
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
          <h2 id="escolaOnlineApp.matricula.home.createOrEditLabel" data-cy="MatriculaCreateUpdateHeading">
            <Translate contentKey="escolaOnlineApp.matricula.home.createOrEditLabel">Create or edit a Matricula</Translate>
          </h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <AvForm model={isNew ? {} : matriculaEntity} onSubmit={saveEntity}>
              {!isNew ? (
                <AvGroup>
                  <Label for="matricula-id">
                    <Translate contentKey="global.field.id">ID</Translate>
                  </Label>
                  <AvInput id="matricula-id" type="text" className="form-control" name="id" required readOnly />
                </AvGroup>
              ) : null}
              <AvGroup>
                <Label id="anoLetivoLabel" for="matricula-anoLetivo">
                  <Translate contentKey="escolaOnlineApp.matricula.anoLetivo">Ano Letivo</Translate>
                </Label>
                <AvField id="matricula-anoLetivo" data-cy="anoLetivo" type="string" className="form-control" name="anoLetivo" />
              </AvGroup>
              <AvGroup>
                <Label id="dataInicioLabel" for="matricula-dataInicio">
                  <Translate contentKey="escolaOnlineApp.matricula.dataInicio">Data Inicio</Translate>
                </Label>
                <AvField id="matricula-dataInicio" data-cy="dataInicio" type="date" className="form-control" name="dataInicio" />
              </AvGroup>
              <AvGroup>
                <Label id="dataFimLabel" for="matricula-dataFim">
                  <Translate contentKey="escolaOnlineApp.matricula.dataFim">Data Fim</Translate>
                </Label>
                <AvField id="matricula-dataFim" data-cy="dataFim" type="date" className="form-control" name="dataFim" />
              </AvGroup>
              <AvGroup>
                <Label for="matricula-turmaMatricula">
                  <Translate contentKey="escolaOnlineApp.matricula.turmaMatricula">Turma Matricula</Translate>
                </Label>
                <AvInput
                  id="matricula-turmaMatricula"
                  data-cy="turmaMatricula"
                  type="select"
                  className="form-control"
                  name="turmaMatriculaId"
                >
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
                <Label for="matricula-alunoMatricula">
                  <Translate contentKey="escolaOnlineApp.matricula.alunoMatricula">Aluno Matricula</Translate>
                </Label>
                <AvInput
                  id="matricula-alunoMatricula"
                  data-cy="alunoMatricula"
                  type="select"
                  className="form-control"
                  name="alunoMatriculaId"
                >
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
              <Button tag={Link} id="cancel-save" to="/matricula" replace color="info">
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
  alunos: storeState.aluno.entities,
  matriculaEntity: storeState.matricula.entity,
  loading: storeState.matricula.loading,
  updating: storeState.matricula.updating,
  updateSuccess: storeState.matricula.updateSuccess,
});

const mapDispatchToProps = {
  getTurmas,
  getAlunos,
  getEntity,
  updateEntity,
  createEntity,
  reset,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(MatriculaUpdate);
