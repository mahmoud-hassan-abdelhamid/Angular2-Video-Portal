"use strict";
var router_1 = require('@angular/router');
var index_1 = require('./home/index');
var index_2 = require('./login/index');
var index_3 = require('./video/index');
var index_4 = require('./_guards/index');
var index_5 = require('./_resolvers/index');
var appRoutes = [
    { path: '', component: index_1.HomeComponent, canActivate: [index_4.AuthGuard] },
    { path: 'videos', component: index_3.VideoComponent, canActivate: [index_4.AuthGuard] },
    { path: 'video/:id', component: index_3.VideoComponent, canActivate: [index_4.AuthGuard], resolve: { video: index_5.VideoResolver } },
    { path: 'login', component: index_2.LoginComponent },
    // otherwise redirect to home
    { path: '**', redirectTo: '' }
];
exports.routing = router_1.RouterModule.forRoot(appRoutes);
//# sourceMappingURL=app.routing.js.map