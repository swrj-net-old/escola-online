import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './historico-debito.reducer';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IHistoricoDebitoDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const HistoricoDebitoDetail = (props: IHistoricoDebitoDetailProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

  const { historicoDebitoEntity } = props;
  return (
    <Row>
      <Col md="8">
        <h2 data-cy="historicoDebitoDetailsHeading">
          <Translate contentKey="escolaOnlineApp.historicoDebito.detail.title">HistoricoDebito</Translate>
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="id">
              <Translate contentKey="global.field.id">ID</Translate>
            </span>
          </dt>
          <dd>{historicoDebitoEntity.id}</dd>
          <dt>
            <span id="dataLancamento">
              <Translate contentKey="escolaOnlineApp.historicoDebito.dataLancamento">Data Lancamento</Translate>
            </span>
          </dt>
          <dd>
            {historicoDebitoEntity.dataLancamento ? (
              <TextFormat value={historicoDebitoEntity.dataLancamento} type="date" format={APP_LOCAL_DATE_FORMAT} />
            ) : null}
          </dd>
          <dt>
            <span id="situacaoDebito">
              <Translate contentKey="escolaOnlineApp.historicoDebito.situacaoDebito">Situacao Debito</Translate>
            </span>
          </dt>
          <dd>{historicoDebitoEntity.situacaoDebito}</dd>
          <dt>
            <span id="dataVencimento">
              <Translate contentKey="escolaOnlineApp.historicoDebito.dataVencimento">Data Vencimento</Translate>
            </span>
          </dt>
          <dd>
            {historicoDebitoEntity.dataVencimento ? (
              <TextFormat value={historicoDebitoEntity.dataVencimento} type="date" format={APP_LOCAL_DATE_FORMAT} />
            ) : null}
          </dd>
          <dt>
            <span id="dataPagamento">
              <Translate contentKey="escolaOnlineApp.historicoDebito.dataPagamento">Data Pagamento</Translate>
            </span>
          </dt>
          <dd>
            {historicoDebitoEntity.dataPagamento ? (
              <TextFormat value={historicoDebitoEntity.dataPagamento} type="date" format={APP_LOCAL_DATE_FORMAT} />
            ) : null}
          </dd>
          <dt>
            <span id="valorOriginal">
              <Translate contentKey="escolaOnlineApp.historicoDebito.valorOriginal">Valor Original</Translate>
            </span>
          </dt>
          <dd>{historicoDebitoEntity.valorOriginal}</dd>
          <dt>
            <span id="totalPago">
              <Translate contentKey="escolaOnlineApp.historicoDebito.totalPago">Total Pago</Translate>
            </span>
          </dt>
          <dd>{historicoDebitoEntity.totalPago}</dd>
          <dt>
            <span id="totalDesconto">
              <Translate contentKey="escolaOnlineApp.historicoDebito.totalDesconto">Total Desconto</Translate>
            </span>
          </dt>
          <dd>{historicoDebitoEntity.totalDesconto}</dd>
          <dt>
            <span id="totalDevido">
              <Translate contentKey="escolaOnlineApp.historicoDebito.totalDevido">Total Devido</Translate>
            </span>
          </dt>
          <dd>{historicoDebitoEntity.totalDevido}</dd>
          <dt>
            <span id="observacoes">
              <Translate contentKey="escolaOnlineApp.historicoDebito.observacoes">Observacoes</Translate>
            </span>
          </dt>
          <dd>{historicoDebitoEntity.observacoes}</dd>
          <dt>
            <Translate contentKey="escolaOnlineApp.historicoDebito.debitoHistoricoDebito">Debito Historico Debito</Translate>
          </dt>
          <dd>{historicoDebitoEntity.debitoHistoricoDebito ? historicoDebitoEntity.debitoHistoricoDebito.id : ''}</dd>
          <dt>
            <Translate contentKey="escolaOnlineApp.historicoDebito.detalheUsuarioLancamento">Detalhe Usuario Lancamento</Translate>
          </dt>
          <dd>{historicoDebitoEntity.detalheUsuarioLancamento ? historicoDebitoEntity.detalheUsuarioLancamento.id : ''}</dd>
        </dl>
        <Button tag={Link} to="/historico-debito" replace color="info" data-cy="entityDetailsBackButton">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/historico-debito/${historicoDebitoEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

const mapStateToProps = ({ historicoDebito }: IRootState) => ({
  historicoDebitoEntity: historicoDebito.entity,
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(HistoricoDebitoDetail);
