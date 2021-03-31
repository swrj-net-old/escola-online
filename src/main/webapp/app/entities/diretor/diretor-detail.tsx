import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './diretor.reducer';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IDiretorDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const DiretorDetail = (props: IDiretorDetailProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

  const { diretorEntity } = props;
  return (
    <Row>
      <Col md="8">
        <h2 data-cy="diretorDetailsHeading">
          <Translate contentKey="escolaOnlineApp.diretor.detail.title">Diretor</Translate>
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="id">
              <Translate contentKey="global.field.id">ID</Translate>
            </span>
          </dt>
          <dd>{diretorEntity.id}</dd>
          <dt>
            <span id="anoLetivo">
              <Translate contentKey="escolaOnlineApp.diretor.anoLetivo">Ano Letivo</Translate>
            </span>
          </dt>
          <dd>{diretorEntity.anoLetivo}</dd>
          <dt>
            <span id="dataInicio">
              <Translate contentKey="escolaOnlineApp.diretor.dataInicio">Data Inicio</Translate>
            </span>
          </dt>
          <dd>
            {diretorEntity.dataInicio ? <TextFormat value={diretorEntity.dataInicio} type="date" format={APP_LOCAL_DATE_FORMAT} /> : null}
          </dd>
          <dt>
            <span id="dataFim">
              <Translate contentKey="escolaOnlineApp.diretor.dataFim">Data Fim</Translate>
            </span>
          </dt>
          <dd>{diretorEntity.dataFim ? <TextFormat value={diretorEntity.dataFim} type="date" format={APP_LOCAL_DATE_FORMAT} /> : null}</dd>
          <dt>
            <Translate contentKey="escolaOnlineApp.diretor.pessoaDiretor">Pessoa Diretor</Translate>
          </dt>
          <dd>{diretorEntity.pessoaDiretor ? diretorEntity.pessoaDiretor.id : ''}</dd>
          <dt>
            <Translate contentKey="escolaOnlineApp.diretor.unidadeDiretor">Unidade Diretor</Translate>
          </dt>
          <dd>{diretorEntity.unidadeDiretor ? diretorEntity.unidadeDiretor.id : ''}</dd>
        </dl>
        <Button tag={Link} to="/diretor" replace color="info" data-cy="entityDetailsBackButton">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/diretor/${diretorEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

const mapStateToProps = ({ diretor }: IRootState) => ({
  diretorEntity: diretor.entity,
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(DiretorDetail);
