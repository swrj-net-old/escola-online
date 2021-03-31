import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
import { Translate, translate } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { ITipoSolicitacao } from 'app/shared/model/tipo-solicitacao.model';
import { getEntities as getTipoSolicitacaos } from 'app/entities/tipo-solicitacao/tipo-solicitacao.reducer';
import { IAluno } from 'app/shared/model/aluno.model';
import { getEntities as getAlunos } from 'app/entities/aluno/aluno.reducer';
import { getEntity, updateEntity, createEntity, reset } from './solicitacao.reducer';
import { ISolicitacao } from 'app/shared/model/solicitacao.model';
import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface ISolicitacaoUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const SolicitacaoUpdate = (props: ISolicitacaoUpdateProps) => {
  const [isNew] = useState(!props.match.params || !props.match.params.id);

  const { solicitacaoEntity, tipoSolicitacaos, alunos, loading, updating } = props;

  const handleClose = () => {
    props.history.push('/solicitacao' + props.location.search);
  };

  useEffect(() => {
    if (isNew) {
      props.reset();
    } else {
      props.getEntity(props.match.params.id);
    }

    props.getTipoSolicitacaos();
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
        ...solicitacaoEntity,
        ...values,
        tipoSolicitacaoSolicitacao: tipoSolicitacaos.find(it => it.id.toString() === values.tipoSolicitacaoSolicitacaoId.toString()),
        alunoSolicitacao: alunos.find(it => it.id.toString() === values.alunoSolicitacaoId.toString()),
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
          <h2 id="escolaOnlineApp.solicitacao.home.createOrEditLabel" data-cy="SolicitacaoCreateUpdateHeading">
            <Translate contentKey="escolaOnlineApp.solicitacao.home.createOrEditLabel">Create or edit a Solicitacao</Translate>
          </h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <AvForm model={isNew ? {} : solicitacaoEntity} onSubmit={saveEntity}>
              {!isNew ? (
                <AvGroup>
                  <Label for="solicitacao-id">
                    <Translate contentKey="global.field.id">ID</Translate>
                  </Label>
                  <AvInput id="solicitacao-id" type="text" className="form-control" name="id" required readOnly />
                </AvGroup>
              ) : null}
              <AvGroup>
                <Label id="situacaoSolicitacaoLabel" for="solicitacao-situacaoSolicitacao">
                  <Translate contentKey="escolaOnlineApp.solicitacao.situacaoSolicitacao">Situacao Solicitacao</Translate>
                </Label>
                <AvInput
                  id="solicitacao-situacaoSolicitacao"
                  data-cy="situacaoSolicitacao"
                  type="select"
                  className="form-control"
                  name="situacaoSolicitacao"
                  value={(!isNew && solicitacaoEntity.situacaoSolicitacao) || 'AGUARDANDO'}
                >
                  <option value="AGUARDANDO">{translate('escolaOnlineApp.SituacaoSolicitacao.AGUARDANDO')}</option>
                  <option value="EM_ANDAMENTO">{translate('escolaOnlineApp.SituacaoSolicitacao.EM_ANDAMENTO')}</option>
                  <option value="CONCLUIDO">{translate('escolaOnlineApp.SituacaoSolicitacao.CONCLUIDO')}</option>
                  <option value="CANCELADO">{translate('escolaOnlineApp.SituacaoSolicitacao.CANCELADO')}</option>
                </AvInput>
              </AvGroup>
              <AvGroup>
                <Label id="dataSolicitacaoLabel" for="solicitacao-dataSolicitacao">
                  <Translate contentKey="escolaOnlineApp.solicitacao.dataSolicitacao">Data Solicitacao</Translate>
                </Label>
                <AvField
                  id="solicitacao-dataSolicitacao"
                  data-cy="dataSolicitacao"
                  type="date"
                  className="form-control"
                  name="dataSolicitacao"
                />
              </AvGroup>
              <AvGroup>
                <Label id="observacoesSolicitanteLabel" for="solicitacao-observacoesSolicitante">
                  <Translate contentKey="escolaOnlineApp.solicitacao.observacoesSolicitante">Observacoes Solicitante</Translate>
                </Label>
                <AvField
                  id="solicitacao-observacoesSolicitante"
                  data-cy="observacoesSolicitante"
                  type="text"
                  name="observacoesSolicitante"
                />
              </AvGroup>
              <AvGroup>
                <Label id="observacoesAtendimentoLabel" for="solicitacao-observacoesAtendimento">
                  <Translate contentKey="escolaOnlineApp.solicitacao.observacoesAtendimento">Observacoes Atendimento</Translate>
                </Label>
                <AvField
                  id="solicitacao-observacoesAtendimento"
                  data-cy="observacoesAtendimento"
                  type="text"
                  name="observacoesAtendimento"
                />
              </AvGroup>
              <AvGroup>
                <Label for="solicitacao-tipoSolicitacaoSolicitacao">
                  <Translate contentKey="escolaOnlineApp.solicitacao.tipoSolicitacaoSolicitacao">Tipo Solicitacao Solicitacao</Translate>
                </Label>
                <AvInput
                  id="solicitacao-tipoSolicitacaoSolicitacao"
                  data-cy="tipoSolicitacaoSolicitacao"
                  type="select"
                  className="form-control"
                  name="tipoSolicitacaoSolicitacaoId"
                >
                  <option value="" key="0" />
                  {tipoSolicitacaos
                    ? tipoSolicitacaos.map(otherEntity => (
                        <option value={otherEntity.id} key={otherEntity.id}>
                          {otherEntity.id}
                        </option>
                      ))
                    : null}
                </AvInput>
              </AvGroup>
              <AvGroup>
                <Label for="solicitacao-alunoSolicitacao">
                  <Translate contentKey="escolaOnlineApp.solicitacao.alunoSolicitacao">Aluno Solicitacao</Translate>
                </Label>
                <AvInput
                  id="solicitacao-alunoSolicitacao"
                  data-cy="alunoSolicitacao"
                  type="select"
                  className="form-control"
                  name="alunoSolicitacaoId"
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
              <Button tag={Link} id="cancel-save" to="/solicitacao" replace color="info">
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
  tipoSolicitacaos: storeState.tipoSolicitacao.entities,
  alunos: storeState.aluno.entities,
  solicitacaoEntity: storeState.solicitacao.entity,
  loading: storeState.solicitacao.loading,
  updating: storeState.solicitacao.updating,
  updateSuccess: storeState.solicitacao.updateSuccess,
});

const mapDispatchToProps = {
  getTipoSolicitacaos,
  getAlunos,
  getEntity,
  updateEntity,
  createEntity,
  reset,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(SolicitacaoUpdate);
