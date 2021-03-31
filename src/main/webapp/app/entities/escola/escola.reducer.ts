import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IEscola, defaultValue } from 'app/shared/model/escola.model';

export const ACTION_TYPES = {
  FETCH_ESCOLA_LIST: 'escola/FETCH_ESCOLA_LIST',
  FETCH_ESCOLA: 'escola/FETCH_ESCOLA',
  CREATE_ESCOLA: 'escola/CREATE_ESCOLA',
  UPDATE_ESCOLA: 'escola/UPDATE_ESCOLA',
  PARTIAL_UPDATE_ESCOLA: 'escola/PARTIAL_UPDATE_ESCOLA',
  DELETE_ESCOLA: 'escola/DELETE_ESCOLA',
  RESET: 'escola/RESET',
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IEscola>,
  entity: defaultValue,
  updating: false,
  totalItems: 0,
  updateSuccess: false,
};

export type EscolaState = Readonly<typeof initialState>;

// Reducer

export default (state: EscolaState = initialState, action): EscolaState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_ESCOLA_LIST):
    case REQUEST(ACTION_TYPES.FETCH_ESCOLA):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true,
      };
    case REQUEST(ACTION_TYPES.CREATE_ESCOLA):
    case REQUEST(ACTION_TYPES.UPDATE_ESCOLA):
    case REQUEST(ACTION_TYPES.DELETE_ESCOLA):
    case REQUEST(ACTION_TYPES.PARTIAL_UPDATE_ESCOLA):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true,
      };
    case FAILURE(ACTION_TYPES.FETCH_ESCOLA_LIST):
    case FAILURE(ACTION_TYPES.FETCH_ESCOLA):
    case FAILURE(ACTION_TYPES.CREATE_ESCOLA):
    case FAILURE(ACTION_TYPES.UPDATE_ESCOLA):
    case FAILURE(ACTION_TYPES.PARTIAL_UPDATE_ESCOLA):
    case FAILURE(ACTION_TYPES.DELETE_ESCOLA):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload,
      };
    case SUCCESS(ACTION_TYPES.FETCH_ESCOLA_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data,
        totalItems: parseInt(action.payload.headers['x-total-count'], 10),
      };
    case SUCCESS(ACTION_TYPES.FETCH_ESCOLA):
      return {
        ...state,
        loading: false,
        entity: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.CREATE_ESCOLA):
    case SUCCESS(ACTION_TYPES.UPDATE_ESCOLA):
    case SUCCESS(ACTION_TYPES.PARTIAL_UPDATE_ESCOLA):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.DELETE_ESCOLA):
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

const apiUrl = 'api/escolas';

// Actions

export const getEntities: ICrudGetAllAction<IEscola> = (page, size, sort) => {
  const requestUrl = `${apiUrl}${sort ? `?page=${page}&size=${size}&sort=${sort}` : ''}`;
  return {
    type: ACTION_TYPES.FETCH_ESCOLA_LIST,
    payload: axios.get<IEscola>(`${requestUrl}${sort ? '&' : '?'}cacheBuster=${new Date().getTime()}`),
  };
};

export const getEntity: ICrudGetAction<IEscola> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_ESCOLA,
    payload: axios.get<IEscola>(requestUrl),
  };
};

export const createEntity: ICrudPutAction<IEscola> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_ESCOLA,
    payload: axios.post(apiUrl, cleanEntity(entity)),
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<IEscola> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_ESCOLA,
    payload: axios.put(`${apiUrl}/${entity.id}`, cleanEntity(entity)),
  });
  return result;
};

export const partialUpdate: ICrudPutAction<IEscola> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.PARTIAL_UPDATE_ESCOLA,
    payload: axios.patch(`${apiUrl}/${entity.id}`, cleanEntity(entity)),
  });
  return result;
};

export const deleteEntity: ICrudDeleteAction<IEscola> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_ESCOLA,
    payload: axios.delete(requestUrl),
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET,
});
