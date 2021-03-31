import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './solicitacao.reducer';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface ISolicitacaoDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const SolicitacaoDetail = (props: ISolicitacaoDetailProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

  const { solicitacaoEntity } = props;
  return (
    <Row>
      <Col md="8">
        <h2 data-cy="solicitacaoDetailsHeading">
          <Translate contentKey="escolaOnlineApp.solicitacao.detail.title">Solicitacao</Translate>
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="id">
              <Translate contentKey="global.field.id">ID</Translate>
            </span>
          </dt>
          <dd>{solicitacaoEntity.id}</dd>
          <dt>
            <span id="situacaoSolicitacao">
              <Translate contentKey="escolaOnlineApp.solicitacao.situacaoSolicitacao">Situacao Solicitacao</Translate>
            </span>
          </dt>
          <dd>{solicitacaoEntity.situacaoSolicitacao}</dd>
          <dt>
            <span id="dataSolicitacao">
              <Translate contentKey="escolaOnlineApp.solicitacao.dataSolicitacao">Data Solicitacao</Translate>
            </span>
          </dt>
          <dd>
            {solicitacaoEntity.dataSolicitacao ? (
              <TextFormat value={solicitacaoEntity.dataSolicitacao} type="date" format={APP_LOCAL_DATE_FORMAT} />
            ) : null}
          </dd>
          <dt>
            <span id="observacoesSolicitante">
              <Translate contentKey="escolaOnlineApp.solicitacao.observacoesSolicitante">Observacoes Solicitante</Translate>
            </span>
          </dt>
          <dd>{solicitacaoEntity.observacoesSolicitante}</dd>
          <dt>
            <span id="observacoesAtendimento">
              <Translate contentKey="escolaOnlineApp.solicitacao.observacoesAtendimento">Observacoes Atendimento</Translate>
            </span>
          </dt>
          <dd>{solicitacaoEntity.observacoesAtendimento}</dd>
          <dt>
            <Translate contentKey="escolaOnlineApp.solicitacao.tipoSolicitacaoSolicitacao">Tipo Solicitacao Solicitacao</Translate>
          </dt>
          <dd>{solicitacaoEntity.tipoSolicitacaoSolicitacao ? solicitacaoEntity.tipoSolicitacaoSolicitacao.id : ''}</dd>
          <dt>
            <Translate contentKey="escolaOnlineApp.solicitacao.alunoSolicitacao">Aluno Solicitacao</Translate>
          </dt>
          <dd>{solicitacaoEntity.alunoSolicitacao ? solicitacaoEntity.alunoSolicitacao.id : ''}</dd>
        </dl>
        <Button tag={Link} to="/solicitacao" replace color="info" data-cy="entityDetailsBackButton">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/solicitacao/${solicitacaoEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

const mapStateToProps = ({ solicitacao }: IRootState) => ({
  solicitacaoEntity: solicitacao.entity,
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(SolicitacaoDetail);
