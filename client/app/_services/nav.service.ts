import { Injectable } from '@angular/core';
import { Router, NavigationStart } from '@angular/router';
import { Observable } from 'rxjs';
import { Subject } from 'rxjs/Subject';
import { User } from '../_models/index';

@Injectable()
export class NavService {
    private subject = new Subject<any>();
    private keepAfterNavigationChange = true;

    constructor(private router: Router) {
        router.events.subscribe(event => {
            if (event instanceof NavigationStart) {
                if (this.keepAfterNavigationChange) {
                    this.keepAfterNavigationChange = true;
                } else {
                    this.subject.next();
                }
            }
        });
    }

    success(user: User, keepAfterNavigationChange = true) {
        //show nav when successfully loggedin
        this.keepAfterNavigationChange = keepAfterNavigationChange;
        this.subject.next(user);
    }

    logout() {
        //hide nav when logout
        this.keepAfterNavigationChange = false;
        this.subject.next();
    }

    getUser(): Observable<any> {
        return this.subject.asObservable();
    }
}