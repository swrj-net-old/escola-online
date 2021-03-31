import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IGrade, defaultValue } from 'app/shared/model/grade.model';

export const ACTION_TYPES = {
  FETCH_GRADE_LIST: 'grade/FETCH_GRADE_LIST',
  FETCH_GRADE: 'grade/FETCH_GRADE',
  CREATE_GRADE: 'grade/CREATE_GRADE',
  UPDATE_GRADE: 'grade/UPDATE_GRADE',
  PARTIAL_UPDATE_GRADE: 'grade/PARTIAL_UPDATE_GRADE',
  DELETE_GRADE: 'grade/DELETE_GRADE',
  RESET: 'grade/RESET',
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IGrade>,
  entity: defaultValue,
  updating: false,
  totalItems: 0,
  updateSuccess: false,
};

export type GradeState = Readonly<typeof initialState>;

// Reducer

export default (state: GradeState = initialState, action): GradeState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_GRADE_LIST):
    case REQUEST(ACTION_TYPES.FETCH_GRADE):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true,
      };
    case REQUEST(ACTION_TYPES.CREATE_GRADE):
    case REQUEST(ACTION_TYPES.UPDATE_GRADE):
    case REQUEST(ACTION_TYPES.DELETE_GRADE):
    case REQUEST(ACTION_TYPES.PARTIAL_UPDATE_GRADE):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true,
      };
    case FAILURE(ACTION_TYPES.FETCH_GRADE_LIST):
    case FAILURE(ACTION_TYPES.FETCH_GRADE):
    case FAILURE(ACTION_TYPES.CREATE_GRADE):
    case FAILURE(ACTION_TYPES.UPDATE_GRADE):
    case FAILURE(ACTION_TYPES.PARTIAL_UPDATE_GRADE):
    case FAILURE(ACTION_TYPES.DELETE_GRADE):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload,
      };
    case SUCCESS(ACTION_TYPES.FETCH_GRADE_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data,
        totalItems: parseInt(action.payload.headers['x-total-count'], 10),
      };
    case SUCCESS(ACTION_TYPES.FETCH_GRADE):
      return {
        ...state,
        loading: false,
        entity: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.CREATE_GRADE):
    case SUCCESS(ACTION_TYPES.UPDATE_GRADE):
    case SUCCESS(ACTION_TYPES.PARTIAL_UPDATE_GRADE):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.DELETE_GRADE):
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

const apiUrl = 'api/grades';

// Actions

export const getEntities: ICrudGetAllAction<IGrade> = (page, size, sort) => {
  const requestUrl = `${apiUrl}${sort ? `?page=${page}&size=${size}&sort=${sort}` : ''}`;
  return {
    type: ACTION_TYPES.FETCH_GRADE_LIST,
    payload: axios.get<IGrade>(`${requestUrl}${sort ? '&' : '?'}cacheBuster=${new Date().getTime()}`),
  };
};

export const getEntity: ICrudGetAction<IGrade> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_GRADE,
    payload: axios.get<IGrade>(requestUrl),
  };
};

export const createEntity: ICrudPutAction<IGrade> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_GRADE,
    payload: axios.post(apiUrl, cleanEntity(entity)),
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<IGrade> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_GRADE,
    payload: axios.put(`${apiUrl}/${entity.id}`, cleanEntity(entity)),
  });
  return result;
};

export const partialUpdate: ICrudPutAction<IGrade> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.PARTIAL_UPDATE_GRADE,
    payload: axios.patch(`${apiUrl}/${entity.id}`, cleanEntity(entity)),
  });
  return result;
};

export const deleteEntity: ICrudDeleteAction<IGrade> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_GRADE,
    payload: axios.delete(requestUrl),
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET,
});
