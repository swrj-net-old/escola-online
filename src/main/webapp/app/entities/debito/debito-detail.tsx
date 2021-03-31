import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './debito.reducer';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IDebitoDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const DebitoDetail = (props: IDebitoDetailProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

  const { debitoEntity } = props;
  return (
    <Row>
      <Col md="8">
        <h2 data-cy="debitoDetailsHeading">
          <Translate contentKey="escolaOnlineApp.debito.detail.title">Debito</Translate>
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="id">
              <Translate contentKey="global.field.id">ID</Translate>
            </span>
          </dt>
          <dd>{debitoEntity.id}</dd>
          <dt>
            <span id="tipoDebito">
              <Translate contentKey="escolaOnlineApp.debito.tipoDebito">Tipo Debito</Translate>
            </span>
          </dt>
          <dd>{debitoEntity.tipoDebito}</dd>
          <dt>
            <span id="situacaoDebito">
              <Translate contentKey="escolaOnlineApp.debito.situacaoDebito">Situacao Debito</Translate>
            </span>
          </dt>
          <dd>{debitoEntity.situacaoDebito}</dd>
          <dt>
            <span id="dataVencimento">
              <Translate contentKey="escolaOnlineApp.debito.dataVencimento">Data Vencimento</Translate>
            </span>
          </dt>
          <dd>
            {debitoEntity.dataVencimento ? (
              <TextFormat value={debitoEntity.dataVencimento} type="date" format={APP_LOCAL_DATE_FORMAT} />
            ) : null}
          </dd>
          <dt>
            <span id="dataPagamento">
              <Translate contentKey="escolaOnlineApp.debito.dataPagamento">Data Pagamento</Translate>
            </span>
          </dt>
          <dd>
            {debitoEntity.dataPagamento ? (
              <TextFormat value={debitoEntity.dataPagamento} type="date" format={APP_LOCAL_DATE_FORMAT} />
            ) : null}
          </dd>
          <dt>
            <span id="valorOriginal">
              <Translate contentKey="escolaOnlineApp.debito.valorOriginal">Valor Original</Translate>
            </span>
          </dt>
          <dd>{debitoEntity.valorOriginal}</dd>
          <dt>
            <span id="totalPago">
              <Translate contentKey="escolaOnlineApp.debito.totalPago">Total Pago</Translate>
            </span>
          </dt>
          <dd>{debitoEntity.totalPago}</dd>
          <dt>
            <span id="totalDesconto">
              <Translate contentKey="escolaOnlineApp.debito.totalDesconto">Total Desconto</Translate>
            </span>
          </dt>
          <dd>{debitoEntity.totalDesconto}</dd>
          <dt>
            <span id="totalDevido">
              <Translate contentKey="escolaOnlineApp.debito.totalDevido">Total Devido</Translate>
            </span>
          </dt>
          <dd>{debitoEntity.totalDevido}</dd>
          <dt>
            <span id="observacoes">
              <Translate contentKey="escolaOnlineApp.debito.observacoes">Observacoes</Translate>
            </span>
          </dt>
          <dd>{debitoEntity.observacoes}</dd>
          <dt>
            <Translate contentKey="escolaOnlineApp.debito.alunoDebito">Aluno Debito</Translate>
          </dt>
          <dd>{debitoEntity.alunoDebito ? debitoEntity.alunoDebito.id : ''}</dd>
        </dl>
        <Button tag={Link} to="/debito" replace color="info" data-cy="entityDetailsBackButton">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/debito/${debitoEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

const mapStateToProps = ({ debito }: IRootState) => ({
  debitoEntity: debito.entity,
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(DebitoDetail);
