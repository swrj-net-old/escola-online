import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
import { Translate, getSortState, IPaginationBaseState, JhiPagination, JhiItemCount } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntities } from './escola.reducer';
import { IEscola } from 'app/shared/model/escola.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { ITEMS_PER_PAGE } from 'app/shared/util/pagination.constants';
import { overridePaginationStateWithQueryParams } from 'app/shared/util/entity-utils';

export interface IEscolaProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export const Escola = (props: IEscolaProps) => {
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

  const { escolaList, match, loading, totalItems } = props;
  return (
    <div>
      <h2 id="escola-heading" data-cy="EscolaHeading">
        <Translate contentKey="escolaOnlineApp.escola.home.title">Escolas</Translate>
        <div className="d-flex justify-content-end">
          <Button className="mr-2" color="info" onClick={handleSyncList} disabled={loading}>
            <FontAwesomeIcon icon="sync" spin={loading} />{' '}
            <Translate contentKey="escolaOnlineApp.escola.home.refreshListLabel">Refresh List</Translate>
          </Button>
          <Link to={`${match.url}/new`} className="btn btn-primary jh-create-entity" id="jh-create-entity" data-cy="entityCreateButton">
            <FontAwesomeIcon icon="plus" />
            &nbsp;
            <Translate contentKey="escolaOnlineApp.escola.home.createLabel">Create new Escola</Translate>
          </Link>
        </div>
      </h2>
      <div className="table-responsive">
        {escolaList && escolaList.length > 0 ? (
          <Table responsive>
            <thead>
              <tr>
                <th className="hand" onClick={sort('id')}>
                  <Translate contentKey="escolaOnlineApp.escola.id">ID</Translate> <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('nome')}>
                  <Translate contentKey="escolaOnlineApp.escola.nome">Nome</Translate> <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('razaoSocial')}>
                  <Translate contentKey="escolaOnlineApp.escola.razaoSocial">Razao Social</Translate> <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('cnpjPrincipal')}>
                  <Translate contentKey="escolaOnlineApp.escola.cnpjPrincipal">Cnpj Principal</Translate> <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('url')}>
                  <Translate contentKey="escolaOnlineApp.escola.url">Url</Translate> <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('prefixo')}>
                  <Translate contentKey="escolaOnlineApp.escola.prefixo">Prefixo</Translate> <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('responsavelNome')}>
                  <Translate contentKey="escolaOnlineApp.escola.responsavelNome">Responsavel Nome</Translate>{' '}
                  <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('responsavelCpf')}>
                  <Translate contentKey="escolaOnlineApp.escola.responsavelCpf">Responsavel Cpf</Translate> <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('responsavelEmail')}>
                  <Translate contentKey="escolaOnlineApp.escola.responsavelEmail">Responsavel Email</Translate>{' '}
                  <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('responsavelCelular')}>
                  <Translate contentKey="escolaOnlineApp.escola.responsavelCelular">Responsavel Celular</Translate>{' '}
                  <FontAwesomeIcon icon="sort" />
                </th>
                <th />
              </tr>
            </thead>
            <tbody>
              {escolaList.map((escola, i) => (
                <tr key={`entity-${i}`} data-cy="entityTable">
                  <td>
                    <Button tag={Link} to={`${match.url}/${escola.id}`} color="link" size="sm">
                      {escola.id}
                    </Button>
                  </td>
                  <td>{escola.id}</td>
                  <td>{escola.nome}</td>
                  <td>{escola.razaoSocial}</td>
                  <td>{escola.cnpjPrincipal}</td>
                  <td>{escola.url}</td>
                  <td>{escola.prefixo}</td>
                  <td>{escola.responsavelNome}</td>
                  <td>{escola.responsavelCpf}</td>
                  <td>{escola.responsavelEmail}</td>
                  <td>{escola.responsavelCelular}</td>
                  <td className="text-right">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`${match.url}/${escola.id}`} color="info" size="sm" data-cy="entityDetailsButton">
                        <FontAwesomeIcon icon="eye" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.view">View</Translate>
                        </span>
                      </Button>
                      <Button
                        tag={Link}
                        to={`${match.url}/${escola.id}/edit?page=${paginationState.activePage}&sort=${paginationState.sort},${paginationState.order}`}
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
                        to={`${match.url}/${escola.id}/delete?page=${paginationState.activePage}&sort=${paginationState.sort},${paginationState.order}`}
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
              <Translate contentKey="escolaOnlineApp.escola.home.notFound">No Escolas found</Translate>
            </div>
          )
        )}
      </div>
      {props.totalItems ? (
        <div className={escolaList && escolaList.length > 0 ? '' : 'd-none'}>
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

const mapStateToProps = ({ escola }: IRootState) => ({
  escolaList: escola.entities,
  loading: escola.loading,
  totalItems: escola.totalItems,
});

const mapDispatchToProps = {
  getEntities,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(Escola);
