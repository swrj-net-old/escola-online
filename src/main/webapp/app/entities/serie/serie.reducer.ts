import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { ISerie, defaultValue } from 'app/shared/model/serie.model';

export const ACTION_TYPES = {
  FETCH_SERIE_LIST: 'serie/FETCH_SERIE_LIST',
  FETCH_SERIE: 'serie/FETCH_SERIE',
  CREATE_SERIE: 'serie/CREATE_SERIE',
  UPDATE_SERIE: 'serie/UPDATE_SERIE',
  PARTIAL_UPDATE_SERIE: 'serie/PARTIAL_UPDATE_SERIE',
  DELETE_SERIE: 'serie/DELETE_SERIE',
  RESET: 'serie/RESET',
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<ISerie>,
  entity: defaultValue,
  updating: false,
  totalItems: 0,
  updateSuccess: false,
};

export type SerieState = Readonly<typeof initialState>;

// Reducer

export default (state: SerieState = initialState, action): SerieState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_SERIE_LIST):
    case REQUEST(ACTION_TYPES.FETCH_SERIE):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true,
      };
    case REQUEST(ACTION_TYPES.CREATE_SERIE):
    case REQUEST(ACTION_TYPES.UPDATE_SERIE):
    case REQUEST(ACTION_TYPES.DELETE_SERIE):
    case REQUEST(ACTION_TYPES.PARTIAL_UPDATE_SERIE):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true,
      };
    case FAILURE(ACTION_TYPES.FETCH_SERIE_LIST):
    case FAILURE(ACTION_TYPES.FETCH_SERIE):
    case FAILURE(ACTION_TYPES.CREATE_SERIE):
    case FAILURE(ACTION_TYPES.UPDATE_SERIE):
    case FAILURE(ACTION_TYPES.PARTIAL_UPDATE_SERIE):
    case FAILURE(ACTION_TYPES.DELETE_SERIE):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload,
      };
    case SUCCESS(ACTION_TYPES.FETCH_SERIE_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data,
        totalItems: parseInt(action.payload.headers['x-total-count'], 10),
      };
    case SUCCESS(ACTION_TYPES.FETCH_SERIE):
      return {
        ...state,
        loading: false,
        entity: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.CREATE_SERIE):
    case SUCCESS(ACTION_TYPES.UPDATE_SERIE):
    case SUCCESS(ACTION_TYPES.PARTIAL_UPDATE_SERIE):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.DELETE_SERIE):
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

const apiUrl = 'api/series';

// Actions

export const getEntities: ICrudGetAllAction<ISerie> = (page, size, sort) => {
  const requestUrl = `${apiUrl}${sort ? `?page=${page}&size=${size}&sort=${sort}` : ''}`;
  return {
    type: ACTION_TYPES.FETCH_SERIE_LIST,
    payload: axios.get<ISerie>(`${requestUrl}${sort ? '&' : '?'}cacheBuster=${new Date().getTime()}`),
  };
};

export const getEntity: ICrudGetAction<ISerie> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_SERIE,
    payload: axios.get<ISerie>(requestUrl),
  };
};

export const createEntity: ICrudPutAction<ISerie> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_SERIE,
    payload: axios.post(apiUrl, cleanEntity(entity)),
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<ISerie> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_SERIE,
    payload: axios.put(`${apiUrl}/${entity.id}`, cleanEntity(entity)),
  });
  return result;
};

export const partialUpdate: ICrudPutAction<ISerie> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.PARTIAL_UPDATE_SERIE,
    payload: axios.patch(`${apiUrl}/${entity.id}`, cleanEntity(entity)),
  });
  return result;
};

export const deleteEntity: ICrudDeleteAction<ISerie> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_SERIE,
    payload: axios.delete(requestUrl),
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET,
});
