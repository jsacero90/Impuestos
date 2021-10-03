import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-taxes-preview-make',
  templateUrl: './taxes-preview-make.component.html',
  styleUrls: ['./taxes-preview-make.component.scss'],
})
export class TaxesPreviewMakeComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {
    //this.store.dispatch(actionsTaxes.loadTaxes({ dataTaxes: this.dataTaxes }));
  }
}
