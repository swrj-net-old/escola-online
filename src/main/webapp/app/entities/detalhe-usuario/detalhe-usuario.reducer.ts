import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IDetalheUsuario, defaultValue } from 'app/shared/model/detalhe-usuario.model';

export const ACTION_TYPES = {
  FETCH_DETALHEUSUARIO_LIST: 'detalheUsuario/FETCH_DETALHEUSUARIO_LIST',
  FETCH_DETALHEUSUARIO: 'detalheUsuario/FETCH_DETALHEUSUARIO',
  CREATE_DETALHEUSUARIO: 'detalheUsuario/CREATE_DETALHEUSUARIO',
  UPDATE_DETALHEUSUARIO: 'detalheUsuario/UPDATE_DETALHEUSUARIO',
  PARTIAL_UPDATE_DETALHEUSUARIO: 'detalheUsuario/PARTIAL_UPDATE_DETALHEUSUARIO',
  DELETE_DETALHEUSUARIO: 'detalheUsuario/DELETE_DETALHEUSUARIO',
  RESET: 'detalheUsuario/RESET',
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IDetalheUsuario>,
  entity: defaultValue,
  updating: false,
  totalItems: 0,
  updateSuccess: false,
};

export type DetalheUsuarioState = Readonly<typeof initialState>;

// Reducer

export default (state: DetalheUsuarioState = initialState, action): DetalheUsuarioState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_DETALHEUSUARIO_LIST):
    case REQUEST(ACTION_TYPES.FETCH_DETALHEUSUARIO):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true,
      };
    case REQUEST(ACTION_TYPES.CREATE_DETALHEUSUARIO):
    case REQUEST(ACTION_TYPES.UPDATE_DETALHEUSUARIO):
    case REQUEST(ACTION_TYPES.DELETE_DETALHEUSUARIO):
    case REQUEST(ACTION_TYPES.PARTIAL_UPDATE_DETALHEUSUARIO):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true,
      };
    case FAILURE(ACTION_TYPES.FETCH_DETALHEUSUARIO_LIST):
    case FAILURE(ACTION_TYPES.FETCH_DETALHEUSUARIO):
    case FAILURE(ACTION_TYPES.CREATE_DETALHEUSUARIO):
    case FAILURE(ACTION_TYPES.UPDATE_DETALHEUSUARIO):
    case FAILURE(ACTION_TYPES.PARTIAL_UPDATE_DETALHEUSUARIO):
    case FAILURE(ACTION_TYPES.DELETE_DETALHEUSUARIO):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload,
      };
    case SUCCESS(ACTION_TYPES.FETCH_DETALHEUSUARIO_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data,
        totalItems: parseInt(action.payload.headers['x-total-count'], 10),
      };
    case SUCCESS(ACTION_TYPES.FETCH_DETALHEUSUARIO):
      return {
        ...state,
        loading: false,
        entity: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.CREATE_DETALHEUSUARIO):
    case SUCCESS(ACTION_TYPES.UPDATE_DETALHEUSUARIO):
    case SUCCESS(ACTION_TYPES.PARTIAL_UPDATE_DETALHEUSUARIO):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.DELETE_DETALHEUSUARIO):
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

const apiUrl = 'api/detalhe-usuarios';

// Actions

export const getEntities: ICrudGetAllAction<IDetalheUsuario> = (page, size, sort) => {
  const requestUrl = `${apiUrl}${sort ? `?page=${page}&size=${size}&sort=${sort}` : ''}`;
  return {
    type: ACTION_TYPES.FETCH_DETALHEUSUARIO_LIST,
    payload: axios.get<IDetalheUsuario>(`${requestUrl}${sort ? '&' : '?'}cacheBuster=${new Date().getTime()}`),
  };
};

export const getEntity: ICrudGetAction<IDetalheUsuario> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_DETALHEUSUARIO,
    payload: axios.get<IDetalheUsuario>(requestUrl),
  };
};

export const createEntity: ICrudPutAction<IDetalheUsuario> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_DETALHEUSUARIO,
    payload: axios.post(apiUrl, cleanEntity(entity)),
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<IDetalheUsuario> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_DETALHEUSUARIO,
    payload: axios.put(`${apiUrl}/${entity.id}`, cleanEntity(entity)),
  });
  return result;
};

export const partialUpdate: ICrudPutAction<IDetalheUsuario> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.PARTIAL_UPDATE_DETALHEUSUARIO,
    payload: axios.patch(`${apiUrl}/${entity.id}`, cleanEntity(entity)),
  });
  return result;
};

export const deleteEntity: ICrudDeleteAction<IDetalheUsuario> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_DETALHEUSUARIO,
    payload: axios.delete(requestUrl),
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET,
});
