import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './aluno.reducer';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IAlunoDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const AlunoDetail = (props: IAlunoDetailProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

  const { alunoEntity } = props;
  return (
    <Row>
      <Col md="8">
        <h2 data-cy="alunoDetailsHeading">
          <Translate contentKey="escolaOnlineApp.aluno.detail.title">Aluno</Translate>
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="id">
              <Translate contentKey="global.field.id">ID</Translate>
            </span>
          </dt>
          <dd>{alunoEntity.id}</dd>
          <dt>
            <span id="dataNascimento">
              <Translate contentKey="escolaOnlineApp.aluno.dataNascimento">Data Nascimento</Translate>
            </span>
          </dt>
          <dd>
            {alunoEntity.dataNascimento ? (
              <TextFormat value={alunoEntity.dataNascimento} type="date" format={APP_LOCAL_DATE_FORMAT} />
            ) : null}
          </dd>
          <dt>
            <span id="tipoSanguineo">
              <Translate contentKey="escolaOnlineApp.aluno.tipoSanguineo">Tipo Sanguineo</Translate>
            </span>
          </dt>
          <dd>{alunoEntity.tipoSanguineo}</dd>
          <dt>
            <span id="nomePai">
              <Translate contentKey="escolaOnlineApp.aluno.nomePai">Nome Pai</Translate>
            </span>
          </dt>
          <dd>{alunoEntity.nomePai}</dd>
          <dt>
            <span id="telefonePai">
              <Translate contentKey="escolaOnlineApp.aluno.telefonePai">Telefone Pai</Translate>
            </span>
          </dt>
          <dd>{alunoEntity.telefonePai}</dd>
          <dt>
            <span id="nomeMae">
              <Translate contentKey="escolaOnlineApp.aluno.nomeMae">Nome Mae</Translate>
            </span>
          </dt>
          <dd>{alunoEntity.nomeMae}</dd>
          <dt>
            <span id="telefoneMae">
              <Translate contentKey="escolaOnlineApp.aluno.telefoneMae">Telefone Mae</Translate>
            </span>
          </dt>
          <dd>{alunoEntity.telefoneMae}</dd>
          <dt>
            <span id="nomeResponsavel">
              <Translate contentKey="escolaOnlineApp.aluno.nomeResponsavel">Nome Responsavel</Translate>
            </span>
          </dt>
          <dd>{alunoEntity.nomeResponsavel}</dd>
          <dt>
            <span id="cpfResponsavel">
              <Translate contentKey="escolaOnlineApp.aluno.cpfResponsavel">Cpf Responsavel</Translate>
            </span>
          </dt>
          <dd>{alunoEntity.cpfResponsavel}</dd>
          <dt>
            <span id="observacoes">
              <Translate contentKey="escolaOnlineApp.aluno.observacoes">Observacoes</Translate>
            </span>
          </dt>
          <dd>{alunoEntity.observacoes}</dd>
          <dt>
            <Translate contentKey="escolaOnlineApp.aluno.pessoaAluno">Pessoa Aluno</Translate>
          </dt>
          <dd>{alunoEntity.pessoaAluno ? alunoEntity.pessoaAluno.id : ''}</dd>
          <dt>
            <Translate contentKey="escolaOnlineApp.aluno.escolaAluno">Escola Aluno</Translate>
          </dt>
          <dd>{alunoEntity.escolaAluno ? alunoEntity.escolaAluno.id : ''}</dd>
        </dl>
        <Button tag={Link} to="/aluno" replace color="info" data-cy="entityDetailsBackButton">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/aluno/${alunoEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

const mapStateToProps = ({ aluno }: IRootState) => ({
  alunoEntity: aluno.entity,
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(AlunoDetail);
