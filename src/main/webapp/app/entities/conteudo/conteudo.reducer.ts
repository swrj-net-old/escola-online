import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IConteudo, defaultValue } from 'app/shared/model/conteudo.model';

export const ACTION_TYPES = {
  FETCH_CONTEUDO_LIST: 'conteudo/FETCH_CONTEUDO_LIST',
  FETCH_CONTEUDO: 'conteudo/FETCH_CONTEUDO',
  CREATE_CONTEUDO: 'conteudo/CREATE_CONTEUDO',
  UPDATE_CONTEUDO: 'conteudo/UPDATE_CONTEUDO',
  PARTIAL_UPDATE_CONTEUDO: 'conteudo/PARTIAL_UPDATE_CONTEUDO',
  DELETE_CONTEUDO: 'conteudo/DELETE_CONTEUDO',
  RESET: 'conteudo/RESET',
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IConteudo>,
  entity: defaultValue,
  updating: false,
  totalItems: 0,
  updateSuccess: false,
};

export type ConteudoState = Readonly<typeof initialState>;

// Reducer

export default (state: ConteudoState = initialState, action): ConteudoState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_CONTEUDO_LIST):
    case REQUEST(ACTION_TYPES.FETCH_CONTEUDO):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true,
      };
    case REQUEST(ACTION_TYPES.CREATE_CONTEUDO):
    case REQUEST(ACTION_TYPES.UPDATE_CONTEUDO):
    case REQUEST(ACTION_TYPES.DELETE_CONTEUDO):
    case REQUEST(ACTION_TYPES.PARTIAL_UPDATE_CONTEUDO):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true,
      };
    case FAILURE(ACTION_TYPES.FETCH_CONTEUDO_LIST):
    case FAILURE(ACTION_TYPES.FETCH_CONTEUDO):
    case FAILURE(ACTION_TYPES.CREATE_CONTEUDO):
    case FAILURE(ACTION_TYPES.UPDATE_CONTEUDO):
    case FAILURE(ACTION_TYPES.PARTIAL_UPDATE_CONTEUDO):
    case FAILURE(ACTION_TYPES.DELETE_CONTEUDO):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload,
      };
    case SUCCESS(ACTION_TYPES.FETCH_CONTEUDO_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data,
        totalItems: parseInt(action.payload.headers['x-total-count'], 10),
      };
    case SUCCESS(ACTION_TYPES.FETCH_CONTEUDO):
      return {
        ...state,
        loading: false,
        entity: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.CREATE_CONTEUDO):
    case SUCCESS(ACTION_TYPES.UPDATE_CONTEUDO):
    case SUCCESS(ACTION_TYPES.PARTIAL_UPDATE_CONTEUDO):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.DELETE_CONTEUDO):
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

const apiUrl = 'api/conteudos';

// Actions

export const getEntities: ICrudGetAllAction<IConteudo> = (page, size, sort) => {
  const requestUrl = `${apiUrl}${sort ? `?page=${page}&size=${size}&sort=${sort}` : ''}`;
  return {
    type: ACTION_TYPES.FETCH_CONTEUDO_LIST,
    payload: axios.get<IConteudo>(`${requestUrl}${sort ? '&' : '?'}cacheBuster=${new Date().getTime()}`),
  };
};

export const getEntity: ICrudGetAction<IConteudo> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_CONTEUDO,
    payload: axios.get<IConteudo>(requestUrl),
  };
};

export const createEntity: ICrudPutAction<IConteudo> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_CONTEUDO,
    payload: axios.post(apiUrl, cleanEntity(entity)),
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<IConteudo> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_CONTEUDO,
    payload: axios.put(`${apiUrl}/${entity.id}`, cleanEntity(entity)),
  });
  return result;
};

export const partialUpdate: ICrudPutAction<IConteudo> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.PARTIAL_UPDATE_CONTEUDO,
    payload: axios.patch(`${apiUrl}/${entity.id}`, cleanEntity(entity)),
  });
  return result;
};

export const deleteEntity: ICrudDeleteAction<IConteudo> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_CONTEUDO,
    payload: axios.delete(requestUrl),
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET,
});
