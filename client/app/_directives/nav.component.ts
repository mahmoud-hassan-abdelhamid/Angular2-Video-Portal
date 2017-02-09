import { Component, OnInit } from '@angular/core';
import { NavService } from '../_services/index';
import { User } from '../_models/index';

@Component({
    moduleId: module.id,
    selector: 'nav-bar',
    templateUrl: 'nav.component.html'
})

export class NavComponent implements OnInit {
    user: User;

    constructor(private navService: NavService) { }

    ngOnInit() {
        //show nav if user loggedin
        if(localStorage.getItem('currentUser')){
            this.user=JSON.parse(localStorage.getItem('currentUser'));   
        }
        this.navService.getUser()
                        .subscribe(user => { this.user = user;});

    }
}