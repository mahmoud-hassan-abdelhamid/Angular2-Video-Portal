import { Injectable } from '@angular/core';
import { Http, Headers, Response, URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';
import { NavService } from './nav.service';

@Injectable()
export class AuthenticationService {
    constructor(private http: Http, private navService: NavService) { }

    login(username: string, password: string) {
        var headers = new Headers();
        headers.append('Content-Type', 'application/json');

        return this.http.post('/user/auth', JSON.stringify({ username: username, password: password }), { headers })
            .map(res => res.json())
            .catch(this.handleError);
    }

    logout() {
        // remove user from local storage to log user out
        var currentUser=JSON.parse(localStorage.getItem('currentUser'));
        if(currentUser){
            var sessionId=currentUser.sessionId;
            let params: URLSearchParams = new URLSearchParams();
            params.set('sessionId',sessionId);
            return this.http.get('/user/logout',{search: params})
                .map(response => response.json())
                .catch(this.handleError)
                .subscribe(res=>{
                    localStorage.removeItem('currentUser');
                    this.navService.logout();
                })

        }

    }

    //custom error handler
    private handleError(error: Response){
        return Observable.throw(error.json().error || 'Server error');

    }

}