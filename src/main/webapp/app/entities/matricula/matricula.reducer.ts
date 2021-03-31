import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IMatricula, defaultValue } from 'app/shared/model/matricula.model';

export const ACTION_TYPES = {
  FETCH_MATRICULA_LIST: 'matricula/FETCH_MATRICULA_LIST',
  FETCH_MATRICULA: 'matricula/FETCH_MATRICULA',
  CREATE_MATRICULA: 'matricula/CREATE_MATRICULA',
  UPDATE_MATRICULA: 'matricula/UPDATE_MATRICULA',
  PARTIAL_UPDATE_MATRICULA: 'matricula/PARTIAL_UPDATE_MATRICULA',
  DELETE_MATRICULA: 'matricula/DELETE_MATRICULA',
  RESET: 'matricula/RESET',
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IMatricula>,
  entity: defaultValue,
  updating: false,
  totalItems: 0,
  updateSuccess: false,
};

export type MatriculaState = Readonly<typeof initialState>;

// Reducer

export default (state: MatriculaState = initialState, action): MatriculaState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_MATRICULA_LIST):
    case REQUEST(ACTION_TYPES.FETCH_MATRICULA):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true,
      };
    case REQUEST(ACTION_TYPES.CREATE_MATRICULA):
    case REQUEST(ACTION_TYPES.UPDATE_MATRICULA):
    case REQUEST(ACTION_TYPES.DELETE_MATRICULA):
    case REQUEST(ACTION_TYPES.PARTIAL_UPDATE_MATRICULA):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true,
      };
    case FAILURE(ACTION_TYPES.FETCH_MATRICULA_LIST):
    case FAILURE(ACTION_TYPES.FETCH_MATRICULA):
    case FAILURE(ACTION_TYPES.CREATE_MATRICULA):
    case FAILURE(ACTION_TYPES.UPDATE_MATRICULA):
    case FAILURE(ACTION_TYPES.PARTIAL_UPDATE_MATRICULA):
    case FAILURE(ACTION_TYPES.DELETE_MATRICULA):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload,
      };
    case SUCCESS(ACTION_TYPES.FETCH_MATRICULA_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data,
        totalItems: parseInt(action.payload.headers['x-total-count'], 10),
      };
    case SUCCESS(ACTION_TYPES.FETCH_MATRICULA):
      return {
        ...state,
        loading: false,
        entity: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.CREATE_MATRICULA):
    case SUCCESS(ACTION_TYPES.UPDATE_MATRICULA):
    case SUCCESS(ACTION_TYPES.PARTIAL_UPDATE_MATRICULA):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.DELETE_MATRICULA):
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

const apiUrl = 'api/matriculas';

// Actions

export const getEntities: ICrudGetAllAction<IMatricula> = (page, size, sort) => {
  const requestUrl = `${apiUrl}${sort ? `?page=${page}&size=${size}&sort=${sort}` : ''}`;
  return {
    type: ACTION_TYPES.FETCH_MATRICULA_LIST,
    payload: axios.get<IMatricula>(`${requestUrl}${sort ? '&' : '?'}cacheBuster=${new Date().getTime()}`),
  };
};

export const getEntity: ICrudGetAction<IMatricula> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_MATRICULA,
    payload: axios.get<IMatricula>(requestUrl),
  };
};

export const createEntity: ICrudPutAction<IMatricula> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_MATRICULA,
    payload: axios.post(apiUrl, cleanEntity(entity)),
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<IMatricula> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_MATRICULA,
    payload: axios.put(`${apiUrl}/${entity.id}`, cleanEntity(entity)),
  });
  return result;
};

export const partialUpdate: ICrudPutAction<IMatricula> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.PARTIAL_UPDATE_MATRICULA,
    payload: axios.patch(`${apiUrl}/${entity.id}`, cleanEntity(entity)),
  });
  return result;
};

export const deleteEntity: ICrudDeleteAction<IMatricula> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_MATRICULA,
    payload: axios.delete(requestUrl),
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET,
});
