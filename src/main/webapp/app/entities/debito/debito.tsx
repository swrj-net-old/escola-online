import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
import { Translate, TextFormat, getSortState, IPaginationBaseState, JhiPagination, JhiItemCount } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntities } from './debito.reducer';
import { IDebito } from 'app/shared/model/debito.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { ITEMS_PER_PAGE } from 'app/shared/util/pagination.constants';
import { overridePaginationStateWithQueryParams } from 'app/shared/util/entity-utils';

export interface IDebitoProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export const Debito = (props: IDebitoProps) => {
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

  const { debitoList, match, loading, totalItems } = props;
  return (
    <div>
      <h2 id="debito-heading" data-cy="DebitoHeading">
        <Translate contentKey="escolaOnlineApp.debito.home.title">Debitos</Translate>
        <div className="d-flex justify-content-end">
          <Button className="mr-2" color="info" onClick={handleSyncList} disabled={loading}>
            <FontAwesomeIcon icon="sync" spin={loading} />{' '}
            <Translate contentKey="escolaOnlineApp.debito.home.refreshListLabel">Refresh List</Translate>
          </Button>
          <Link to={`${match.url}/new`} className="btn btn-primary jh-create-entity" id="jh-create-entity" data-cy="entityCreateButton">
            <FontAwesomeIcon icon="plus" />
            &nbsp;
            <Translate contentKey="escolaOnlineApp.debito.home.createLabel">Create new Debito</Translate>
          </Link>
        </div>
      </h2>
      <div className="table-responsive">
        {debitoList && debitoList.length > 0 ? (
          <Table responsive>
            <thead>
              <tr>
                <th className="hand" onClick={sort('id')}>
                  <Translate contentKey="escolaOnlineApp.debito.id">ID</Translate> <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('tipoDebito')}>
                  <Translate contentKey="escolaOnlineApp.debito.tipoDebito">Tipo Debito</Translate> <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('situacaoDebito')}>
                  <Translate contentKey="escolaOnlineApp.debito.situacaoDebito">Situacao Debito</Translate> <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('dataVencimento')}>
                  <Translate contentKey="escolaOnlineApp.debito.dataVencimento">Data Vencimento</Translate> <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('dataPagamento')}>
                  <Translate contentKey="escolaOnlineApp.debito.dataPagamento">Data Pagamento</Translate> <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('valorOriginal')}>
                  <Translate contentKey="escolaOnlineApp.debito.valorOriginal">Valor Original</Translate> <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('totalPago')}>
                  <Translate contentKey="escolaOnlineApp.debito.totalPago">Total Pago</Translate> <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('totalDesconto')}>
                  <Translate contentKey="escolaOnlineApp.debito.totalDesconto">Total Desconto</Translate> <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('totalDevido')}>
                  <Translate contentKey="escolaOnlineApp.debito.totalDevido">Total Devido</Translate> <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('observacoes')}>
                  <Translate contentKey="escolaOnlineApp.debito.observacoes">Observacoes</Translate> <FontAwesomeIcon icon="sort" />
                </th>
                <th>
                  <Translate contentKey="escolaOnlineApp.debito.alunoDebito">Aluno Debito</Translate> <FontAwesomeIcon icon="sort" />
                </th>
                <th />
              </tr>
            </thead>
            <tbody>
              {debitoList.map((debito, i) => (
                <tr key={`entity-${i}`} data-cy="entityTable">
                  <td>
                    <Button tag={Link} to={`${match.url}/${debito.id}`} color="link" size="sm">
                      {debito.id}
                    </Button>
                  </td>
                  <td>{debito.id}</td>
                  <td>
                    <Translate contentKey={`escolaOnlineApp.TipoDebito.${debito.tipoDebito}`} />
                  </td>
                  <td>
                    <Translate contentKey={`escolaOnlineApp.SituacaoDebito.${debito.situacaoDebito}`} />
                  </td>
                  <td>
                    {debito.dataVencimento ? <TextFormat type="date" value={debito.dataVencimento} format={APP_LOCAL_DATE_FORMAT} /> : null}
                  </td>
                  <td>
                    {debito.dataPagamento ? <TextFormat type="date" value={debito.dataPagamento} format={APP_LOCAL_DATE_FORMAT} /> : null}
                  </td>
                  <td>{debito.valorOriginal}</td>
                  <td>{debito.totalPago}</td>
                  <td>{debito.totalDesconto}</td>
                  <td>{debito.totalDevido}</td>
                  <td>{debito.observacoes}</td>
                  <td>{debito.alunoDebito ? <Link to={`aluno/${debito.alunoDebito.id}`}>{debito.alunoDebito.id}</Link> : ''}</td>
                  <td className="text-right">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`${match.url}/${debito.id}`} color="info" size="sm" data-cy="entityDetailsButton">
                        <FontAwesomeIcon icon="eye" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.view">View</Translate>
                        </span>
                      </Button>
                      <Button
                        tag={Link}
                        to={`${match.url}/${debito.id}/edit?page=${paginationState.activePage}&sort=${paginationState.sort},${paginationState.order}`}
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
                        to={`${match.url}/${debito.id}/delete?page=${paginationState.activePage}&sort=${paginationState.sort},${paginationState.order}`}
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
              <Translate contentKey="escolaOnlineApp.debito.home.notFound">No Debitos found</Translate>
            </div>
          )
        )}
      </div>
      {props.totalItems ? (
        <div className={debitoList && debitoList.length > 0 ? '' : 'd-none'}>
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

const mapStateToProps = ({ debito }: IRootState) => ({
  debitoList: debito.entities,
  loading: debito.loading,
  totalItems: debito.totalItems,
});

const mapDispatchToProps = {
  getEntities,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(Debito);
