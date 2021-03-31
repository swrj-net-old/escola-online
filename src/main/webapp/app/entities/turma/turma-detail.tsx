import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './turma.reducer';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface ITurmaDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const TurmaDetail = (props: ITurmaDetailProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

  const { turmaEntity } = props;
  return (
    <Row>
      <Col md="8">
        <h2 data-cy="turmaDetailsHeading">
          <Translate contentKey="escolaOnlineApp.turma.detail.title">Turma</Translate>
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="id">
              <Translate contentKey="global.field.id">ID</Translate>
            </span>
          </dt>
          <dd>{turmaEntity.id}</dd>
          <dt>
            <span id="nome">
              <Translate contentKey="escolaOnlineApp.turma.nome">Nome</Translate>
            </span>
          </dt>
          <dd>{turmaEntity.nome}</dd>
          <dt>
            <Translate contentKey="escolaOnlineApp.turma.serieTurma">Serie Turma</Translate>
          </dt>
          <dd>{turmaEntity.serieTurma ? turmaEntity.serieTurma.id : ''}</dd>
          <dt>
            <Translate contentKey="escolaOnlineApp.turma.unidadeTurma">Unidade Turma</Translate>
          </dt>
          <dd>{turmaEntity.unidadeTurma ? turmaEntity.unidadeTurma.id : ''}</dd>
        </dl>
        <Button tag={Link} to="/turma" replace color="info" data-cy="entityDetailsBackButton">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/turma/${turmaEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

const mapStateToProps = ({ turma }: IRootState) => ({
  turmaEntity: turma.entity,
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(TurmaDetail);
