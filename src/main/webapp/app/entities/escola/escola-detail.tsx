import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './escola.reducer';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IEscolaDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const EscolaDetail = (props: IEscolaDetailProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

  const { escolaEntity } = props;
  return (
    <Row>
      <Col md="8">
        <h2 data-cy="escolaDetailsHeading">
          <Translate contentKey="escolaOnlineApp.escola.detail.title">Escola</Translate>
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="id">
              <Translate contentKey="global.field.id">ID</Translate>
            </span>
          </dt>
          <dd>{escolaEntity.id}</dd>
          <dt>
            <span id="nome">
              <Translate contentKey="escolaOnlineApp.escola.nome">Nome</Translate>
            </span>
          </dt>
          <dd>{escolaEntity.nome}</dd>
          <dt>
            <span id="razaoSocial">
              <Translate contentKey="escolaOnlineApp.escola.razaoSocial">Razao Social</Translate>
            </span>
          </dt>
          <dd>{escolaEntity.razaoSocial}</dd>
          <dt>
            <span id="cnpjPrincipal">
              <Translate contentKey="escolaOnlineApp.escola.cnpjPrincipal">Cnpj Principal</Translate>
            </span>
          </dt>
          <dd>{escolaEntity.cnpjPrincipal}</dd>
          <dt>
            <span id="url">
              <Translate contentKey="escolaOnlineApp.escola.url">Url</Translate>
            </span>
          </dt>
          <dd>{escolaEntity.url}</dd>
          <dt>
            <span id="prefixo">
              <Translate contentKey="escolaOnlineApp.escola.prefixo">Prefixo</Translate>
            </span>
          </dt>
          <dd>{escolaEntity.prefixo}</dd>
          <dt>
            <span id="responsavelNome">
              <Translate contentKey="escolaOnlineApp.escola.responsavelNome">Responsavel Nome</Translate>
            </span>
          </dt>
          <dd>{escolaEntity.responsavelNome}</dd>
          <dt>
            <span id="responsavelCpf">
              <Translate contentKey="escolaOnlineApp.escola.responsavelCpf">Responsavel Cpf</Translate>
            </span>
          </dt>
          <dd>{escolaEntity.responsavelCpf}</dd>
          <dt>
            <span id="responsavelEmail">
              <Translate contentKey="escolaOnlineApp.escola.responsavelEmail">Responsavel Email</Translate>
            </span>
          </dt>
          <dd>{escolaEntity.responsavelEmail}</dd>
          <dt>
            <span id="responsavelCelular">
              <Translate contentKey="escolaOnlineApp.escola.responsavelCelular">Responsavel Celular</Translate>
            </span>
          </dt>
          <dd>{escolaEntity.responsavelCelular}</dd>
        </dl>
        <Button tag={Link} to="/escola" replace color="info" data-cy="entityDetailsBackButton">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/escola/${escolaEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

const mapStateToProps = ({ escola }: IRootState) => ({
  escolaEntity: escola.entity,
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(EscolaDetail);
