import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './pessoa.reducer';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IPessoaDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const PessoaDetail = (props: IPessoaDetailProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

  const { pessoaEntity } = props;
  return (
    <Row>
      <Col md="8">
        <h2 data-cy="pessoaDetailsHeading">
          <Translate contentKey="escolaOnlineApp.pessoa.detail.title">Pessoa</Translate>
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="id">
              <Translate contentKey="global.field.id">ID</Translate>
            </span>
          </dt>
          <dd>{pessoaEntity.id}</dd>
          <dt>
            <span id="nome">
              <Translate contentKey="escolaOnlineApp.pessoa.nome">Nome</Translate>
            </span>
          </dt>
          <dd>{pessoaEntity.nome}</dd>
          <dt>
            <span id="cpf">
              <Translate contentKey="escolaOnlineApp.pessoa.cpf">Cpf</Translate>
            </span>
          </dt>
          <dd>{pessoaEntity.cpf}</dd>
          <dt>
            <span id="rg">
              <Translate contentKey="escolaOnlineApp.pessoa.rg">Rg</Translate>
            </span>
          </dt>
          <dd>{pessoaEntity.rg}</dd>
          <dt>
            <span id="endereco">
              <Translate contentKey="escolaOnlineApp.pessoa.endereco">Endereco</Translate>
            </span>
          </dt>
          <dd>{pessoaEntity.endereco}</dd>
          <dt>
            <span id="complemento">
              <Translate contentKey="escolaOnlineApp.pessoa.complemento">Complemento</Translate>
            </span>
          </dt>
          <dd>{pessoaEntity.complemento}</dd>
          <dt>
            <span id="bairro">
              <Translate contentKey="escolaOnlineApp.pessoa.bairro">Bairro</Translate>
            </span>
          </dt>
          <dd>{pessoaEntity.bairro}</dd>
          <dt>
            <span id="cidade">
              <Translate contentKey="escolaOnlineApp.pessoa.cidade">Cidade</Translate>
            </span>
          </dt>
          <dd>{pessoaEntity.cidade}</dd>
          <dt>
            <span id="cep">
              <Translate contentKey="escolaOnlineApp.pessoa.cep">Cep</Translate>
            </span>
          </dt>
          <dd>{pessoaEntity.cep}</dd>
          <dt>
            <span id="telefoneCelular">
              <Translate contentKey="escolaOnlineApp.pessoa.telefoneCelular">Telefone Celular</Translate>
            </span>
          </dt>
          <dd>{pessoaEntity.telefoneCelular}</dd>
          <dt>
            <span id="telefoneResidencial">
              <Translate contentKey="escolaOnlineApp.pessoa.telefoneResidencial">Telefone Residencial</Translate>
            </span>
          </dt>
          <dd>{pessoaEntity.telefoneResidencial}</dd>
          <dt>
            <span id="telefoneComercial">
              <Translate contentKey="escolaOnlineApp.pessoa.telefoneComercial">Telefone Comercial</Translate>
            </span>
          </dt>
          <dd>{pessoaEntity.telefoneComercial}</dd>
          <dt>
            <span id="email">
              <Translate contentKey="escolaOnlineApp.pessoa.email">Email</Translate>
            </span>
          </dt>
          <dd>{pessoaEntity.email}</dd>
          <dt>
            <span id="observacoes">
              <Translate contentKey="escolaOnlineApp.pessoa.observacoes">Observacoes</Translate>
            </span>
          </dt>
          <dd>{pessoaEntity.observacoes}</dd>
          <dt>
            <Translate contentKey="escolaOnlineApp.pessoa.cidadePessoa">Cidade Pessoa</Translate>
          </dt>
          <dd>{pessoaEntity.cidadePessoa ? pessoaEntity.cidadePessoa.id : ''}</dd>
          <dt>
            <Translate contentKey="escolaOnlineApp.pessoa.escolaPessoa">Escola Pessoa</Translate>
          </dt>
          <dd>{pessoaEntity.escolaPessoa ? pessoaEntity.escolaPessoa.id : ''}</dd>
        </dl>
        <Button tag={Link} to="/pessoa" replace color="info" data-cy="entityDetailsBackButton">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/pessoa/${pessoaEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

const mapStateToProps = ({ pessoa }: IRootState) => ({
  pessoaEntity: pessoa.entity,
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(PessoaDetail);
