import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IUnidade, defaultValue } from 'app/shared/model/unidade.model';

export const ACTION_TYPES = {
  FETCH_UNIDADE_LIST: 'unidade/FETCH_UNIDADE_LIST',
  FETCH_UNIDADE: 'unidade/FETCH_UNIDADE',
  CREATE_UNIDADE: 'unidade/CREATE_UNIDADE',
  UPDATE_UNIDADE: 'unidade/UPDATE_UNIDADE',
  PARTIAL_UPDATE_UNIDADE: 'unidade/PARTIAL_UPDATE_UNIDADE',
  DELETE_UNIDADE: 'unidade/DELETE_UNIDADE',
  RESET: 'unidade/RESET',
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IUnidade>,
  entity: defaultValue,
  updating: false,
  totalItems: 0,
  updateSuccess: false,
};

export type UnidadeState = Readonly<typeof initialState>;

// Reducer

export default (state: UnidadeState = initialState, action): UnidadeState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_UNIDADE_LIST):
    case REQUEST(ACTION_TYPES.FETCH_UNIDADE):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true,
      };
    case REQUEST(ACTION_TYPES.CREATE_UNIDADE):
    case REQUEST(ACTION_TYPES.UPDATE_UNIDADE):
    case REQUEST(ACTION_TYPES.DELETE_UNIDADE):
    case REQUEST(ACTION_TYPES.PARTIAL_UPDATE_UNIDADE):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true,
      };
    case FAILURE(ACTION_TYPES.FETCH_UNIDADE_LIST):
    case FAILURE(ACTION_TYPES.FETCH_UNIDADE):
    case FAILURE(ACTION_TYPES.CREATE_UNIDADE):
    case FAILURE(ACTION_TYPES.UPDATE_UNIDADE):
    case FAILURE(ACTION_TYPES.PARTIAL_UPDATE_UNIDADE):
    case FAILURE(ACTION_TYPES.DELETE_UNIDADE):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload,
      };
    case SUCCESS(ACTION_TYPES.FETCH_UNIDADE_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data,
        totalItems: parseInt(action.payload.headers['x-total-count'], 10),
      };
    case SUCCESS(ACTION_TYPES.FETCH_UNIDADE):
      return {
        ...state,
        loading: false,
        entity: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.CREATE_UNIDADE):
    case SUCCESS(ACTION_TYPES.UPDATE_UNIDADE):
    case SUCCESS(ACTION_TYPES.PARTIAL_UPDATE_UNIDADE):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.DELETE_UNIDADE):
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

const apiUrl = 'api/unidades';

// Actions

export const getEntities: ICrudGetAllAction<IUnidade> = (page, size, sort) => {
  const requestUrl = `${apiUrl}${sort ? `?page=${page}&size=${size}&sort=${sort}` : ''}`;
  return {
    type: ACTION_TYPES.FETCH_UNIDADE_LIST,
    payload: axios.get<IUnidade>(`${requestUrl}${sort ? '&' : '?'}cacheBuster=${new Date().getTime()}`),
  };
};

export const getEntity: ICrudGetAction<IUnidade> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_UNIDADE,
    payload: axios.get<IUnidade>(requestUrl),
  };
};

export const createEntity: ICrudPutAction<IUnidade> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_UNIDADE,
    payload: axios.post(apiUrl, cleanEntity(entity)),
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<IUnidade> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_UNIDADE,
    payload: axios.put(`${apiUrl}/${entity.id}`, cleanEntity(entity)),
  });
  return result;
};

export const partialUpdate: ICrudPutAction<IUnidade> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.PARTIAL_UPDATE_UNIDADE,
    payload: axios.patch(`${apiUrl}/${entity.id}`, cleanEntity(entity)),
  });
  return result;
};

export const deleteEntity: ICrudDeleteAction<IUnidade> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_UNIDADE,
    payload: axios.delete(requestUrl),
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET,
});
