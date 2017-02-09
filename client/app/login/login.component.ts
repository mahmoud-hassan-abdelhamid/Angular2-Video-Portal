import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { md5 } from '../md5';

import { AlertService, AuthenticationService, NavService } from '../_services/index';

@Component({
    moduleId: module.id,
    templateUrl: 'login.component.html'
})

export class LoginComponent implements OnInit {
    model: any = {};
    loading = false;
    returnUrl: string;

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private authenticationService: AuthenticationService,
        private alertService: AlertService,
        private navService: NavService
        ) { }

    ngOnInit() {
        // reset login status
        this.authenticationService.logout();

        // get return url from route parameters or default to '/'
        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    }

    login() {
        this.loading = true;
        this.authenticationService.login(this.model.username, md5(this.model.password))
            .subscribe(
                res => {
                    if(res && res.sessionId){
                        //user succefully logged in
                        this.loading = false;
                        localStorage.setItem('currentUser', JSON.stringify(res));
                        this.navService.success(res);
                        this.router.navigate([this.returnUrl]);
                    }
                    else if(res && res.error){
                        //error returned
                        this.loading = false; 
                        this.alertService.error(res.error);
                    }
                },
                error => {
                    //error occured
                    this.alertService.error(error);
                    this.loading = false;
                });
    }
}
