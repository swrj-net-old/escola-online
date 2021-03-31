import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './grade.reducer';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IGradeDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const GradeDetail = (props: IGradeDetailProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

  const { gradeEntity } = props;
  return (
    <Row>
      <Col md="8">
        <h2 data-cy="gradeDetailsHeading">
          <Translate contentKey="escolaOnlineApp.grade.detail.title">Grade</Translate>
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="id">
              <Translate contentKey="global.field.id">ID</Translate>
            </span>
          </dt>
          <dd>{gradeEntity.id}</dd>
          <dt>
            <span id="anoLetivo">
              <Translate contentKey="escolaOnlineApp.grade.anoLetivo">Ano Letivo</Translate>
            </span>
          </dt>
          <dd>{gradeEntity.anoLetivo}</dd>
          <dt>
            <Translate contentKey="escolaOnlineApp.grade.serieGrade">Serie Grade</Translate>
          </dt>
          <dd>{gradeEntity.serieGrade ? gradeEntity.serieGrade.id : ''}</dd>
          <dt>
            <Translate contentKey="escolaOnlineApp.grade.materiaGrade">Materia Grade</Translate>
          </dt>
          <dd>{gradeEntity.materiaGrade ? gradeEntity.materiaGrade.id : ''}</dd>
          <dt>
            <Translate contentKey="escolaOnlineApp.grade.escolaGrade">Escola Grade</Translate>
          </dt>
          <dd>{gradeEntity.escolaGrade ? gradeEntity.escolaGrade.id : ''}</dd>
        </dl>
        <Button tag={Link} to="/grade" replace color="info" data-cy="entityDetailsBackButton">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/grade/${gradeEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

const mapStateToProps = ({ grade }: IRootState) => ({
  gradeEntity: grade.entity,
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(GradeDetail);
