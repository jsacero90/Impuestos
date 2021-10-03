import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import sections from '../../../../assets/json/panels/admon.json';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styles: [],
})
export class AdminComponent implements OnInit {
  textBody =
    'En esta sección podrás parametrizar y configurar el Portal de Impuestos.';

  section: Array<any> = [];

  constructor(private route: Router) {}

  ngOnInit(): void {
    this.section = sections;
  }

  target(ruta: string) {
    this.route.navigate([ruta]);
  }
}
