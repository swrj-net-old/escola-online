import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IDebito, defaultValue } from 'app/shared/model/debito.model';

export const ACTION_TYPES = {
  FETCH_DEBITO_LIST: 'debito/FETCH_DEBITO_LIST',
  FETCH_DEBITO: 'debito/FETCH_DEBITO',
  CREATE_DEBITO: 'debito/CREATE_DEBITO',
  UPDATE_DEBITO: 'debito/UPDATE_DEBITO',
  PARTIAL_UPDATE_DEBITO: 'debito/PARTIAL_UPDATE_DEBITO',
  DELETE_DEBITO: 'debito/DELETE_DEBITO',
  RESET: 'debito/RESET',
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IDebito>,
  entity: defaultValue,
  updating: false,
  totalItems: 0,
  updateSuccess: false,
};

export type DebitoState = Readonly<typeof initialState>;

// Reducer

export default (state: DebitoState = initialState, action): DebitoState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_DEBITO_LIST):
    case REQUEST(ACTION_TYPES.FETCH_DEBITO):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true,
      };
    case REQUEST(ACTION_TYPES.CREATE_DEBITO):
    case REQUEST(ACTION_TYPES.UPDATE_DEBITO):
    case REQUEST(ACTION_TYPES.DELETE_DEBITO):
    case REQUEST(ACTION_TYPES.PARTIAL_UPDATE_DEBITO):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true,
      };
    case FAILURE(ACTION_TYPES.FETCH_DEBITO_LIST):
    case FAILURE(ACTION_TYPES.FETCH_DEBITO):
    case FAILURE(ACTION_TYPES.CREATE_DEBITO):
    case FAILURE(ACTION_TYPES.UPDATE_DEBITO):
    case FAILURE(ACTION_TYPES.PARTIAL_UPDATE_DEBITO):
    case FAILURE(ACTION_TYPES.DELETE_DEBITO):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload,
      };
    case SUCCESS(ACTION_TYPES.FETCH_DEBITO_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data,
        totalItems: parseInt(action.payload.headers['x-total-count'], 10),
      };
    case SUCCESS(ACTION_TYPES.FETCH_DEBITO):
      return {
        ...state,
        loading: false,
        entity: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.CREATE_DEBITO):
    case SUCCESS(ACTION_TYPES.UPDATE_DEBITO):
    case SUCCESS(ACTION_TYPES.PARTIAL_UPDATE_DEBITO):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.DELETE_DEBITO):
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

const apiUrl = 'api/debitos';

// Actions

export const getEntities: ICrudGetAllAction<IDebito> = (page, size, sort) => {
  const requestUrl = `${apiUrl}${sort ? `?page=${page}&size=${size}&sort=${sort}` : ''}`;
  return {
    type: ACTION_TYPES.FETCH_DEBITO_LIST,
    payload: axios.get<IDebito>(`${requestUrl}${sort ? '&' : '?'}cacheBuster=${new Date().getTime()}`),
  };
};

export const getEntity: ICrudGetAction<IDebito> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_DEBITO,
    payload: axios.get<IDebito>(requestUrl),
  };
};

export const createEntity: ICrudPutAction<IDebito> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_DEBITO,
    payload: axios.post(apiUrl, cleanEntity(entity)),
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<IDebito> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_DEBITO,
    payload: axios.put(`${apiUrl}/${entity.id}`, cleanEntity(entity)),
  });
  return result;
};

export const partialUpdate: ICrudPutAction<IDebito> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.PARTIAL_UPDATE_DEBITO,
    payload: axios.patch(`${apiUrl}/${entity.id}`, cleanEntity(entity)),
  });
  return result;
};

export const deleteEntity: ICrudDeleteAction<IDebito> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_DEBITO,
    payload: axios.delete(requestUrl),
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET,
});
