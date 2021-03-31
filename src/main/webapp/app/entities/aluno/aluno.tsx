import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
import { Translate, TextFormat, getSortState, IPaginationBaseState, JhiPagination, JhiItemCount } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntities } from './aluno.reducer';
import { IAluno } from 'app/shared/model/aluno.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { ITEMS_PER_PAGE } from 'app/shared/util/pagination.constants';
import { overridePaginationStateWithQueryParams } from 'app/shared/util/entity-utils';

export interface IAlunoProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export const Aluno = (props: IAlunoProps) => {
  const [paginationState, setPaginationState] = useState(
    overridePaginationStateWithQueryParams(getSortState(props.location, ITEMS_PER_PAGE, 'id'), props.location.search)
  );

  const getAllEntities = () => {
    props.getEntities(paginationState.activePage - 1, paginationState.itemsPerPage, `${paginationState.sort},${paginationState.order}`);
  };

  const sortEntities = () => {
    getAllEntities();
    const endURL = `?page=${paginationState.activePage}&sort=${paginationState.sort},${paginationState.order}`;
    if (props.location.search !== endURL) {
      props.history.push(`${props.location.pathname}${endURL}`);
    }
  };

  useEffect(() => {
    sortEntities();
  }, [paginationState.activePage, paginationState.order, paginationState.sort]);

  useEffect(() => {
    const params = new URLSearchParams(props.location.search);
    const page = params.get('page');
    const sort = params.get('sort');
    if (page && sort) {
      const sortSplit = sort.split(',');
      setPaginationState({
        ...paginationState,
        activePage: +page,
        sort: sortSplit[0],
        order: sortSplit[1],
      });
    }
  }, [props.location.search]);

  const sort = p => () => {
    setPaginationState({
      ...paginationState,
      order: paginationState.order === 'asc' ? 'desc' : 'asc',
      sort: p,
    });
  };

  const handlePagination = currentPage =>
    setPaginationState({
      ...paginationState,
      activePage: currentPage,
    });

  const handleSyncList = () => {
    sortEntities();
  };

  const { alunoList, match, loading, totalItems } = props;
  return (
    <div>
      <h2 id="aluno-heading" data-cy="AlunoHeading">
        <Translate contentKey="escolaOnlineApp.aluno.home.title">Alunos</Translate>
        <div className="d-flex justify-content-end">
          <Button className="mr-2" color="info" onClick={handleSyncList} disabled={loading}>
            <FontAwesomeIcon icon="sync" spin={loading} />{' '}
            <Translate contentKey="escolaOnlineApp.aluno.home.refreshListLabel">Refresh List</Translate>
          </Button>
          <Link to={`${match.url}/new`} className="btn btn-primary jh-create-entity" id="jh-create-entity" data-cy="entityCreateButton">
            <FontAwesomeIcon icon="plus" />
            &nbsp;
            <Translate contentKey="escolaOnlineApp.aluno.home.createLabel">Create new Aluno</Translate>
          </Link>
        </div>
      </h2>
      <div className="table-responsive">
        {alunoList && alunoList.length > 0 ? (
          <Table responsive>
            <thead>
              <tr>
                <th className="hand" onClick={sort('id')}>
                  <Translate contentKey="escolaOnlineApp.aluno.id">ID</Translate> <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('dataNascimento')}>
                  <Translate contentKey="escolaOnlineApp.aluno.dataNascimento">Data Nascimento</Translate> <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('tipoSanguineo')}>
                  <Translate contentKey="escolaOnlineApp.aluno.tipoSanguineo">Tipo Sanguineo</Translate> <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('nomePai')}>
                  <Translate contentKey="escolaOnlineApp.aluno.nomePai">Nome Pai</Translate> <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('telefonePai')}>
                  <Translate contentKey="escolaOnlineApp.aluno.telefonePai">Telefone Pai</Translate> <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('nomeMae')}>
                  <Translate contentKey="escolaOnlineApp.aluno.nomeMae">Nome Mae</Translate> <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('telefoneMae')}>
                  <Translate contentKey="escolaOnlineApp.aluno.telefoneMae">Telefone Mae</Translate> <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('nomeResponsavel')}>
                  <Translate contentKey="escolaOnlineApp.aluno.nomeResponsavel">Nome Responsavel</Translate> <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('cpfResponsavel')}>
                  <Translate contentKey="escolaOnlineApp.aluno.cpfResponsavel">Cpf Responsavel</Translate> <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('observacoes')}>
                  <Translate contentKey="escolaOnlineApp.aluno.observacoes">Observacoes</Translate> <FontAwesomeIcon icon="sort" />
                </th>
                <th>
                  <Translate contentKey="escolaOnlineApp.aluno.pessoaAluno">Pessoa Aluno</Translate> <FontAwesomeIcon icon="sort" />
                </th>
                <th>
                  <Translate contentKey="escolaOnlineApp.aluno.escolaAluno">Escola Aluno</Translate> <FontAwesomeIcon icon="sort" />
                </th>
                <th />
              </tr>
            </thead>
            <tbody>
              {alunoList.map((aluno, i) => (
                <tr key={`entity-${i}`} data-cy="entityTable">
                  <td>
                    <Button tag={Link} to={`${match.url}/${aluno.id}`} color="link" size="sm">
                      {aluno.id}
                    </Button>
                  </td>
                  <td>{aluno.id}</td>
                  <td>
                    {aluno.dataNascimento ? <TextFormat type="date" value={aluno.dataNascimento} format={APP_LOCAL_DATE_FORMAT} /> : null}
                  </td>
                  <td>
                    <Translate contentKey={`escolaOnlineApp.TipoSanguineo.${aluno.tipoSanguineo}`} />
                  </td>
                  <td>{aluno.nomePai}</td>
                  <td>{aluno.telefonePai}</td>
                  <td>{aluno.nomeMae}</td>
                  <td>{aluno.telefoneMae}</td>
                  <td>{aluno.nomeResponsavel}</td>
                  <td>{aluno.cpfResponsavel}</td>
                  <td>{aluno.observacoes}</td>
                  <td>{aluno.pessoaAluno ? <Link to={`pessoa/${aluno.pessoaAluno.id}`}>{aluno.pessoaAluno.id}</Link> : ''}</td>
                  <td>{aluno.escolaAluno ? <Link to={`escola/${aluno.escolaAluno.id}`}>{aluno.escolaAluno.id}</Link> : ''}</td>
                  <td className="text-right">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`${match.url}/${aluno.id}`} color="info" size="sm" data-cy="entityDetailsButton">
                        <FontAwesomeIcon icon="eye" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.view">View</Translate>
                        </span>
                      </Button>
                      <Button
                        tag={Link}
                        to={`${match.url}/${aluno.id}/edit?page=${paginationState.activePage}&sort=${paginationState.sort},${paginationState.order}`}
                        color="primary"
                        size="sm"
                        data-cy="entityEditButton"
                      >
                        <FontAwesomeIcon icon="pencil-alt" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.edit">Edit</Translate>
                        </span>
                      </Button>
                      <Button
                        tag={Link}
                        to={`${match.url}/${aluno.id}/delete?page=${paginationState.activePage}&sort=${paginationState.sort},${paginationState.order}`}
                        color="danger"
                        size="sm"
                        data-cy="entityDeleteButton"
                      >
                        <FontAwesomeIcon icon="trash" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.delete">Delete</Translate>
                        </span>
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        ) : (
          !loading && (
            <div className="alert alert-warning">
              <Translate contentKey="escolaOnlineApp.aluno.home.notFound">No Alunos found</Translate>
            </div>
          )
        )}
      </div>
      {props.totalItems ? (
        <div className={alunoList && alunoList.length > 0 ? '' : 'd-none'}>
          <Row className="justify-content-center">
            <JhiItemCount page={paginationState.activePage} total={totalItems} itemsPerPage={paginationState.itemsPerPage} i18nEnabled />
          </Row>
          <Row className="justify-content-center">
            <JhiPagination
              activePage={paginationState.activePage}
              onSelect={handlePagination}
              maxButtons={5}
              itemsPerPage={paginationState.itemsPerPage}
              totalItems={props.totalItems}
            />
          </Row>
        </div>
      ) : (
        ''
      )}
    </div>
  );
};

const mapStateToProps = ({ aluno }: IRootState) => ({
  alunoList: aluno.entities,
  loading: aluno.loading,
  totalItems: aluno.totalItems,
});

const mapDispatchToProps = {
  getEntities,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(Aluno);
