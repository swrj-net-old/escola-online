import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './professor.reducer';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IProfessorDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const ProfessorDetail = (props: IProfessorDetailProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

  const { professorEntity } = props;
  return (
    <Row>
      <Col md="8">
        <h2 data-cy="professorDetailsHeading">
          <Translate contentKey="escolaOnlineApp.professor.detail.title">Professor</Translate>
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="id">
              <Translate contentKey="global.field.id">ID</Translate>
            </span>
          </dt>
          <dd>{professorEntity.id}</dd>
          <dt>
            <span id="anoLetivo">
              <Translate contentKey="escolaOnlineApp.professor.anoLetivo">Ano Letivo</Translate>
            </span>
          </dt>
          <dd>{professorEntity.anoLetivo}</dd>
          <dt>
            <span id="dataInicio">
              <Translate contentKey="escolaOnlineApp.professor.dataInicio">Data Inicio</Translate>
            </span>
          </dt>
          <dd>
            {professorEntity.dataInicio ? (
              <TextFormat value={professorEntity.dataInicio} type="date" format={APP_LOCAL_DATE_FORMAT} />
            ) : null}
          </dd>
          <dt>
            <span id="dataFim">
              <Translate contentKey="escolaOnlineApp.professor.dataFim">Data Fim</Translate>
            </span>
          </dt>
          <dd>
            {professorEntity.dataFim ? <TextFormat value={professorEntity.dataFim} type="date" format={APP_LOCAL_DATE_FORMAT} /> : null}
          </dd>
          <dt>
            <Translate contentKey="escolaOnlineApp.professor.pessoaProfessor">Pessoa Professor</Translate>
          </dt>
          <dd>{professorEntity.pessoaProfessor ? professorEntity.pessoaProfessor.id : ''}</dd>
          <dt>
            <Translate contentKey="escolaOnlineApp.professor.unidadeProfessor">Unidade Professor</Translate>
          </dt>
          <dd>{professorEntity.unidadeProfessor ? professorEntity.unidadeProfessor.id : ''}</dd>
        </dl>
        <Button tag={Link} to="/professor" replace color="info" data-cy="entityDetailsBackButton">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/professor/${professorEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

const mapStateToProps = ({ professor }: IRootState) => ({
  professorEntity: professor.entity,
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(ProfessorDetail);
