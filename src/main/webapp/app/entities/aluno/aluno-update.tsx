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
import { IEscola } from 'app/shared/model/escola.model';
import { getEntities as getEscolas } from 'app/entities/escola/escola.reducer';
import { getEntity, updateEntity, createEntity, reset } from './aluno.reducer';
import { IAluno } from 'app/shared/model/aluno.model';
import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IAlunoUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const AlunoUpdate = (props: IAlunoUpdateProps) => {
  const [isNew] = useState(!props.match.params || !props.match.params.id);

  const { alunoEntity, pessoas, escolas, loading, updating } = props;

  const handleClose = () => {
    props.history.push('/aluno' + props.location.search);
  };

  useEffect(() => {
    if (isNew) {
      props.reset();
    } else {
      props.getEntity(props.match.params.id);
    }

    props.getPessoas();
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
        ...alunoEntity,
        ...values,
        pessoaAluno: pessoas.find(it => it.id.toString() === values.pessoaAlunoId.toString()),
        escolaAluno: escolas.find(it => it.id.toString() === values.escolaAlunoId.toString()),
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
          <h2 id="escolaOnlineApp.aluno.home.createOrEditLabel" data-cy="AlunoCreateUpdateHeading">
            <Translate contentKey="escolaOnlineApp.aluno.home.createOrEditLabel">Create or edit a Aluno</Translate>
          </h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <AvForm model={isNew ? {} : alunoEntity} onSubmit={saveEntity}>
              {!isNew ? (
                <AvGroup>
                  <Label for="aluno-id">
                    <Translate contentKey="global.field.id">ID</Translate>
                  </Label>
                  <AvInput id="aluno-id" type="text" className="form-control" name="id" required readOnly />
                </AvGroup>
              ) : null}
              <AvGroup>
                <Label id="dataNascimentoLabel" for="aluno-dataNascimento">
                  <Translate contentKey="escolaOnlineApp.aluno.dataNascimento">Data Nascimento</Translate>
                </Label>
                <AvField id="aluno-dataNascimento" data-cy="dataNascimento" type="date" className="form-control" name="dataNascimento" />
              </AvGroup>
              <AvGroup>
                <Label id="tipoSanguineoLabel" for="aluno-tipoSanguineo">
                  <Translate contentKey="escolaOnlineApp.aluno.tipoSanguineo">Tipo Sanguineo</Translate>
                </Label>
                <AvInput
                  id="aluno-tipoSanguineo"
                  data-cy="tipoSanguineo"
                  type="select"
                  className="form-control"
                  name="tipoSanguineo"
                  value={(!isNew && alunoEntity.tipoSanguineo) || 'NI'}
                >
                  <option value="NI">{translate('escolaOnlineApp.TipoSanguineo.NI')}</option>
                  <option value="AP">{translate('escolaOnlineApp.TipoSanguineo.AP')}</option>
                  <option value="AN">{translate('escolaOnlineApp.TipoSanguineo.AN')}</option>
                  <option value="BP">{translate('escolaOnlineApp.TipoSanguineo.BP')}</option>
                  <option value="BN">{translate('escolaOnlineApp.TipoSanguineo.BN')}</option>
                  <option value="ABP">{translate('escolaOnlineApp.TipoSanguineo.ABP')}</option>
                  <option value="ABN">{translate('escolaOnlineApp.TipoSanguineo.ABN')}</option>
                  <option value="OP">{translate('escolaOnlineApp.TipoSanguineo.OP')}</option>
                  <option value="ON">{translate('escolaOnlineApp.TipoSanguineo.ON')}</option>
                </AvInput>
              </AvGroup>
              <AvGroup>
                <Label id="nomePaiLabel" for="aluno-nomePai">
                  <Translate contentKey="escolaOnlineApp.aluno.nomePai">Nome Pai</Translate>
                </Label>
                <AvField id="aluno-nomePai" data-cy="nomePai" type="text" name="nomePai" />
              </AvGroup>
              <AvGroup>
                <Label id="telefonePaiLabel" for="aluno-telefonePai">
                  <Translate contentKey="escolaOnlineApp.aluno.telefonePai">Telefone Pai</Translate>
                </Label>
                <AvField id="aluno-telefonePai" data-cy="telefonePai" type="text" name="telefonePai" />
              </AvGroup>
              <AvGroup>
                <Label id="nomeMaeLabel" for="aluno-nomeMae">
                  <Translate contentKey="escolaOnlineApp.aluno.nomeMae">Nome Mae</Translate>
                </Label>
                <AvField id="aluno-nomeMae" data-cy="nomeMae" type="text" name="nomeMae" />
              </AvGroup>
              <AvGroup>
                <Label id="telefoneMaeLabel" for="aluno-telefoneMae">
                  <Translate contentKey="escolaOnlineApp.aluno.telefoneMae">Telefone Mae</Translate>
                </Label>
                <AvField id="aluno-telefoneMae" data-cy="telefoneMae" type="text" name="telefoneMae" />
              </AvGroup>
              <AvGroup>
                <Label id="nomeResponsavelLabel" for="aluno-nomeResponsavel">
                  <Translate contentKey="escolaOnlineApp.aluno.nomeResponsavel">Nome Responsavel</Translate>
                </Label>
                <AvField id="aluno-nomeResponsavel" data-cy="nomeResponsavel" type="text" name="nomeResponsavel" />
              </AvGroup>
              <AvGroup>
                <Label id="cpfResponsavelLabel" for="aluno-cpfResponsavel">
                  <Translate contentKey="escolaOnlineApp.aluno.cpfResponsavel">Cpf Responsavel</Translate>
                </Label>
                <AvField id="aluno-cpfResponsavel" data-cy="cpfResponsavel" type="text" name="cpfResponsavel" />
              </AvGroup>
              <AvGroup>
                <Label id="observacoesLabel" for="aluno-observacoes">
                  <Translate contentKey="escolaOnlineApp.aluno.observacoes">Observacoes</Translate>
                </Label>
                <AvField id="aluno-observacoes" data-cy="observacoes" type="text" name="observacoes" />
              </AvGroup>
              <AvGroup>
                <Label for="aluno-pessoaAluno">
                  <Translate contentKey="escolaOnlineApp.aluno.pessoaAluno">Pessoa Aluno</Translate>
                </Label>
                <AvInput id="aluno-pessoaAluno" data-cy="pessoaAluno" type="select" className="form-control" name="pessoaAlunoId">
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
                <Label for="aluno-escolaAluno">
                  <Translate contentKey="escolaOnlineApp.aluno.escolaAluno">Escola Aluno</Translate>
                </Label>
                <AvInput id="aluno-escolaAluno" data-cy="escolaAluno" type="select" className="form-control" name="escolaAlunoId">
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
              <Button tag={Link} id="cancel-save" to="/aluno" replace color="info">
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
  escolas: storeState.escola.entities,
  alunoEntity: storeState.aluno.entity,
  loading: storeState.aluno.loading,
  updating: storeState.aluno.updating,
  updateSuccess: storeState.aluno.updateSuccess,
});

const mapDispatchToProps = {
  getPessoas,
  getEscolas,
  getEntity,
  updateEntity,
  createEntity,
  reset,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(AlunoUpdate);
