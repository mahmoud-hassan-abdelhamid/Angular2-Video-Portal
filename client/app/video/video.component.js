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
var index_1 = require('../_services/index');
var router_1 = require('@angular/router');
var VideoComponent = (function () {
    function VideoComponent(videoService, alertService, route) {
        this.videoService = videoService;
        this.alertService = alertService;
        this.route = route;
    }
    //initialize the video
    VideoComponent.prototype.ngOnInit = function () {
        this.video = this.appendVideoFields(this.route.snapshot.data['video']);
    };
    //function to get the video by the url id
    VideoComponent.prototype.initVideo = function () {
        var _this = this;
        this.videoService.getById(this.videoId)
            .subscribe(function (video) {
            _this.video = _this.appendVideoFields(video);
        }, function (error) {
            //error occured
            _this.alertService.error(error);
        });
    };
    //function called when user rate a video
    VideoComponent.prototype.ratingComponetClick = function (clickObj) {
        var _this = this;
        this.videoService.rateVideo(clickObj.itemId, clickObj.rating)
            .subscribe(function (video) {
            _this.video.ratings = video.ratings;
        }, function (error) {
            //error occured
            _this.alertService.error(error);
        });
    };
    //calcolating the overall rating and append the result to the video object
    VideoComponent.prototype.appendVideoFields = function (video) {
        if (video) {
            var rating = 0;
            for (var counter = 0; counter < video.ratings.length; counter++) {
                rating += video.ratings[counter];
            }
            rating = rating / video.ratings.length;
            video.rating = Math.round(rating);
            return video;
        }
        return undefined;
    };
    VideoComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            templateUrl: 'video.component.html',
        }), 
        __metadata('design:paramtypes', [index_1.VideoService, index_1.AlertService, router_1.ActivatedRoute])
    ], VideoComponent);
    return VideoComponent;
}());
exports.VideoComponent = VideoComponent;
//# sourceMappingURL=video.component.js.map