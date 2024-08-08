// reducer.ts
import { createReducer, on } from '@ngrx/store';
import * as EtypeActions from '../actions/type.actions';
import { Page } from '../../model/pageModel';

export interface AppState {

  etypes: any[];
  error: any;
  page?: Page
}

export const initialState: AppState = {

  etypes: [],
  error: null,
};

export const etypeReducer = createReducer(
  initialState,
  on(EtypeActions.loadEtypesSuccess, (state, { etypes, page }) => ({ ...state, etypes, page: page })),
  on(EtypeActions.loadEtypesFailure, (state, { error }) => ({ ...state, error })),
  on(EtypeActions.addEtypeSuccess, (state, { etype }) => ({ ...state, etypes: [etype, ...state.etypes] })
    //   {
    //   const x = JSON.parse(JSON.stringify(state.etypes))
    //   x.pop()
    //   return ({ ...state, etypes: [etype,...x],page: {...state.page, totalTypes:state.page.totalTypes  + 1} })
    // }
  ),
  on(EtypeActions.addEtypeFailure, (state, { error }) => ({ ...state, error })),
  on(EtypeActions.updateEtypeSuccess, (state, { etype }) => ({
    ...state,
    etypes: state.etypes.map(e => (e._id === etype._id ? etype : e)),
  })),
  on(EtypeActions.updateEtypeFailure, (state, { error }) => ({ ...state, error })),
  on(EtypeActions.deleteEtypeSuccess, (state, { id }) => ({
    ...state,
    etypes: state.etypes.filter(etype => etype._id !== id),
  })),
  on(EtypeActions.deleteEtypeFailure, (state, { error }) => ({ ...state, error })),
);
