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
var router_1 = require('@angular/router');
var Subject_1 = require('rxjs/Subject');
var NavService = (function () {
    function NavService(router) {
        var _this = this;
        this.router = router;
        this.subject = new Subject_1.Subject();
        this.keepAfterNavigationChange = true;
        router.events.subscribe(function (event) {
            if (event instanceof router_1.NavigationStart) {
                if (_this.keepAfterNavigationChange) {
                    _this.keepAfterNavigationChange = true;
                }
                else {
                    _this.subject.next();
                }
            }
        });
    }
    NavService.prototype.success = function (user, keepAfterNavigationChange) {
        if (keepAfterNavigationChange === void 0) { keepAfterNavigationChange = true; }
        //show nav when successfully loggedin
        this.keepAfterNavigationChange = keepAfterNavigationChange;
        this.subject.next(user);
    };
    NavService.prototype.logout = function () {
        //hide nav when logout
        this.keepAfterNavigationChange = false;
        this.subject.next();
    };
    NavService.prototype.getUser = function () {
        return this.subject.asObservable();
    };
    NavService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [router_1.Router])
    ], NavService);
    return NavService;
}());
exports.NavService = NavService;
//# sourceMappingURL=nav.service.js.map