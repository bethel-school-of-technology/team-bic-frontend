import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './shared/auth.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'loader',
    loadChildren: () => import('./pages/loader/loader.module').then( m => m.LoaderPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'register',
    loadChildren: () => import('./pages/register/register.module').then( m => m.RegisterPageModule)
  },
  {
    path: 'home',
    loadChildren: () => import('./pages/home/home.module').then( m => m.HomePageModule)
  },
  {
    path: 'workouts',
    loadChildren: () => import('./pages/workouts/workouts.module').then( m => m.WorkoutsPageModule)
  },
  {
    path: 'c-routine', // canActivate: [AuthGuard],
    loadChildren: () => import('./pages/create-routine/create-routine.module').then( m => m.CreateRoutinePageModule)
  },
  {
    path: 'v-routine',
    loadChildren: () => import('./pages/view-routine/view-routine.module').then( m => m.ViewRoutinePageModule)
  },
  {
    path: 'e-routine',
    loadChildren: () => import('./pages/edit-routine/edit-routine.module').then( m => m.EditRoutinePageModule)
  },
  {
    path: 'workout-list',
    loadChildren: () => import('./pages/workout-list/workout-list.module').then( m => m.WorkoutListPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
