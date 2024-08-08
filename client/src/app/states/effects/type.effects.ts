import { TypeService } from './../../services/type.service';
// effects.ts
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap, tap } from 'rxjs/operators';
import { of } from 'rxjs';
import * as EtypeActions from '../actions/type.actions';


@Injectable()
export class EtypeEffects {
  constructor(private actions$: Actions, private typeService: TypeService) {}

  loadEtypes$ = createEffect(() =>
    this.actions$.pipe(
      ofType(EtypeActions.loadEtypes),
      mergeMap((action) =>
        this.typeService.getAllTypes(action.page).pipe(
          map(({types,page}) => EtypeActions.loadEtypesSuccess({ etypes:types,page })),
          catchError(error => of(EtypeActions.loadEtypesFailure({ error }))),
        ),
      ),
    ),
  );

  addEtype$ = createEffect(() =>
    this.actions$.pipe(
      ofType(EtypeActions.addEtype),
      mergeMap(action =>
        this.typeService.createType(action.etype).pipe(
          map(etype => EtypeActions.addEtypeSuccess({ etype })),
          catchError(error => of(EtypeActions.addEtypeFailure({ error }))),
        ),
      ),
    ),
  );

  updateEtype$ = createEffect(() =>
    this.actions$.pipe(
      ofType(EtypeActions.updateEtype),
      mergeMap(action =>
        this.typeService.updateType(action.id, action.etype).pipe(
          map(etype => EtypeActions.updateEtypeSuccess({ etype })),
          catchError(error => of(EtypeActions.updateEtypeFailure({ error }))),
        ),
      ),
    ),
  );

  deleteEtype$ = createEffect(() =>
    this.actions$.pipe(
      ofType(EtypeActions.deleteEtype),
      mergeMap(action =>
        this.typeService.deleteType(action.id).pipe(
          map(() => EtypeActions.deleteEtypeSuccess({ id: action.id })),
          catchError(error => of(EtypeActions.deleteEtypeFailure({ error }))),
        ),
      ),
    ),
  );
}
