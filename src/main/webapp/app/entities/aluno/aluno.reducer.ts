import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IAluno, defaultValue } from 'app/shared/model/aluno.model';

export const ACTION_TYPES = {
  FETCH_ALUNO_LIST: 'aluno/FETCH_ALUNO_LIST',
  FETCH_ALUNO: 'aluno/FETCH_ALUNO',
  CREATE_ALUNO: 'aluno/CREATE_ALUNO',
  UPDATE_ALUNO: 'aluno/UPDATE_ALUNO',
  PARTIAL_UPDATE_ALUNO: 'aluno/PARTIAL_UPDATE_ALUNO',
  DELETE_ALUNO: 'aluno/DELETE_ALUNO',
  RESET: 'aluno/RESET',
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IAluno>,
  entity: defaultValue,
  updating: false,
  totalItems: 0,
  updateSuccess: false,
};

export type AlunoState = Readonly<typeof initialState>;

// Reducer

export default (state: AlunoState = initialState, action): AlunoState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_ALUNO_LIST):
    case REQUEST(ACTION_TYPES.FETCH_ALUNO):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true,
      };
    case REQUEST(ACTION_TYPES.CREATE_ALUNO):
    case REQUEST(ACTION_TYPES.UPDATE_ALUNO):
    case REQUEST(ACTION_TYPES.DELETE_ALUNO):
    case REQUEST(ACTION_TYPES.PARTIAL_UPDATE_ALUNO):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true,
      };
    case FAILURE(ACTION_TYPES.FETCH_ALUNO_LIST):
    case FAILURE(ACTION_TYPES.FETCH_ALUNO):
    case FAILURE(ACTION_TYPES.CREATE_ALUNO):
    case FAILURE(ACTION_TYPES.UPDATE_ALUNO):
    case FAILURE(ACTION_TYPES.PARTIAL_UPDATE_ALUNO):
    case FAILURE(ACTION_TYPES.DELETE_ALUNO):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload,
      };
    case SUCCESS(ACTION_TYPES.FETCH_ALUNO_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data,
        totalItems: parseInt(action.payload.headers['x-total-count'], 10),
      };
    case SUCCESS(ACTION_TYPES.FETCH_ALUNO):
      return {
        ...state,
        loading: false,
        entity: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.CREATE_ALUNO):
    case SUCCESS(ACTION_TYPES.UPDATE_ALUNO):
    case SUCCESS(ACTION_TYPES.PARTIAL_UPDATE_ALUNO):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.DELETE_ALUNO):
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

const apiUrl = 'api/alunos';

// Actions

export const getEntities: ICrudGetAllAction<IAluno> = (page, size, sort) => {
  const requestUrl = `${apiUrl}${sort ? `?page=${page}&size=${size}&sort=${sort}` : ''}`;
  return {
    type: ACTION_TYPES.FETCH_ALUNO_LIST,
    payload: axios.get<IAluno>(`${requestUrl}${sort ? '&' : '?'}cacheBuster=${new Date().getTime()}`),
  };
};

export const getEntity: ICrudGetAction<IAluno> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_ALUNO,
    payload: axios.get<IAluno>(requestUrl),
  };
};

export const createEntity: ICrudPutAction<IAluno> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_ALUNO,
    payload: axios.post(apiUrl, cleanEntity(entity)),
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<IAluno> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_ALUNO,
    payload: axios.put(`${apiUrl}/${entity.id}`, cleanEntity(entity)),
  });
  return result;
};

export const partialUpdate: ICrudPutAction<IAluno> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.PARTIAL_UPDATE_ALUNO,
    payload: axios.patch(`${apiUrl}/${entity.id}`, cleanEntity(entity)),
  });
  return result;
};

export const deleteEntity: ICrudDeleteAction<IAluno> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_ALUNO,
    payload: axios.delete(requestUrl),
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET,
});
