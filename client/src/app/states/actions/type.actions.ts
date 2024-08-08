// actions.ts
import { createAction, props } from '@ngrx/store';
import { Etype } from '../../model/etypeModel';
import { Page } from '../../model/pageModel';

export const loadEtypes = createAction('[Etype] Load Etypes',props<{page:number}>());
export const loadEtypesSuccess = createAction('[Etype] Load Etypes Success', props<{ etypes: any[],page:Page }>());
export const loadEtypesFailure = createAction('[Etype] Load Etypes Failure', props<{ error: any }>());

export const addEtype = createAction('[Etype] Add Etype', props<{ etype: any }>());
export const addEtypeSuccess = createAction('[Etype] Add Etype Success', props<{ etype: any }>());
export const addEtypeFailure = createAction('[Etype] Add Etype Failure', props<{ error: any }>());

export const updateEtype = createAction('[Etype] Update Etype', props<{ id: string; etype: any }>());
export const updateEtypeSuccess = createAction('[Etype] Update Etype Success', props<{ etype: any }>());
export const updateEtypeFailure = createAction('[Etype] Update Etype Failure', props<{ error: any }>());

export const deleteEtype = createAction('[Etype] Delete Etype', props<{ id: string }>());
export const deleteEtypeSuccess = createAction('[Etype] Delete Etype Success', props<{ id: string }>());
export const deleteEtypeFailure = createAction('[Etype] Delete Etype Failure', props<{ error: any }>());
