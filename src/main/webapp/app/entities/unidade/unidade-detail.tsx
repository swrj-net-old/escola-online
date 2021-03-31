import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './unidade.reducer';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IUnidadeDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const UnidadeDetail = (props: IUnidadeDetailProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

  const { unidadeEntity } = props;
  return (
    <Row>
      <Col md="8">
        <h2 data-cy="unidadeDetailsHeading">
          <Translate contentKey="escolaOnlineApp.unidade.detail.title">Unidade</Translate>
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="id">
              <Translate contentKey="global.field.id">ID</Translate>
            </span>
          </dt>
          <dd>{unidadeEntity.id}</dd>
          <dt>
            <span id="nome">
              <Translate contentKey="escolaOnlineApp.unidade.nome">Nome</Translate>
            </span>
          </dt>
          <dd>{unidadeEntity.nome}</dd>
          <dt>
            <span id="cnpj">
              <Translate contentKey="escolaOnlineApp.unidade.cnpj">Cnpj</Translate>
            </span>
          </dt>
          <dd>{unidadeEntity.cnpj}</dd>
          <dt>
            <span id="endereco">
              <Translate contentKey="escolaOnlineApp.unidade.endereco">Endereco</Translate>
            </span>
          </dt>
          <dd>{unidadeEntity.endereco}</dd>
          <dt>
            <span id="complemento">
              <Translate contentKey="escolaOnlineApp.unidade.complemento">Complemento</Translate>
            </span>
          </dt>
          <dd>{unidadeEntity.complemento}</dd>
          <dt>
            <span id="bairro">
              <Translate contentKey="escolaOnlineApp.unidade.bairro">Bairro</Translate>
            </span>
          </dt>
          <dd>{unidadeEntity.bairro}</dd>
          <dt>
            <span id="cidade">
              <Translate contentKey="escolaOnlineApp.unidade.cidade">Cidade</Translate>
            </span>
          </dt>
          <dd>{unidadeEntity.cidade}</dd>
          <dt>
            <span id="cep">
              <Translate contentKey="escolaOnlineApp.unidade.cep">Cep</Translate>
            </span>
          </dt>
          <dd>{unidadeEntity.cep}</dd>
          <dt>
            <span id="telefoneComercial">
              <Translate contentKey="escolaOnlineApp.unidade.telefoneComercial">Telefone Comercial</Translate>
            </span>
          </dt>
          <dd>{unidadeEntity.telefoneComercial}</dd>
          <dt>
            <span id="telefoneWhatsapp">
              <Translate contentKey="escolaOnlineApp.unidade.telefoneWhatsapp">Telefone Whatsapp</Translate>
            </span>
          </dt>
          <dd>{unidadeEntity.telefoneWhatsapp}</dd>
          <dt>
            <span id="email">
              <Translate contentKey="escolaOnlineApp.unidade.email">Email</Translate>
            </span>
          </dt>
          <dd>{unidadeEntity.email}</dd>
          <dt>
            <span id="facebook">
              <Translate contentKey="escolaOnlineApp.unidade.facebook">Facebook</Translate>
            </span>
          </dt>
          <dd>{unidadeEntity.facebook}</dd>
          <dt>
            <span id="observacoes">
              <Translate contentKey="escolaOnlineApp.unidade.observacoes">Observacoes</Translate>
            </span>
          </dt>
          <dd>{unidadeEntity.observacoes}</dd>
          <dt>
            <Translate contentKey="escolaOnlineApp.unidade.escolaUnidade">Escola Unidade</Translate>
          </dt>
          <dd>{unidadeEntity.escolaUnidade ? unidadeEntity.escolaUnidade.id : ''}</dd>
        </dl>
        <Button tag={Link} to="/unidade" replace color="info" data-cy="entityDetailsBackButton">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/unidade/${unidadeEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

const mapStateToProps = ({ unidade }: IRootState) => ({
  unidadeEntity: unidade.entity,
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(UnidadeDetail);
