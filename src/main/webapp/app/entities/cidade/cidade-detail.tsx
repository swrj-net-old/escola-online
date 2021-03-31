import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './cidade.reducer';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface ICidadeDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const CidadeDetail = (props: ICidadeDetailProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

  const { cidadeEntity } = props;
  return (
    <Row>
      <Col md="8">
        <h2 data-cy="cidadeDetailsHeading">
          <Translate contentKey="escolaOnlineApp.cidade.detail.title">Cidade</Translate>
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="id">
              <Translate contentKey="global.field.id">ID</Translate>
            </span>
          </dt>
          <dd>{cidadeEntity.id}</dd>
          <dt>
            <span id="nome">
              <Translate contentKey="escolaOnlineApp.cidade.nome">Nome</Translate>
            </span>
          </dt>
          <dd>{cidadeEntity.nome}</dd>
          <dt>
            <span id="uf">
              <Translate contentKey="escolaOnlineApp.cidade.uf">Uf</Translate>
            </span>
          </dt>
          <dd>{cidadeEntity.uf}</dd>
        </dl>
        <Button tag={Link} to="/cidade" replace color="info" data-cy="entityDetailsBackButton">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/cidade/${cidadeEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

const mapStateToProps = ({ cidade }: IRootState) => ({
  cidadeEntity: cidade.entity,
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(CidadeDetail);
