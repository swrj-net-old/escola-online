import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IHistoricoDebito, defaultValue } from 'app/shared/model/historico-debito.model';

export const ACTION_TYPES = {
  FETCH_HISTORICODEBITO_LIST: 'historicoDebito/FETCH_HISTORICODEBITO_LIST',
  FETCH_HISTORICODEBITO: 'historicoDebito/FETCH_HISTORICODEBITO',
  CREATE_HISTORICODEBITO: 'historicoDebito/CREATE_HISTORICODEBITO',
  UPDATE_HISTORICODEBITO: 'historicoDebito/UPDATE_HISTORICODEBITO',
  PARTIAL_UPDATE_HISTORICODEBITO: 'historicoDebito/PARTIAL_UPDATE_HISTORICODEBITO',
  DELETE_HISTORICODEBITO: 'historicoDebito/DELETE_HISTORICODEBITO',
  RESET: 'historicoDebito/RESET',
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IHistoricoDebito>,
  entity: defaultValue,
  updating: false,
  totalItems: 0,
  updateSuccess: false,
};

export type HistoricoDebitoState = Readonly<typeof initialState>;

// Reducer

export default (state: HistoricoDebitoState = initialState, action): HistoricoDebitoState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_HISTORICODEBITO_LIST):
    case REQUEST(ACTION_TYPES.FETCH_HISTORICODEBITO):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true,
      };
    case REQUEST(ACTION_TYPES.CREATE_HISTORICODEBITO):
    case REQUEST(ACTION_TYPES.UPDATE_HISTORICODEBITO):
    case REQUEST(ACTION_TYPES.DELETE_HISTORICODEBITO):
    case REQUEST(ACTION_TYPES.PARTIAL_UPDATE_HISTORICODEBITO):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true,
      };
    case FAILURE(ACTION_TYPES.FETCH_HISTORICODEBITO_LIST):
    case FAILURE(ACTION_TYPES.FETCH_HISTORICODEBITO):
    case FAILURE(ACTION_TYPES.CREATE_HISTORICODEBITO):
    case FAILURE(ACTION_TYPES.UPDATE_HISTORICODEBITO):
    case FAILURE(ACTION_TYPES.PARTIAL_UPDATE_HISTORICODEBITO):
    case FAILURE(ACTION_TYPES.DELETE_HISTORICODEBITO):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload,
      };
    case SUCCESS(ACTION_TYPES.FETCH_HISTORICODEBITO_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data,
        totalItems: parseInt(action.payload.headers['x-total-count'], 10),
      };
    case SUCCESS(ACTION_TYPES.FETCH_HISTORICODEBITO):
      return {
        ...state,
        loading: false,
        entity: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.CREATE_HISTORICODEBITO):
    case SUCCESS(ACTION_TYPES.UPDATE_HISTORICODEBITO):
    case SUCCESS(ACTION_TYPES.PARTIAL_UPDATE_HISTORICODEBITO):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.DELETE_HISTORICODEBITO):
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

const apiUrl = 'api/historico-debitos';

// Actions

export const getEntities: ICrudGetAllAction<IHistoricoDebito> = (page, size, sort) => {
  const requestUrl = `${apiUrl}${sort ? `?page=${page}&size=${size}&sort=${sort}` : ''}`;
  return {
    type: ACTION_TYPES.FETCH_HISTORICODEBITO_LIST,
    payload: axios.get<IHistoricoDebito>(`${requestUrl}${sort ? '&' : '?'}cacheBuster=${new Date().getTime()}`),
  };
};

export const getEntity: ICrudGetAction<IHistoricoDebito> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_HISTORICODEBITO,
    payload: axios.get<IHistoricoDebito>(requestUrl),
  };
};

export const createEntity: ICrudPutAction<IHistoricoDebito> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_HISTORICODEBITO,
    payload: axios.post(apiUrl, cleanEntity(entity)),
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<IHistoricoDebito> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_HISTORICODEBITO,
    payload: axios.put(`${apiUrl}/${entity.id}`, cleanEntity(entity)),
  });
  return result;
};

export const partialUpdate: ICrudPutAction<IHistoricoDebito> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.PARTIAL_UPDATE_HISTORICODEBITO,
    payload: axios.patch(`${apiUrl}/${entity.id}`, cleanEntity(entity)),
  });
  return result;
};

export const deleteEntity: ICrudDeleteAction<IHistoricoDebito> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_HISTORICODEBITO,
    payload: axios.delete(requestUrl),
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET,
});
