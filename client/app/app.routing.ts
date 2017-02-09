import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/index';
import { LoginComponent } from './login/index';
import { VideoComponent } from './video/index';
import { AuthGuard } from './_guards/index';
import { VideoResolver } from './_resolvers/index'

const appRoutes: Routes = [
    { path: '', component: HomeComponent, canActivate: [AuthGuard] },
    { path: 'videos', component: VideoComponent, canActivate: [AuthGuard] },
    { path: 'video/:id', component: VideoComponent, canActivate: [AuthGuard], resolve:{video:VideoResolver}  },
    { path: 'login', component: LoginComponent },
    
    // otherwise redirect to home
    { path: '**', redirectTo: '' }
];

export const routing = RouterModule.forRoot(appRoutes);