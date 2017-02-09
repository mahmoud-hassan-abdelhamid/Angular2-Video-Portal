"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var http_1 = require('@angular/http');
var Observable_1 = require('rxjs/Observable');
require('rxjs/Rx');
var nav_service_1 = require('./nav.service');
var AuthenticationService = (function () {
    function AuthenticationService(http, navService) {
        this.http = http;
        this.navService = navService;
    }
    AuthenticationService.prototype.login = function (username, password) {
        var headers = new http_1.Headers();
        headers.append('Content-Type', 'application/json');
        return this.http.post('/user/auth', JSON.stringify({ username: username, password: password }), { headers: headers })
            .map(function (res) { return res.json(); })
            .catch(this.handleError);
    };
    AuthenticationService.prototype.logout = function () {
        var _this = this;
        // remove user from local storage to log user out
        var currentUser = JSON.parse(localStorage.getItem('currentUser'));
        if (currentUser) {
            var sessionId = currentUser.sessionId;
            var params = new http_1.URLSearchParams();
            params.set('sessionId', sessionId);
            return this.http.get('/user/logout', { search: params })
                .map(function (response) { return response.json(); })
                .catch(this.handleError)
                .subscribe(function (res) {
                localStorage.removeItem('currentUser');
                _this.navService.logout();
            });
        }
    };
    //custom error handler
    AuthenticationService.prototype.handleError = function (error) {
        return Observable_1.Observable.throw(error.json().error || 'Server error');
    };
    AuthenticationService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http, nav_service_1.NavService])
    ], AuthenticationService);
    return AuthenticationService;
}());
exports.AuthenticationService = AuthenticationService;
//# sourceMappingURL=authentication.service.js.map