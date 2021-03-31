import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { ITipoSolicitacao, defaultValue } from 'app/shared/model/tipo-solicitacao.model';

export const ACTION_TYPES = {
  FETCH_TIPOSOLICITACAO_LIST: 'tipoSolicitacao/FETCH_TIPOSOLICITACAO_LIST',
  FETCH_TIPOSOLICITACAO: 'tipoSolicitacao/FETCH_TIPOSOLICITACAO',
  CREATE_TIPOSOLICITACAO: 'tipoSolicitacao/CREATE_TIPOSOLICITACAO',
  UPDATE_TIPOSOLICITACAO: 'tipoSolicitacao/UPDATE_TIPOSOLICITACAO',
  PARTIAL_UPDATE_TIPOSOLICITACAO: 'tipoSolicitacao/PARTIAL_UPDATE_TIPOSOLICITACAO',
  DELETE_TIPOSOLICITACAO: 'tipoSolicitacao/DELETE_TIPOSOLICITACAO',
  RESET: 'tipoSolicitacao/RESET',
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<ITipoSolicitacao>,
  entity: defaultValue,
  updating: false,
  totalItems: 0,
  updateSuccess: false,
};

export type TipoSolicitacaoState = Readonly<typeof initialState>;

// Reducer

export default (state: TipoSolicitacaoState = initialState, action): TipoSolicitacaoState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_TIPOSOLICITACAO_LIST):
    case REQUEST(ACTION_TYPES.FETCH_TIPOSOLICITACAO):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true,
      };
    case REQUEST(ACTION_TYPES.CREATE_TIPOSOLICITACAO):
    case REQUEST(ACTION_TYPES.UPDATE_TIPOSOLICITACAO):
    case REQUEST(ACTION_TYPES.DELETE_TIPOSOLICITACAO):
    case REQUEST(ACTION_TYPES.PARTIAL_UPDATE_TIPOSOLICITACAO):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true,
      };
    case FAILURE(ACTION_TYPES.FETCH_TIPOSOLICITACAO_LIST):
    case FAILURE(ACTION_TYPES.FETCH_TIPOSOLICITACAO):
    case FAILURE(ACTION_TYPES.CREATE_TIPOSOLICITACAO):
    case FAILURE(ACTION_TYPES.UPDATE_TIPOSOLICITACAO):
    case FAILURE(ACTION_TYPES.PARTIAL_UPDATE_TIPOSOLICITACAO):
    case FAILURE(ACTION_TYPES.DELETE_TIPOSOLICITACAO):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload,
      };
    case SUCCESS(ACTION_TYPES.FETCH_TIPOSOLICITACAO_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data,
        totalItems: parseInt(action.payload.headers['x-total-count'], 10),
      };
    case SUCCESS(ACTION_TYPES.FETCH_TIPOSOLICITACAO):
      return {
        ...state,
        loading: false,
        entity: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.CREATE_TIPOSOLICITACAO):
    case SUCCESS(ACTION_TYPES.UPDATE_TIPOSOLICITACAO):
    case SUCCESS(ACTION_TYPES.PARTIAL_UPDATE_TIPOSOLICITACAO):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.DELETE_TIPOSOLICITACAO):
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

const apiUrl = 'api/tipo-solicitacaos';

// Actions

export const getEntities: ICrudGetAllAction<ITipoSolicitacao> = (page, size, sort) => {
  const requestUrl = `${apiUrl}${sort ? `?page=${page}&size=${size}&sort=${sort}` : ''}`;
  return {
    type: ACTION_TYPES.FETCH_TIPOSOLICITACAO_LIST,
    payload: axios.get<ITipoSolicitacao>(`${requestUrl}${sort ? '&' : '?'}cacheBuster=${new Date().getTime()}`),
  };
};

export const getEntity: ICrudGetAction<ITipoSolicitacao> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_TIPOSOLICITACAO,
    payload: axios.get<ITipoSolicitacao>(requestUrl),
  };
};

export const createEntity: ICrudPutAction<ITipoSolicitacao> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_TIPOSOLICITACAO,
    payload: axios.post(apiUrl, cleanEntity(entity)),
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<ITipoSolicitacao> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_TIPOSOLICITACAO,
    payload: axios.put(`${apiUrl}/${entity.id}`, cleanEntity(entity)),
  });
  return result;
};

export const partialUpdate: ICrudPutAction<ITipoSolicitacao> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.PARTIAL_UPDATE_TIPOSOLICITACAO,
    payload: axios.patch(`${apiUrl}/${entity.id}`, cleanEntity(entity)),
  });
  return result;
};

export const deleteEntity: ICrudDeleteAction<ITipoSolicitacao> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_TIPOSOLICITACAO,
    payload: axios.delete(requestUrl),
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET,
});
