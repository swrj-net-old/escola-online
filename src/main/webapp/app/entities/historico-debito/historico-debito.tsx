import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
import { Translate, TextFormat, getSortState, IPaginationBaseState, JhiPagination, JhiItemCount } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntities } from './historico-debito.reducer';
import { IHistoricoDebito } from 'app/shared/model/historico-debito.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { ITEMS_PER_PAGE } from 'app/shared/util/pagination.constants';
import { overridePaginationStateWithQueryParams } from 'app/shared/util/entity-utils';

export interface IHistoricoDebitoProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export const HistoricoDebito = (props: IHistoricoDebitoProps) => {
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

  const { historicoDebitoList, match, loading, totalItems } = props;
  return (
    <div>
      <h2 id="historico-debito-heading" data-cy="HistoricoDebitoHeading">
        <Translate contentKey="escolaOnlineApp.historicoDebito.home.title">Historico Debitos</Translate>
        <div className="d-flex justify-content-end">
          <Button className="mr-2" color="info" onClick={handleSyncList} disabled={loading}>
            <FontAwesomeIcon icon="sync" spin={loading} />{' '}
            <Translate contentKey="escolaOnlineApp.historicoDebito.home.refreshListLabel">Refresh List</Translate>
          </Button>
          <Link to={`${match.url}/new`} className="btn btn-primary jh-create-entity" id="jh-create-entity" data-cy="entityCreateButton">
            <FontAwesomeIcon icon="plus" />
            &nbsp;
            <Translate contentKey="escolaOnlineApp.historicoDebito.home.createLabel">Create new Historico Debito</Translate>
          </Link>
        </div>
      </h2>
      <div className="table-responsive">
        {historicoDebitoList && historicoDebitoList.length > 0 ? (
          <Table responsive>
            <thead>
              <tr>
                <th className="hand" onClick={sort('id')}>
                  <Translate contentKey="escolaOnlineApp.historicoDebito.id">ID</Translate> <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('dataLancamento')}>
                  <Translate contentKey="escolaOnlineApp.historicoDebito.dataLancamento">Data Lancamento</Translate>{' '}
                  <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('situacaoDebito')}>
                  <Translate contentKey="escolaOnlineApp.historicoDebito.situacaoDebito">Situacao Debito</Translate>{' '}
                  <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('dataVencimento')}>
                  <Translate contentKey="escolaOnlineApp.historicoDebito.dataVencimento">Data Vencimento</Translate>{' '}
                  <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('dataPagamento')}>
                  <Translate contentKey="escolaOnlineApp.historicoDebito.dataPagamento">Data Pagamento</Translate>{' '}
                  <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('valorOriginal')}>
                  <Translate contentKey="escolaOnlineApp.historicoDebito.valorOriginal">Valor Original</Translate>{' '}
                  <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('totalPago')}>
                  <Translate contentKey="escolaOnlineApp.historicoDebito.totalPago">Total Pago</Translate> <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('totalDesconto')}>
                  <Translate contentKey="escolaOnlineApp.historicoDebito.totalDesconto">Total Desconto</Translate>{' '}
                  <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('totalDevido')}>
                  <Translate contentKey="escolaOnlineApp.historicoDebito.totalDevido">Total Devido</Translate>{' '}
                  <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('observacoes')}>
                  <Translate contentKey="escolaOnlineApp.historicoDebito.observacoes">Observacoes</Translate>{' '}
                  <FontAwesomeIcon icon="sort" />
                </th>
                <th>
                  <Translate contentKey="escolaOnlineApp.historicoDebito.debitoHistoricoDebito">Debito Historico Debito</Translate>{' '}
                  <FontAwesomeIcon icon="sort" />
                </th>
                <th>
                  <Translate contentKey="escolaOnlineApp.historicoDebito.detalheUsuarioLancamento">Detalhe Usuario Lancamento</Translate>{' '}
                  <FontAwesomeIcon icon="sort" />
                </th>
                <th />
              </tr>
            </thead>
            <tbody>
              {historicoDebitoList.map((historicoDebito, i) => (
                <tr key={`entity-${i}`} data-cy="entityTable">
                  <td>
                    <Button tag={Link} to={`${match.url}/${historicoDebito.id}`} color="link" size="sm">
                      {historicoDebito.id}
                    </Button>
                  </td>
                  <td>{historicoDebito.id}</td>
                  <td>
                    {historicoDebito.dataLancamento ? (
                      <TextFormat type="date" value={historicoDebito.dataLancamento} format={APP_LOCAL_DATE_FORMAT} />
                    ) : null}
                  </td>
                  <td>
                    <Translate contentKey={`escolaOnlineApp.SituacaoDebito.${historicoDebito.situacaoDebito}`} />
                  </td>
                  <td>
                    {historicoDebito.dataVencimento ? (
                      <TextFormat type="date" value={historicoDebito.dataVencimento} format={APP_LOCAL_DATE_FORMAT} />
                    ) : null}
                  </td>
                  <td>
                    {historicoDebito.dataPagamento ? (
                      <TextFormat type="date" value={historicoDebito.dataPagamento} format={APP_LOCAL_DATE_FORMAT} />
                    ) : null}
                  </td>
                  <td>{historicoDebito.valorOriginal}</td>
                  <td>{historicoDebito.totalPago}</td>
                  <td>{historicoDebito.totalDesconto}</td>
                  <td>{historicoDebito.totalDevido}</td>
                  <td>{historicoDebito.observacoes}</td>
                  <td>
                    {historicoDebito.debitoHistoricoDebito ? (
                      <Link to={`debito/${historicoDebito.debitoHistoricoDebito.id}`}>{historicoDebito.debitoHistoricoDebito.id}</Link>
                    ) : (
                      ''
                    )}
                  </td>
                  <td>
                    {historicoDebito.detalheUsuarioLancamento ? (
                      <Link to={`detalhe-usuario/${historicoDebito.detalheUsuarioLancamento.id}`}>
                        {historicoDebito.detalheUsuarioLancamento.id}
                      </Link>
                    ) : (
                      ''
                    )}
                  </td>
                  <td className="text-right">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`${match.url}/${historicoDebito.id}`} color="info" size="sm" data-cy="entityDetailsButton">
                        <FontAwesomeIcon icon="eye" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.view">View</Translate>
                        </span>
                      </Button>
                      <Button
                        tag={Link}
                        to={`${match.url}/${historicoDebito.id}/edit?page=${paginationState.activePage}&sort=${paginationState.sort},${paginationState.order}`}
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
                        to={`${match.url}/${historicoDebito.id}/delete?page=${paginationState.activePage}&sort=${paginationState.sort},${paginationState.order}`}
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
              <Translate contentKey="escolaOnlineApp.historicoDebito.home.notFound">No Historico Debitos found</Translate>
            </div>
          )
        )}
      </div>
      {props.totalItems ? (
        <div className={historicoDebitoList && historicoDebitoList.length > 0 ? '' : 'd-none'}>
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

const mapStateToProps = ({ historicoDebito }: IRootState) => ({
  historicoDebitoList: historicoDebito.entities,
  loading: historicoDebito.loading,
  totalItems: historicoDebito.totalItems,
});

const mapDispatchToProps = {
  getEntities,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(HistoricoDebito);
