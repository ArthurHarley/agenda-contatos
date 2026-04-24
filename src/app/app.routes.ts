import { Routes } from '@angular/router';
import { Registros } from './registros/registros';
import { NovoContato } from './novo-contato/novo-contato';

export const routes: Routes = [
    { path: '', redirectTo: '/registros', pathMatch: 'full' },
    { path: 'registros', component: Registros },
    { path: 'novo-contato', component: NovoContato }
];