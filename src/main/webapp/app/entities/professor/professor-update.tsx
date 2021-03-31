import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
import { Translate, translate } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { IPessoa } from 'app/shared/model/pessoa.model';
import { getEntities as getPessoas } from 'app/entities/pessoa/pessoa.reducer';
import { IUnidade } from 'app/shared/model/unidade.model';
import { getEntities as getUnidades } from 'app/entities/unidade/unidade.reducer';
import { getEntity, updateEntity, createEntity, reset } from './professor.reducer';
import { IProfessor } from 'app/shared/model/professor.model';
import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IProfessorUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const ProfessorUpdate = (props: IProfessorUpdateProps) => {
  const [isNew] = useState(!props.match.params || !props.match.params.id);

  const { professorEntity, pessoas, unidades, loading, updating } = props;

  const handleClose = () => {
    props.history.push('/professor' + props.location.search);
  };

  useEffect(() => {
    if (isNew) {
      props.reset();
    } else {
      props.getEntity(props.match.params.id);
    }

    props.getPessoas();
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
        ...professorEntity,
        ...values,
        pessoaProfessor: pessoas.find(it => it.id.toString() === values.pessoaProfessorId.toString()),
        unidadeProfessor: unidades.find(it => it.id.toString() === values.unidadeProfessorId.toString()),
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
          <h2 id="escolaOnlineApp.professor.home.createOrEditLabel" data-cy="ProfessorCreateUpdateHeading">
            <Translate contentKey="escolaOnlineApp.professor.home.createOrEditLabel">Create or edit a Professor</Translate>
          </h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <AvForm model={isNew ? {} : professorEntity} onSubmit={saveEntity}>
              {!isNew ? (
                <AvGroup>
                  <Label for="professor-id">
                    <Translate contentKey="global.field.id">ID</Translate>
                  </Label>
                  <AvInput id="professor-id" type="text" className="form-control" name="id" required readOnly />
                </AvGroup>
              ) : null}
              <AvGroup>
                <Label id="anoLetivoLabel" for="professor-anoLetivo">
                  <Translate contentKey="escolaOnlineApp.professor.anoLetivo">Ano Letivo</Translate>
                </Label>
                <AvField id="professor-anoLetivo" data-cy="anoLetivo" type="string" className="form-control" name="anoLetivo" />
              </AvGroup>
              <AvGroup>
                <Label id="dataInicioLabel" for="professor-dataInicio">
                  <Translate contentKey="escolaOnlineApp.professor.dataInicio">Data Inicio</Translate>
                </Label>
                <AvField id="professor-dataInicio" data-cy="dataInicio" type="date" className="form-control" name="dataInicio" />
              </AvGroup>
              <AvGroup>
                <Label id="dataFimLabel" for="professor-dataFim">
                  <Translate contentKey="escolaOnlineApp.professor.dataFim">Data Fim</Translate>
                </Label>
                <AvField id="professor-dataFim" data-cy="dataFim" type="date" className="form-control" name="dataFim" />
              </AvGroup>
              <AvGroup>
                <Label for="professor-pessoaProfessor">
                  <Translate contentKey="escolaOnlineApp.professor.pessoaProfessor">Pessoa Professor</Translate>
                </Label>
                <AvInput
                  id="professor-pessoaProfessor"
                  data-cy="pessoaProfessor"
                  type="select"
                  className="form-control"
                  name="pessoaProfessorId"
                >
                  <option value="" key="0" />
                  {pessoas
                    ? pessoas.map(otherEntity => (
                        <option value={otherEntity.id} key={otherEntity.id}>
                          {otherEntity.id}
                        </option>
                      ))
                    : null}
                </AvInput>
              </AvGroup>
              <AvGroup>
                <Label for="professor-unidadeProfessor">
                  <Translate contentKey="escolaOnlineApp.professor.unidadeProfessor">Unidade Professor</Translate>
                </Label>
                <AvInput
                  id="professor-unidadeProfessor"
                  data-cy="unidadeProfessor"
                  type="select"
                  className="form-control"
                  name="unidadeProfessorId"
                >
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
              <Button tag={Link} id="cancel-save" to="/professor" replace color="info">
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
  pessoas: storeState.pessoa.entities,
  unidades: storeState.unidade.entities,
  professorEntity: storeState.professor.entity,
  loading: storeState.professor.loading,
  updating: storeState.professor.updating,
  updateSuccess: storeState.professor.updateSuccess,
});

const mapDispatchToProps = {
  getPessoas,
  getUnidades,
  getEntity,
  updateEntity,
  createEntity,
  reset,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(ProfessorUpdate);
