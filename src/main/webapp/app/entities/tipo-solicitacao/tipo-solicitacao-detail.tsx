import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './tipo-solicitacao.reducer';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface ITipoSolicitacaoDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const TipoSolicitacaoDetail = (props: ITipoSolicitacaoDetailProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

  const { tipoSolicitacaoEntity } = props;
  return (
    <Row>
      <Col md="8">
        <h2 data-cy="tipoSolicitacaoDetailsHeading">
          <Translate contentKey="escolaOnlineApp.tipoSolicitacao.detail.title">TipoSolicitacao</Translate>
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="id">
              <Translate contentKey="global.field.id">ID</Translate>
            </span>
          </dt>
          <dd>{tipoSolicitacaoEntity.id}</dd>
          <dt>
            <span id="nome">
              <Translate contentKey="escolaOnlineApp.tipoSolicitacao.nome">Nome</Translate>
            </span>
          </dt>
          <dd>{tipoSolicitacaoEntity.nome}</dd>
          <dt>
            <span id="prazoAtendimento">
              <Translate contentKey="escolaOnlineApp.tipoSolicitacao.prazoAtendimento">Prazo Atendimento</Translate>
            </span>
          </dt>
          <dd>{tipoSolicitacaoEntity.prazoAtendimento}</dd>
          <dt>
            <span id="valorEmissao">
              <Translate contentKey="escolaOnlineApp.tipoSolicitacao.valorEmissao">Valor Emissao</Translate>
            </span>
          </dt>
          <dd>{tipoSolicitacaoEntity.valorEmissao}</dd>
          <dt>
            <Translate contentKey="escolaOnlineApp.tipoSolicitacao.escolaTipoSolicitacao">Escola Tipo Solicitacao</Translate>
          </dt>
          <dd>{tipoSolicitacaoEntity.escolaTipoSolicitacao ? tipoSolicitacaoEntity.escolaTipoSolicitacao.id : ''}</dd>
        </dl>
        <Button tag={Link} to="/tipo-solicitacao" replace color="info" data-cy="entityDetailsBackButton">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/tipo-solicitacao/${tipoSolicitacaoEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

const mapStateToProps = ({ tipoSolicitacao }: IRootState) => ({
  tipoSolicitacaoEntity: tipoSolicitacao.entity,
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(TipoSolicitacaoDetail);
