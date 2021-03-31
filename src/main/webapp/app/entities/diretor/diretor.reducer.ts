import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IDiretor, defaultValue } from 'app/shared/model/diretor.model';

export const ACTION_TYPES = {
  FETCH_DIRETOR_LIST: 'diretor/FETCH_DIRETOR_LIST',
  FETCH_DIRETOR: 'diretor/FETCH_DIRETOR',
  CREATE_DIRETOR: 'diretor/CREATE_DIRETOR',
  UPDATE_DIRETOR: 'diretor/UPDATE_DIRETOR',
  PARTIAL_UPDATE_DIRETOR: 'diretor/PARTIAL_UPDATE_DIRETOR',
  DELETE_DIRETOR: 'diretor/DELETE_DIRETOR',
  RESET: 'diretor/RESET',
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IDiretor>,
  entity: defaultValue,
  updating: false,
  totalItems: 0,
  updateSuccess: false,
};

export type DiretorState = Readonly<typeof initialState>;

// Reducer

export default (state: DiretorState = initialState, action): DiretorState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_DIRETOR_LIST):
    case REQUEST(ACTION_TYPES.FETCH_DIRETOR):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true,
      };
    case REQUEST(ACTION_TYPES.CREATE_DIRETOR):
    case REQUEST(ACTION_TYPES.UPDATE_DIRETOR):
    case REQUEST(ACTION_TYPES.DELETE_DIRETOR):
    case REQUEST(ACTION_TYPES.PARTIAL_UPDATE_DIRETOR):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true,
      };
    case FAILURE(ACTION_TYPES.FETCH_DIRETOR_LIST):
    case FAILURE(ACTION_TYPES.FETCH_DIRETOR):
    case FAILURE(ACTION_TYPES.CREATE_DIRETOR):
    case FAILURE(ACTION_TYPES.UPDATE_DIRETOR):
    case FAILURE(ACTION_TYPES.PARTIAL_UPDATE_DIRETOR):
    case FAILURE(ACTION_TYPES.DELETE_DIRETOR):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload,
      };
    case SUCCESS(ACTION_TYPES.FETCH_DIRETOR_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data,
        totalItems: parseInt(action.payload.headers['x-total-count'], 10),
      };
    case SUCCESS(ACTION_TYPES.FETCH_DIRETOR):
      return {
        ...state,
        loading: false,
        entity: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.CREATE_DIRETOR):
    case SUCCESS(ACTION_TYPES.UPDATE_DIRETOR):
    case SUCCESS(ACTION_TYPES.PARTIAL_UPDATE_DIRETOR):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.DELETE_DIRETOR):
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

const apiUrl = 'api/diretors';

// Actions

export const getEntities: ICrudGetAllAction<IDiretor> = (page, size, sort) => {
  const requestUrl = `${apiUrl}${sort ? `?page=${page}&size=${size}&sort=${sort}` : ''}`;
  return {
    type: ACTION_TYPES.FETCH_DIRETOR_LIST,
    payload: axios.get<IDiretor>(`${requestUrl}${sort ? '&' : '?'}cacheBuster=${new Date().getTime()}`),
  };
};

export const getEntity: ICrudGetAction<IDiretor> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_DIRETOR,
    payload: axios.get<IDiretor>(requestUrl),
  };
};

export const createEntity: ICrudPutAction<IDiretor> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_DIRETOR,
    payload: axios.post(apiUrl, cleanEntity(entity)),
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<IDiretor> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_DIRETOR,
    payload: axios.put(`${apiUrl}/${entity.id}`, cleanEntity(entity)),
  });
  return result;
};

export const partialUpdate: ICrudPutAction<IDiretor> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.PARTIAL_UPDATE_DIRETOR,
    payload: axios.patch(`${apiUrl}/${entity.id}`, cleanEntity(entity)),
  });
  return result;
};

export const deleteEntity: ICrudDeleteAction<IDiretor> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_DIRETOR,
    payload: axios.delete(requestUrl),
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET,
});
