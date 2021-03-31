import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IProfessor, defaultValue } from 'app/shared/model/professor.model';

export const ACTION_TYPES = {
  FETCH_PROFESSOR_LIST: 'professor/FETCH_PROFESSOR_LIST',
  FETCH_PROFESSOR: 'professor/FETCH_PROFESSOR',
  CREATE_PROFESSOR: 'professor/CREATE_PROFESSOR',
  UPDATE_PROFESSOR: 'professor/UPDATE_PROFESSOR',
  PARTIAL_UPDATE_PROFESSOR: 'professor/PARTIAL_UPDATE_PROFESSOR',
  DELETE_PROFESSOR: 'professor/DELETE_PROFESSOR',
  RESET: 'professor/RESET',
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IProfessor>,
  entity: defaultValue,
  updating: false,
  totalItems: 0,
  updateSuccess: false,
};

export type ProfessorState = Readonly<typeof initialState>;

// Reducer

export default (state: ProfessorState = initialState, action): ProfessorState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_PROFESSOR_LIST):
    case REQUEST(ACTION_TYPES.FETCH_PROFESSOR):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true,
      };
    case REQUEST(ACTION_TYPES.CREATE_PROFESSOR):
    case REQUEST(ACTION_TYPES.UPDATE_PROFESSOR):
    case REQUEST(ACTION_TYPES.DELETE_PROFESSOR):
    case REQUEST(ACTION_TYPES.PARTIAL_UPDATE_PROFESSOR):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true,
      };
    case FAILURE(ACTION_TYPES.FETCH_PROFESSOR_LIST):
    case FAILURE(ACTION_TYPES.FETCH_PROFESSOR):
    case FAILURE(ACTION_TYPES.CREATE_PROFESSOR):
    case FAILURE(ACTION_TYPES.UPDATE_PROFESSOR):
    case FAILURE(ACTION_TYPES.PARTIAL_UPDATE_PROFESSOR):
    case FAILURE(ACTION_TYPES.DELETE_PROFESSOR):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload,
      };
    case SUCCESS(ACTION_TYPES.FETCH_PROFESSOR_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data,
        totalItems: parseInt(action.payload.headers['x-total-count'], 10),
      };
    case SUCCESS(ACTION_TYPES.FETCH_PROFESSOR):
      return {
        ...state,
        loading: false,
        entity: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.CREATE_PROFESSOR):
    case SUCCESS(ACTION_TYPES.UPDATE_PROFESSOR):
    case SUCCESS(ACTION_TYPES.PARTIAL_UPDATE_PROFESSOR):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.DELETE_PROFESSOR):
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

const apiUrl = 'api/professors';

// Actions

export const getEntities: ICrudGetAllAction<IProfessor> = (page, size, sort) => {
  const requestUrl = `${apiUrl}${sort ? `?page=${page}&size=${size}&sort=${sort}` : ''}`;
  return {
    type: ACTION_TYPES.FETCH_PROFESSOR_LIST,
    payload: axios.get<IProfessor>(`${requestUrl}${sort ? '&' : '?'}cacheBuster=${new Date().getTime()}`),
  };
};

export const getEntity: ICrudGetAction<IProfessor> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_PROFESSOR,
    payload: axios.get<IProfessor>(requestUrl),
  };
};

export const createEntity: ICrudPutAction<IProfessor> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_PROFESSOR,
    payload: axios.post(apiUrl, cleanEntity(entity)),
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<IProfessor> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_PROFESSOR,
    payload: axios.put(`${apiUrl}/${entity.id}`, cleanEntity(entity)),
  });
  return result;
};

export const partialUpdate: ICrudPutAction<IProfessor> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.PARTIAL_UPDATE_PROFESSOR,
    payload: axios.patch(`${apiUrl}/${entity.id}`, cleanEntity(entity)),
  });
  return result;
};

export const deleteEntity: ICrudDeleteAction<IProfessor> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_PROFESSOR,
    payload: axios.delete(requestUrl),
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET,
});
