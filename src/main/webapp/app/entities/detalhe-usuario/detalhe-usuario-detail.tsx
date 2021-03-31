import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './detalhe-usuario.reducer';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IDetalheUsuarioDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const DetalheUsuarioDetail = (props: IDetalheUsuarioDetailProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

  const { detalheUsuarioEntity } = props;
  return (
    <Row>
      <Col md="8">
        <h2 data-cy="detalheUsuarioDetailsHeading">
          <Translate contentKey="escolaOnlineApp.detalheUsuario.detail.title">DetalheUsuario</Translate>
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="id">
              <Translate contentKey="global.field.id">ID</Translate>
            </span>
          </dt>
          <dd>{detalheUsuarioEntity.id}</dd>
          <dt>
            <span id="cpf">
              <Translate contentKey="escolaOnlineApp.detalheUsuario.cpf">Cpf</Translate>
            </span>
          </dt>
          <dd>{detalheUsuarioEntity.cpf}</dd>
          <dt>
            <span id="celular">
              <Translate contentKey="escolaOnlineApp.detalheUsuario.celular">Celular</Translate>
            </span>
          </dt>
          <dd>{detalheUsuarioEntity.celular}</dd>
          <dt>
            <Translate contentKey="escolaOnlineApp.detalheUsuario.usuario">Usuario</Translate>
          </dt>
          <dd>{detalheUsuarioEntity.usuario ? detalheUsuarioEntity.usuario.id : ''}</dd>
        </dl>
        <Button tag={Link} to="/detalhe-usuario" replace color="info" data-cy="entityDetailsBackButton">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/detalhe-usuario/${detalheUsuarioEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

const mapStateToProps = ({ detalheUsuario }: IRootState) => ({
  detalheUsuarioEntity: detalheUsuario.entity,
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(DetalheUsuarioDetail);
