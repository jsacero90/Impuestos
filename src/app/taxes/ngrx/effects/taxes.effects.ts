import { Injectable } from '@angular/core';
import { TaxesService } from '../../services/taxes.service';
import { loadTaxes } from '../taxes.actions';

import { Actions, ofType, createEffect } from '@ngrx/effects';
import { switchMap, mergeMap } from 'rxjs/operators';
import { TaxesDataModel } from '../../models/taxes.model';

@Injectable()
export class TaxesEffects {
  public dataTaxes!: TaxesDataModel;

  constructor(private actions$: Actions, private taxesService: TaxesService) {}

  /* loadTaxesRequest = createEffect(() =>
    this.actions$.pipe(
      ofType(loadTaxes),
      switchMap(() => {
        return this.taxesService
          .getAllData()
          .pipe(mergeMap((taxes) => loadTaxes({ taxes })));
      })
    )
  ); */
}
