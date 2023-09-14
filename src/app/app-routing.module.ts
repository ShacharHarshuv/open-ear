import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { SandboxComponent } from './sandbox/sandbox.component';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () =>
      import('./home/home.module').then((m) => m.HomePageModule),
  },
  {
    path: 'about',
    loadChildren: () => import('./about/routes').then((m) => m.routes),
  },
  {
    path: 'exercise/:id',
    loadChildren: () =>
      import('./exercise/exercise-routing.module').then(
        (m) => m.ExerciseRoutingModule
      ),
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

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
