import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { debounceTime } from 'rxjs/operators';

import { AlertsService } from '../../../shared/services/alerts.service';
import { ParamsConceptsService } from '../../services/params-concepts.service';

import { Store } from '@ngrx/store';
import { AppStateWithConceptsList } from '../../ngrx/params-concepts.reducer';
import * as conceptActions from '../../ngrx/params-concepts.actions';

import { ParamsConceptsDataClass } from '../../models/params-concepts.model';

@Component({
  selector: 'app-params-concepts-filter',
  templateUrl: './params-concepts-filter.component.html',
  styleUrls: ['./params-concepts-filter.component.scss'],
})
export class ParamsConceptsFilterComponent implements OnInit {
  forma!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private alertsService: AlertsService,
    private store: Store<AppStateWithConceptsList>,
    private paramsConceptsService: ParamsConceptsService
  ) {}

  ngOnInit(): void {
    this.createForm();
    this.setPetitionHttp();
  }

  createForm() {
    this.forma = this.fb.group({
      codeConcept: ['', [Validators.required]],
    });
  }

  get codeConceptInValid() {
    return (
      this.forma.get('codeConcept')?.invalid &&
      this.forma.get('codeConcept')?.touched
    );
  }

  get codeConceptValid() {
    return (
      this.forma.get('codeConcept')?.valid &&
      this.forma.get('codeConcept')?.touched
    );
  }

  setPetitionHttp() {
    this.forma
      .get('codeConcept')
      ?.valueChanges.pipe(debounceTime(1500))
      .subscribe((data) => {
        if (data === '') {
          return;
        }
        this.alertsService.createLoading();
        this.getServiceListConcepts();
      });
  }

  getServiceListConcepts() {
    this.paramsConceptsService
      .getConcepts({
        conceptCode: parseInt(this.forma.get('codeConcept')?.value),
      })
      ?.subscribe(({ data }) => this.loadDateStore(data));
  }

  loadDateStore(data: ParamsConceptsDataClass[]) {
    if (!data) {
      this.alertsService.closeSwal();
      console.error('Error al consultar oficinas');
      // TODO: crear notificación error al traer data

      return;
    }
    this.store.dispatch(conceptActions.resetParamsConcepts());
    this.store.dispatch(
      conceptActions.loadParamsConcepts({ conceptsList: data })
    );
    this.alertsService.closeSwal();
  }

  clear() {
    this.forma.reset();
  }
}
