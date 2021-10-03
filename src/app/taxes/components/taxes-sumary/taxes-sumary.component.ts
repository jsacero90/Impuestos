import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Tax, TaxCategory, TaxesDataModel } from '../../models/taxes.model';
import { AppStateWithTaxe } from '../../ngrx/taxes.reducer';

@Component({
  selector: 'app-taxes-sumary',
  templateUrl: './taxes-sumary.component.html',
  styleUrls: ['./taxes-sumary.component.scss'],
})
export class TaxesSumaryComponent implements OnInit {


  constructor(private store: Store<AppStateWithTaxe>) {}

  @Input() taxDate!: TaxCategory;
  ngOnInit(): void {

  }

}
