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
import { getEntity, updateEntity, createEntity, reset } from './debito.reducer';
import { IDebito } from 'app/shared/model/debito.model';
import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IDebitoUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const DebitoUpdate = (props: IDebitoUpdateProps) => {
  const [isNew] = useState(!props.match.params || !props.match.params.id);

  const { debitoEntity, alunos, loading, updating } = props;

  const handleClose = () => {
    props.history.push('/debito' + props.location.search);
  };

  useEffect(() => {
    if (isNew) {
      props.reset();
    } else {
      props.getEntity(props.match.params.id);
    }

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
        ...debitoEntity,
        ...values,
        alunoDebito: alunos.find(it => it.id.toString() === values.alunoDebitoId.toString()),
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
          <h2 id="escolaOnlineApp.debito.home.createOrEditLabel" data-cy="DebitoCreateUpdateHeading">
            <Translate contentKey="escolaOnlineApp.debito.home.createOrEditLabel">Create or edit a Debito</Translate>
          </h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <AvForm model={isNew ? {} : debitoEntity} onSubmit={saveEntity}>
              {!isNew ? (
                <AvGroup>
                  <Label for="debito-id">
                    <Translate contentKey="global.field.id">ID</Translate>
                  </Label>
                  <AvInput id="debito-id" type="text" className="form-control" name="id" required readOnly />
                </AvGroup>
              ) : null}
              <AvGroup>
                <Label id="tipoDebitoLabel" for="debito-tipoDebito">
                  <Translate contentKey="escolaOnlineApp.debito.tipoDebito">Tipo Debito</Translate>
                </Label>
                <AvInput
                  id="debito-tipoDebito"
                  data-cy="tipoDebito"
                  type="select"
                  className="form-control"
                  name="tipoDebito"
                  value={(!isNew && debitoEntity.tipoDebito) || 'MENSALIDADE'}
                >
                  <option value="MENSALIDADE">{translate('escolaOnlineApp.TipoDebito.MENSALIDADE')}</option>
                  <option value="TAXA_MATERIAL">{translate('escolaOnlineApp.TipoDebito.TAXA_MATERIAL')}</option>
                  <option value="TAXA_MATRICULA">{translate('escolaOnlineApp.TipoDebito.TAXA_MATRICULA')}</option>
                  <option value="TAXA_DOCUMENTO">{translate('escolaOnlineApp.TipoDebito.TAXA_DOCUMENTO')}</option>
                  <option value="UNIFORME">{translate('escolaOnlineApp.TipoDebito.UNIFORME')}</option>
                  <option value="LIVRO">{translate('escolaOnlineApp.TipoDebito.LIVRO')}</option>
                  <option value="CANTINA">{translate('escolaOnlineApp.TipoDebito.CANTINA')}</option>
                  <option value="EVENTO">{translate('escolaOnlineApp.TipoDebito.EVENTO')}</option>
                  <option value="OUTROS">{translate('escolaOnlineApp.TipoDebito.OUTROS')}</option>
                </AvInput>
              </AvGroup>
              <AvGroup>
                <Label id="situacaoDebitoLabel" for="debito-situacaoDebito">
                  <Translate contentKey="escolaOnlineApp.debito.situacaoDebito">Situacao Debito</Translate>
                </Label>
                <AvInput
                  id="debito-situacaoDebito"
                  data-cy="situacaoDebito"
                  type="select"
                  className="form-control"
                  name="situacaoDebito"
                  value={(!isNew && debitoEntity.situacaoDebito) || 'NAO_PAGO'}
                >
                  <option value="NAO_PAGO">{translate('escolaOnlineApp.SituacaoDebito.NAO_PAGO')}</option>
                  <option value="PAGO_PARCIAL">{translate('escolaOnlineApp.SituacaoDebito.PAGO_PARCIAL')}</option>
                  <option value="PAGO">{translate('escolaOnlineApp.SituacaoDebito.PAGO')}</option>
                  <option value="CANCELADO">{translate('escolaOnlineApp.SituacaoDebito.CANCELADO')}</option>
                </AvInput>
              </AvGroup>
              <AvGroup>
                <Label id="dataVencimentoLabel" for="debito-dataVencimento">
                  <Translate contentKey="escolaOnlineApp.debito.dataVencimento">Data Vencimento</Translate>
                </Label>
                <AvField id="debito-dataVencimento" data-cy="dataVencimento" type="date" className="form-control" name="dataVencimento" />
              </AvGroup>
              <AvGroup>
                <Label id="dataPagamentoLabel" for="debito-dataPagamento">
                  <Translate contentKey="escolaOnlineApp.debito.dataPagamento">Data Pagamento</Translate>
                </Label>
                <AvField id="debito-dataPagamento" data-cy="dataPagamento" type="date" className="form-control" name="dataPagamento" />
              </AvGroup>
              <AvGroup>
                <Label id="valorOriginalLabel" for="debito-valorOriginal">
                  <Translate contentKey="escolaOnlineApp.debito.valorOriginal">Valor Original</Translate>
                </Label>
                <AvField id="debito-valorOriginal" data-cy="valorOriginal" type="text" name="valorOriginal" />
              </AvGroup>
              <AvGroup>
                <Label id="totalPagoLabel" for="debito-totalPago">
                  <Translate contentKey="escolaOnlineApp.debito.totalPago">Total Pago</Translate>
                </Label>
                <AvField id="debito-totalPago" data-cy="totalPago" type="text" name="totalPago" />
              </AvGroup>
              <AvGroup>
                <Label id="totalDescontoLabel" for="debito-totalDesconto">
                  <Translate contentKey="escolaOnlineApp.debito.totalDesconto">Total Desconto</Translate>
                </Label>
                <AvField id="debito-totalDesconto" data-cy="totalDesconto" type="text" name="totalDesconto" />
              </AvGroup>
              <AvGroup>
                <Label id="totalDevidoLabel" for="debito-totalDevido">
                  <Translate contentKey="escolaOnlineApp.debito.totalDevido">Total Devido</Translate>
                </Label>
                <AvField id="debito-totalDevido" data-cy="totalDevido" type="text" name="totalDevido" />
              </AvGroup>
              <AvGroup>
                <Label id="observacoesLabel" for="debito-observacoes">
                  <Translate contentKey="escolaOnlineApp.debito.observacoes">Observacoes</Translate>
                </Label>
                <AvField id="debito-observacoes" data-cy="observacoes" type="text" name="observacoes" />
              </AvGroup>
              <AvGroup>
                <Label for="debito-alunoDebito">
                  <Translate contentKey="escolaOnlineApp.debito.alunoDebito">Aluno Debito</Translate>
                </Label>
                <AvInput id="debito-alunoDebito" data-cy="alunoDebito" type="select" className="form-control" name="alunoDebitoId">
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
              <Button tag={Link} id="cancel-save" to="/debito" replace color="info">
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
  debitoEntity: storeState.debito.entity,
  loading: storeState.debito.loading,
  updating: storeState.debito.updating,
  updateSuccess: storeState.debito.updateSuccess,
});

const mapDispatchToProps = {
  getAlunos,
  getEntity,
  updateEntity,
  createEntity,
  reset,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(DebitoUpdate);
