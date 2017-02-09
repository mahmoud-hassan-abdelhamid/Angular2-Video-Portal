import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }    from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AppComponent }  from './app.component';
import { routing }        from './app.routing';
import { AlertComponent, NavComponent } from './_directives/index';
import { AuthGuard } from './_guards/index';
import { AlertService, AuthenticationService, VideoService, NavService } from './_services/index';
import { HomeComponent } from './home/index';
import { LoginComponent } from './login/index';
import { VideoComponent } from './video/index';
import { RatingComponent } from './rating/index';
import { TruncatePipe } from './truncate';
import { VideoResolver } from './_resolvers/index';

@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule,
        routing
    ],
    declarations: [
        AppComponent,
        AlertComponent,
        HomeComponent,
        LoginComponent,
        VideoComponent,
        RatingComponent,
        NavComponent,
        TruncatePipe,
    ],
    providers: [
        AuthGuard,
        AlertService,
        AuthenticationService,
        VideoService,
        NavService,
        VideoResolver,
    ],
    bootstrap: [AppComponent]
})

export class AppModule { }