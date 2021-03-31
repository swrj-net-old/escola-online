import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
import { Translate, translate } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { IDebito } from 'app/shared/model/debito.model';
import { getEntities as getDebitos } from 'app/entities/debito/debito.reducer';
import { IDetalheUsuario } from 'app/shared/model/detalhe-usuario.model';
import { getEntities as getDetalheUsuarios } from 'app/entities/detalhe-usuario/detalhe-usuario.reducer';
import { getEntity, updateEntity, createEntity, reset } from './historico-debito.reducer';
import { IHistoricoDebito } from 'app/shared/model/historico-debito.model';
import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IHistoricoDebitoUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const HistoricoDebitoUpdate = (props: IHistoricoDebitoUpdateProps) => {
  const [isNew] = useState(!props.match.params || !props.match.params.id);

  const { historicoDebitoEntity, debitos, detalheUsuarios, loading, updating } = props;

  const handleClose = () => {
    props.history.push('/historico-debito' + props.location.search);
  };

  useEffect(() => {
    if (isNew) {
      props.reset();
    } else {
      props.getEntity(props.match.params.id);
    }

    props.getDebitos();
    props.getDetalheUsuarios();
  }, []);

  useEffect(() => {
    if (props.updateSuccess) {
      handleClose();
    }
  }, [props.updateSuccess]);

  const saveEntity = (event, errors, values) => {
    if (errors.length === 0) {
      const entity = {
        ...historicoDebitoEntity,
        ...values,
        debitoHistoricoDebito: debitos.find(it => it.id.toString() === values.debitoHistoricoDebitoId.toString()),
        detalheUsuarioLancamento: detalheUsuarios.find(it => it.id.toString() === values.detalheUsuarioLancamentoId.toString()),
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
          <h2 id="escolaOnlineApp.historicoDebito.home.createOrEditLabel" data-cy="HistoricoDebitoCreateUpdateHeading">
            <Translate contentKey="escolaOnlineApp.historicoDebito.home.createOrEditLabel">Create or edit a HistoricoDebito</Translate>
          </h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <AvForm model={isNew ? {} : historicoDebitoEntity} onSubmit={saveEntity}>
              {!isNew ? (
                <AvGroup>
                  <Label for="historico-debito-id">
                    <Translate contentKey="global.field.id">ID</Translate>
                  </Label>
                  <AvInput id="historico-debito-id" type="text" className="form-control" name="id" required readOnly />
                </AvGroup>
              ) : null}
              <AvGroup>
                <Label id="dataLancamentoLabel" for="historico-debito-dataLancamento">
                  <Translate contentKey="escolaOnlineApp.historicoDebito.dataLancamento">Data Lancamento</Translate>
                </Label>
                <AvField
                  id="historico-debito-dataLancamento"
                  data-cy="dataLancamento"
                  type="date"
                  className="form-control"
                  name="dataLancamento"
                />
              </AvGroup>
              <AvGroup>
                <Label id="situacaoDebitoLabel" for="historico-debito-situacaoDebito">
                  <Translate contentKey="escolaOnlineApp.historicoDebito.situacaoDebito">Situacao Debito</Translate>
                </Label>
                <AvInput
                  id="historico-debito-situacaoDebito"
                  data-cy="situacaoDebito"
                  type="select"
                  className="form-control"
                  name="situacaoDebito"
                  value={(!isNew && historicoDebitoEntity.situacaoDebito) || 'NAO_PAGO'}
                >
                  <option value="NAO_PAGO">{translate('escolaOnlineApp.SituacaoDebito.NAO_PAGO')}</option>
                  <option value="PAGO_PARCIAL">{translate('escolaOnlineApp.SituacaoDebito.PAGO_PARCIAL')}</option>
                  <option value="PAGO">{translate('escolaOnlineApp.SituacaoDebito.PAGO')}</option>
                  <option value="CANCELADO">{translate('escolaOnlineApp.SituacaoDebito.CANCELADO')}</option>
                </AvInput>
              </AvGroup>
              <AvGroup>
                <Label id="dataVencimentoLabel" for="historico-debito-dataVencimento">
                  <Translate contentKey="escolaOnlineApp.historicoDebito.dataVencimento">Data Vencimento</Translate>
                </Label>
                <AvField
                  id="historico-debito-dataVencimento"
                  data-cy="dataVencimento"
                  type="date"
                  className="form-control"
                  name="dataVencimento"
                />
              </AvGroup>
              <AvGroup>
                <Label id="dataPagamentoLabel" for="historico-debito-dataPagamento">
                  <Translate contentKey="escolaOnlineApp.historicoDebito.dataPagamento">Data Pagamento</Translate>
                </Label>
                <AvField
                  id="historico-debito-dataPagamento"
                  data-cy="dataPagamento"
                  type="date"
                  className="form-control"
                  name="dataPagamento"
                />
              </AvGroup>
              <AvGroup>
                <Label id="valorOriginalLabel" for="historico-debito-valorOriginal">
                  <Translate contentKey="escolaOnlineApp.historicoDebito.valorOriginal">Valor Original</Translate>
                </Label>
                <AvField id="historico-debito-valorOriginal" data-cy="valorOriginal" type="text" name="valorOriginal" />
              </AvGroup>
              <AvGroup>
                <Label id="totalPagoLabel" for="historico-debito-totalPago">
                  <Translate contentKey="escolaOnlineApp.historicoDebito.totalPago">Total Pago</Translate>
                </Label>
                <AvField id="historico-debito-totalPago" data-cy="totalPago" type="text" name="totalPago" />
              </AvGroup>
              <AvGroup>
                <Label id="totalDescontoLabel" for="historico-debito-totalDesconto">
                  <Translate contentKey="escolaOnlineApp.historicoDebito.totalDesconto">Total Desconto</Translate>
                </Label>
                <AvField id="historico-debito-totalDesconto" data-cy="totalDesconto" type="text" name="totalDesconto" />
              </AvGroup>
              <AvGroup>
                <Label id="totalDevidoLabel" for="historico-debito-totalDevido">
                  <Translate contentKey="escolaOnlineApp.historicoDebito.totalDevido">Total Devido</Translate>
                </Label>
                <AvField id="historico-debito-totalDevido" data-cy="totalDevido" type="text" name="totalDevido" />
              </AvGroup>
              <AvGroup>
                <Label id="observacoesLabel" for="historico-debito-observacoes">
                  <Translate contentKey="escolaOnlineApp.historicoDebito.observacoes">Observacoes</Translate>
                </Label>
                <AvField id="historico-debito-observacoes" data-cy="observacoes" type="text" name="observacoes" />
              </AvGroup>
              <AvGroup>
                <Label for="historico-debito-debitoHistoricoDebito">
                  <Translate contentKey="escolaOnlineApp.historicoDebito.debitoHistoricoDebito">Debito Historico Debito</Translate>
                </Label>
                <AvInput
                  id="historico-debito-debitoHistoricoDebito"
                  data-cy="debitoHistoricoDebito"
                  type="select"
                  className="form-control"
                  name="debitoHistoricoDebitoId"
                >
                  <option value="" key="0" />
                  {debitos
                    ? debitos.map(otherEntity => (
                        <option value={otherEntity.id} key={otherEntity.id}>
                          {otherEntity.id}
                        </option>
                      ))
                    : null}
                </AvInput>
              </AvGroup>
              <AvGroup>
                <Label for="historico-debito-detalheUsuarioLancamento">
                  <Translate contentKey="escolaOnlineApp.historicoDebito.detalheUsuarioLancamento">Detalhe Usuario Lancamento</Translate>
                </Label>
                <AvInput
                  id="historico-debito-detalheUsuarioLancamento"
                  data-cy="detalheUsuarioLancamento"
                  type="select"
                  className="form-control"
                  name="detalheUsuarioLancamentoId"
                >
                  <option value="" key="0" />
                  {detalheUsuarios
                    ? detalheUsuarios.map(otherEntity => (
                        <option value={otherEntity.id} key={otherEntity.id}>
                          {otherEntity.id}
                        </option>
                      ))
                    : null}
                </AvInput>
              </AvGroup>
              <Button tag={Link} id="cancel-save" to="/historico-debito" replace color="info">
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
  debitos: storeState.debito.entities,
  detalheUsuarios: storeState.detalheUsuario.entities,
  historicoDebitoEntity: storeState.historicoDebito.entity,
  loading: storeState.historicoDebito.loading,
  updating: storeState.historicoDebito.updating,
  updateSuccess: storeState.historicoDebito.updateSuccess,
});

const mapDispatchToProps = {
  getDebitos,
  getDetalheUsuarios,
  getEntity,
  updateEntity,
  createEntity,
  reset,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(HistoricoDebitoUpdate);
