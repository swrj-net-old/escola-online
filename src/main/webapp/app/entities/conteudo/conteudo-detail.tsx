import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './conteudo.reducer';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IConteudoDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const ConteudoDetail = (props: IConteudoDetailProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

  const { conteudoEntity } = props;
  return (
    <Row>
      <Col md="8">
        <h2 data-cy="conteudoDetailsHeading">
          <Translate contentKey="escolaOnlineApp.conteudo.detail.title">Conteudo</Translate>
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="id">
              <Translate contentKey="global.field.id">ID</Translate>
            </span>
          </dt>
          <dd>{conteudoEntity.id}</dd>
          <dt>
            <span id="dataAula">
              <Translate contentKey="escolaOnlineApp.conteudo.dataAula">Data Aula</Translate>
            </span>
          </dt>
          <dd>
            {conteudoEntity.dataAula ? <TextFormat value={conteudoEntity.dataAula} type="date" format={APP_LOCAL_DATE_FORMAT} /> : null}
          </dd>
          <dt>
            <span id="habilidadesCompetencias">
              <Translate contentKey="escolaOnlineApp.conteudo.habilidadesCompetencias">Habilidades Competencias</Translate>
            </span>
          </dt>
          <dd>{conteudoEntity.habilidadesCompetencias}</dd>
          <dt>
            <span id="observacoes">
              <Translate contentKey="escolaOnlineApp.conteudo.observacoes">Observacoes</Translate>
            </span>
          </dt>
          <dd>{conteudoEntity.observacoes}</dd>
          <dt>
            <Translate contentKey="escolaOnlineApp.conteudo.turmaConteudo">Turma Conteudo</Translate>
          </dt>
          <dd>{conteudoEntity.turmaConteudo ? conteudoEntity.turmaConteudo.id : ''}</dd>
          <dt>
            <Translate contentKey="escolaOnlineApp.conteudo.professorConteudo">Professor Conteudo</Translate>
          </dt>
          <dd>{conteudoEntity.professorConteudo ? conteudoEntity.professorConteudo.id : ''}</dd>
          <dt>
            <Translate contentKey="escolaOnlineApp.conteudo.materiaConteudo">Materia Conteudo</Translate>
          </dt>
          <dd>{conteudoEntity.materiaConteudo ? conteudoEntity.materiaConteudo.id : ''}</dd>
        </dl>
        <Button tag={Link} to="/conteudo" replace color="info" data-cy="entityDetailsBackButton">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/conteudo/${conteudoEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

const mapStateToProps = ({ conteudo }: IRootState) => ({
  conteudoEntity: conteudo.entity,
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(ConteudoDetail);
