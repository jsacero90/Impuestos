import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root',
})
export class AlertsService {
  constructor() {}

  createLoading(
    title = 'Cargando...',
    subTitle = 'Por favor espera un momento.'
  ) {
    Swal.fire({
      showConfirmButton: false,
      allowOutsideClick: false,
      backdrop: 'rgba(54, 71, 99, 0.6)',
      width: 279,
      html: `<div class="row ps-2 pe-0 py-0 mt-1">
      <div class="col-2 p-2 m-0 container-swal-loading">
      <div class="icon-swal-loading"></div>
      </div>
      <div class="col-10 p-0 m-0">
          <h6 class="sub-title-1 text-ligth-blue text-start">${title}</h6>
          <p class="text-explicative text-neutro-tipografic text-start">${subTitle}</p>
        </div>
    </div>`,
    });
    document
      .querySelector('#swal2-html-container')
      ?.classList.add('swal2-html-container-customer');

    document
      .querySelector('.swal2-popup')
      ?.classList.add('swal2-popup-customer');
  }

  async modalAccept() {
    try {
      return Swal.fire({
        html: `<h1 class="mt-2 headline-4 text-corporate-occidente-dark">¿Deseas confirmar está acción?</h1>`,
        showCancelButton: true,
        width: 507,
        backdrop: 'rgba(54, 71, 99, 0.6)',
        buttonsStyling: false,
        reverseButtons: true,
        returnInputValueOnDeny: true,
        allowOutsideClick: false,
        cancelButtonText: 'Cancelar',
        confirmButtonText: 'Aceptar',

        customClass: {
          confirmButton: 'btn btn-primary btn-accept-custom ms-4',
          cancelButton: 'btn btn-secondary btn-accept-custom',
          container: 'swal2-html-container-customer-accept',
          popup: 'swal2-popup-customer-accept',
        },
      }).then((result) => {
        return result.isConfirmed ? true : false;
      });
    } catch (error) {
      return 'error creando alert';
    }
  }

  closeSwal() {
    Swal.close();
  }
}
