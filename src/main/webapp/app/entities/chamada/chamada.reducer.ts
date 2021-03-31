import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IChamada, defaultValue } from 'app/shared/model/chamada.model';

export const ACTION_TYPES = {
  FETCH_CHAMADA_LIST: 'chamada/FETCH_CHAMADA_LIST',
  FETCH_CHAMADA: 'chamada/FETCH_CHAMADA',
  CREATE_CHAMADA: 'chamada/CREATE_CHAMADA',
  UPDATE_CHAMADA: 'chamada/UPDATE_CHAMADA',
  PARTIAL_UPDATE_CHAMADA: 'chamada/PARTIAL_UPDATE_CHAMADA',
  DELETE_CHAMADA: 'chamada/DELETE_CHAMADA',
  RESET: 'chamada/RESET',
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IChamada>,
  entity: defaultValue,
  updating: false,
  totalItems: 0,
  updateSuccess: false,
};

export type ChamadaState = Readonly<typeof initialState>;

// Reducer

export default (state: ChamadaState = initialState, action): ChamadaState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_CHAMADA_LIST):
    case REQUEST(ACTION_TYPES.FETCH_CHAMADA):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true,
      };
    case REQUEST(ACTION_TYPES.CREATE_CHAMADA):
    case REQUEST(ACTION_TYPES.UPDATE_CHAMADA):
    case REQUEST(ACTION_TYPES.DELETE_CHAMADA):
    case REQUEST(ACTION_TYPES.PARTIAL_UPDATE_CHAMADA):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true,
      };
    case FAILURE(ACTION_TYPES.FETCH_CHAMADA_LIST):
    case FAILURE(ACTION_TYPES.FETCH_CHAMADA):
    case FAILURE(ACTION_TYPES.CREATE_CHAMADA):
    case FAILURE(ACTION_TYPES.UPDATE_CHAMADA):
    case FAILURE(ACTION_TYPES.PARTIAL_UPDATE_CHAMADA):
    case FAILURE(ACTION_TYPES.DELETE_CHAMADA):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload,
      };
    case SUCCESS(ACTION_TYPES.FETCH_CHAMADA_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data,
        totalItems: parseInt(action.payload.headers['x-total-count'], 10),
      };
    case SUCCESS(ACTION_TYPES.FETCH_CHAMADA):
      return {
        ...state,
        loading: false,
        entity: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.CREATE_CHAMADA):
    case SUCCESS(ACTION_TYPES.UPDATE_CHAMADA):
    case SUCCESS(ACTION_TYPES.PARTIAL_UPDATE_CHAMADA):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.DELETE_CHAMADA):
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

const apiUrl = 'api/chamadas';

// Actions

export const getEntities: ICrudGetAllAction<IChamada> = (page, size, sort) => {
  const requestUrl = `${apiUrl}${sort ? `?page=${page}&size=${size}&sort=${sort}` : ''}`;
  return {
    type: ACTION_TYPES.FETCH_CHAMADA_LIST,
    payload: axios.get<IChamada>(`${requestUrl}${sort ? '&' : '?'}cacheBuster=${new Date().getTime()}`),
  };
};

export const getEntity: ICrudGetAction<IChamada> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_CHAMADA,
    payload: axios.get<IChamada>(requestUrl),
  };
};

export const createEntity: ICrudPutAction<IChamada> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_CHAMADA,
    payload: axios.post(apiUrl, cleanEntity(entity)),
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<IChamada> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_CHAMADA,
    payload: axios.put(`${apiUrl}/${entity.id}`, cleanEntity(entity)),
  });
  return result;
};

export const partialUpdate: ICrudPutAction<IChamada> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.PARTIAL_UPDATE_CHAMADA,
    payload: axios.patch(`${apiUrl}/${entity.id}`, cleanEntity(entity)),
  });
  return result;
};

export const deleteEntity: ICrudDeleteAction<IChamada> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_CHAMADA,
    payload: axios.delete(requestUrl),
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET,
});
