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
import { getEntity, updateEntity, createEntity, reset } from './diretor.reducer';
import { IDiretor } from 'app/shared/model/diretor.model';
import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IDiretorUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const DiretorUpdate = (props: IDiretorUpdateProps) => {
  const [isNew] = useState(!props.match.params || !props.match.params.id);

  const { diretorEntity, pessoas, unidades, loading, updating } = props;

  const handleClose = () => {
    props.history.push('/diretor' + props.location.search);
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
        ...diretorEntity,
        ...values,
        pessoaDiretor: pessoas.find(it => it.id.toString() === values.pessoaDiretorId.toString()),
        unidadeDiretor: unidades.find(it => it.id.toString() === values.unidadeDiretorId.toString()),
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
          <h2 id="escolaOnlineApp.diretor.home.createOrEditLabel" data-cy="DiretorCreateUpdateHeading">
            <Translate contentKey="escolaOnlineApp.diretor.home.createOrEditLabel">Create or edit a Diretor</Translate>
          </h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <AvForm model={isNew ? {} : diretorEntity} onSubmit={saveEntity}>
              {!isNew ? (
                <AvGroup>
                  <Label for="diretor-id">
                    <Translate contentKey="global.field.id">ID</Translate>
                  </Label>
                  <AvInput id="diretor-id" type="text" className="form-control" name="id" required readOnly />
                </AvGroup>
              ) : null}
              <AvGroup>
                <Label id="anoLetivoLabel" for="diretor-anoLetivo">
                  <Translate contentKey="escolaOnlineApp.diretor.anoLetivo">Ano Letivo</Translate>
                </Label>
                <AvField id="diretor-anoLetivo" data-cy="anoLetivo" type="string" className="form-control" name="anoLetivo" />
              </AvGroup>
              <AvGroup>
                <Label id="dataInicioLabel" for="diretor-dataInicio">
                  <Translate contentKey="escolaOnlineApp.diretor.dataInicio">Data Inicio</Translate>
                </Label>
                <AvField id="diretor-dataInicio" data-cy="dataInicio" type="date" className="form-control" name="dataInicio" />
              </AvGroup>
              <AvGroup>
                <Label id="dataFimLabel" for="diretor-dataFim">
                  <Translate contentKey="escolaOnlineApp.diretor.dataFim">Data Fim</Translate>
                </Label>
                <AvField id="diretor-dataFim" data-cy="dataFim" type="date" className="form-control" name="dataFim" />
              </AvGroup>
              <AvGroup>
                <Label for="diretor-pessoaDiretor">
                  <Translate contentKey="escolaOnlineApp.diretor.pessoaDiretor">Pessoa Diretor</Translate>
                </Label>
                <AvInput id="diretor-pessoaDiretor" data-cy="pessoaDiretor" type="select" className="form-control" name="pessoaDiretorId">
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
                <Label for="diretor-unidadeDiretor">
                  <Translate contentKey="escolaOnlineApp.diretor.unidadeDiretor">Unidade Diretor</Translate>
                </Label>
                <AvInput
                  id="diretor-unidadeDiretor"
                  data-cy="unidadeDiretor"
                  type="select"
                  className="form-control"
                  name="unidadeDiretorId"
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
              <Button tag={Link} id="cancel-save" to="/diretor" replace color="info">
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
  diretorEntity: storeState.diretor.entity,
  loading: storeState.diretor.loading,
  updating: storeState.diretor.updating,
  updateSuccess: storeState.diretor.updateSuccess,
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

export default connect(mapStateToProps, mapDispatchToProps)(DiretorUpdate);
