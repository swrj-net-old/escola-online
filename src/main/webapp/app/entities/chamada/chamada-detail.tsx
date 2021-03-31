import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './chamada.reducer';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IChamadaDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const ChamadaDetail = (props: IChamadaDetailProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

  const { chamadaEntity } = props;
  return (
    <Row>
      <Col md="8">
        <h2 data-cy="chamadaDetailsHeading">
          <Translate contentKey="escolaOnlineApp.chamada.detail.title">Chamada</Translate>
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="id">
              <Translate contentKey="global.field.id">ID</Translate>
            </span>
          </dt>
          <dd>{chamadaEntity.id}</dd>
          <dt>
            <span id="dataAula">
              <Translate contentKey="escolaOnlineApp.chamada.dataAula">Data Aula</Translate>
            </span>
          </dt>
          <dd>
            {chamadaEntity.dataAula ? <TextFormat value={chamadaEntity.dataAula} type="date" format={APP_LOCAL_DATE_FORMAT} /> : null}
          </dd>
          <dt>
            <span id="observacoes">
              <Translate contentKey="escolaOnlineApp.chamada.observacoes">Observacoes</Translate>
            </span>
          </dt>
          <dd>{chamadaEntity.observacoes}</dd>
          <dt>
            <Translate contentKey="escolaOnlineApp.chamada.alunoChamada">Aluno Chamada</Translate>
          </dt>
          <dd>{chamadaEntity.alunoChamada ? chamadaEntity.alunoChamada.id : ''}</dd>
          <dt>
            <Translate contentKey="escolaOnlineApp.chamada.turmaChamada">Turma Chamada</Translate>
          </dt>
          <dd>{chamadaEntity.turmaChamada ? chamadaEntity.turmaChamada.id : ''}</dd>
          <dt>
            <Translate contentKey="escolaOnlineApp.chamada.professorChamada">Professor Chamada</Translate>
          </dt>
          <dd>{chamadaEntity.professorChamada ? chamadaEntity.professorChamada.id : ''}</dd>
        </dl>
        <Button tag={Link} to="/chamada" replace color="info" data-cy="entityDetailsBackButton">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/chamada/${chamadaEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

const mapStateToProps = ({ chamada }: IRootState) => ({
  chamadaEntity: chamada.entity,
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(ChamadaDetail);
