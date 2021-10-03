import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-headerpages',
  templateUrl: './headerpages.component.html',
  styleUrls: ['./headerpages.component.scss'],
})
export class HeaderpagesComponent implements OnInit {
  @Input() textTitle = '';
  private _textBody!: string;

  get texBody(): string {
    return this._textBody;
  }

  @Input()
  set textBody(value: string) {
    this.textBodyComplete = `<span class="iconTitleHeaderPages"></span>${value}`;
  }

  textBodyDefault = `Recuerda que los campos marcados con <span class="text-danger">*</span> son obligatorios.`;
  textBodyComplete = `<span class="iconTitleHeaderPages"></span>${this.textBodyDefault}`;

  constructor() {}

  ngOnInit(): void {}
}
