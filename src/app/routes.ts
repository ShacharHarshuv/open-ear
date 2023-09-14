import { Routes } from '@angular/router';
import { SandboxComponent } from './sandbox/sandbox.component';

export const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/routes').then((m) => m.routes),
  },
  {
    path: 'about',
    loadChildren: () => import('./about/routes').then((m) => m.routes),
  },
  {
    path: 'exercise/:id',
    loadChildren: () => import('./exercise/routes').then((m) => m.routes),
  },
  {
    path: 'sandbox',
    component: SandboxComponent,
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
];
