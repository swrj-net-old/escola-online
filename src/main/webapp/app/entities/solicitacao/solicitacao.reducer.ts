import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { ISolicitacao, defaultValue } from 'app/shared/model/solicitacao.model';

export const ACTION_TYPES = {
  FETCH_SOLICITACAO_LIST: 'solicitacao/FETCH_SOLICITACAO_LIST',
  FETCH_SOLICITACAO: 'solicitacao/FETCH_SOLICITACAO',
  CREATE_SOLICITACAO: 'solicitacao/CREATE_SOLICITACAO',
  UPDATE_SOLICITACAO: 'solicitacao/UPDATE_SOLICITACAO',
  PARTIAL_UPDATE_SOLICITACAO: 'solicitacao/PARTIAL_UPDATE_SOLICITACAO',
  DELETE_SOLICITACAO: 'solicitacao/DELETE_SOLICITACAO',
  RESET: 'solicitacao/RESET',
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<ISolicitacao>,
  entity: defaultValue,
  updating: false,
  totalItems: 0,
  updateSuccess: false,
};

export type SolicitacaoState = Readonly<typeof initialState>;

// Reducer

export default (state: SolicitacaoState = initialState, action): SolicitacaoState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_SOLICITACAO_LIST):
    case REQUEST(ACTION_TYPES.FETCH_SOLICITACAO):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true,
      };
    case REQUEST(ACTION_TYPES.CREATE_SOLICITACAO):
    case REQUEST(ACTION_TYPES.UPDATE_SOLICITACAO):
    case REQUEST(ACTION_TYPES.DELETE_SOLICITACAO):
    case REQUEST(ACTION_TYPES.PARTIAL_UPDATE_SOLICITACAO):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true,
      };
    case FAILURE(ACTION_TYPES.FETCH_SOLICITACAO_LIST):
    case FAILURE(ACTION_TYPES.FETCH_SOLICITACAO):
    case FAILURE(ACTION_TYPES.CREATE_SOLICITACAO):
    case FAILURE(ACTION_TYPES.UPDATE_SOLICITACAO):
    case FAILURE(ACTION_TYPES.PARTIAL_UPDATE_SOLICITACAO):
    case FAILURE(ACTION_TYPES.DELETE_SOLICITACAO):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload,
      };
    case SUCCESS(ACTION_TYPES.FETCH_SOLICITACAO_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data,
        totalItems: parseInt(action.payload.headers['x-total-count'], 10),
      };
    case SUCCESS(ACTION_TYPES.FETCH_SOLICITACAO):
      return {
        ...state,
        loading: false,
        entity: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.CREATE_SOLICITACAO):
    case SUCCESS(ACTION_TYPES.UPDATE_SOLICITACAO):
    case SUCCESS(ACTION_TYPES.PARTIAL_UPDATE_SOLICITACAO):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.DELETE_SOLICITACAO):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: {},
      };
    case ACTION_TYPES.RESET:
      return {
        ...initialState,
      };
    default:
      return state;
  }
};

const apiUrl = 'api/solicitacaos';

// Actions

export const getEntities: ICrudGetAllAction<ISolicitacao> = (page, size, sort) => {
  const requestUrl = `${apiUrl}${sort ? `?page=${page}&size=${size}&sort=${sort}` : ''}`;
  return {
    type: ACTION_TYPES.FETCH_SOLICITACAO_LIST,
    payload: axios.get<ISolicitacao>(`${requestUrl}${sort ? '&' : '?'}cacheBuster=${new Date().getTime()}`),
  };
};

export const getEntity: ICrudGetAction<ISolicitacao> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_SOLICITACAO,
    payload: axios.get<ISolicitacao>(requestUrl),
  };
};

export const createEntity: ICrudPutAction<ISolicitacao> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_SOLICITACAO,
    payload: axios.post(apiUrl, cleanEntity(entity)),
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<ISolicitacao> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_SOLICITACAO,
    payload: axios.put(`${apiUrl}/${entity.id}`, cleanEntity(entity)),
  });
  return result;
};

export const partialUpdate: ICrudPutAction<ISolicitacao> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.PARTIAL_UPDATE_SOLICITACAO,
    payload: axios.patch(`${apiUrl}/${entity.id}`, cleanEntity(entity)),
  });
  return result;
};

export const deleteEntity: ICrudDeleteAction<ISolicitacao> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_SOLICITACAO,
    payload: axios.delete(requestUrl),
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET,
});
