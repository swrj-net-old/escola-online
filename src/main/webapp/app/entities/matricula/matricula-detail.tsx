import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './matricula.reducer';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IMatriculaDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const MatriculaDetail = (props: IMatriculaDetailProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

  const { matriculaEntity } = props;
  return (
    <Row>
      <Col md="8">
        <h2 data-cy="matriculaDetailsHeading">
          <Translate contentKey="escolaOnlineApp.matricula.detail.title">Matricula</Translate>
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="id">
              <Translate contentKey="global.field.id">ID</Translate>
            </span>
          </dt>
          <dd>{matriculaEntity.id}</dd>
          <dt>
            <span id="anoLetivo">
              <Translate contentKey="escolaOnlineApp.matricula.anoLetivo">Ano Letivo</Translate>
            </span>
          </dt>
          <dd>{matriculaEntity.anoLetivo}</dd>
          <dt>
            <span id="dataInicio">
              <Translate contentKey="escolaOnlineApp.matricula.dataInicio">Data Inicio</Translate>
            </span>
          </dt>
          <dd>
            {matriculaEntity.dataInicio ? (
              <TextFormat value={matriculaEntity.dataInicio} type="date" format={APP_LOCAL_DATE_FORMAT} />
            ) : null}
          </dd>
          <dt>
            <span id="dataFim">
              <Translate contentKey="escolaOnlineApp.matricula.dataFim">Data Fim</Translate>
            </span>
          </dt>
          <dd>
            {matriculaEntity.dataFim ? <TextFormat value={matriculaEntity.dataFim} type="date" format={APP_LOCAL_DATE_FORMAT} /> : null}
          </dd>
          <dt>
            <Translate contentKey="escolaOnlineApp.matricula.turmaMatricula">Turma Matricula</Translate>
          </dt>
          <dd>{matriculaEntity.turmaMatricula ? matriculaEntity.turmaMatricula.id : ''}</dd>
          <dt>
            <Translate contentKey="escolaOnlineApp.matricula.alunoMatricula">Aluno Matricula</Translate>
          </dt>
          <dd>{matriculaEntity.alunoMatricula ? matriculaEntity.alunoMatricula.id : ''}</dd>
        </dl>
        <Button tag={Link} to="/matricula" replace color="info" data-cy="entityDetailsBackButton">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/matricula/${matriculaEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

const mapStateToProps = ({ matricula }: IRootState) => ({
  matriculaEntity: matricula.entity,
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(MatriculaDetail);
