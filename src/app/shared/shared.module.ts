import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { NotificationsToastsComponent } from './components/notifications-toasts/notifications-toasts.component';
import { RouterModule } from '@angular/router';
import { HeaderpagesComponent } from './components/headerpages/headerpages.component';
import { BreadcrumbsComponent } from './components/breadcrumbs/breadcrumbs.component';
import { ModalComponent } from './components/modal/modal.component';
import { PaginatorComponent } from './components/paginator/paginator.component';
import { JwPaginationModule } from 'jw-angular-pagination';

@NgModule({
  declarations: [
    HeaderComponent,
    NavBarComponent,
    NotificationsToastsComponent,
    HeaderpagesComponent,
    BreadcrumbsComponent,
    ModalComponent,
    PaginatorComponent,
  ],
  imports: [CommonModule, RouterModule, JwPaginationModule],
  exports: [
    HeaderComponent,
    NavBarComponent,
    NotificationsToastsComponent,
    HeaderpagesComponent,
    BreadcrumbsComponent,
    ModalComponent,
    PaginatorComponent,
  ],
})
export class SharedModule {}
