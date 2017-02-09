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
var HomeComponent = (function () {
    function HomeComponent(videoService, alertService) {
        this.videoService = videoService;
        this.alertService = alertService;
        this.videos = [];
    }
    //When play a video pause other video
    HomeComponent.prototype.ngAfterViewChecked = function () {
        var videos = document.getElementsByClassName('video');
        function stopOthers() {
            var id = this.id, i = 0;
            for (var j = videos.length; i < j; i++) {
                if (videos[i].id !== id) {
                    videos[i].pause();
                }
            }
        }
        var i = 0;
        for (var j = videos.length; i < j; i++) {
            videos[i].addEventListener("play", stopOthers, false);
        }
    };
    HomeComponent.prototype.ngOnInit = function () {
        this.initVideos();
    };
    //get the first 10 videos
    HomeComponent.prototype.initVideos = function () {
        var _this = this;
        this.videoService.loadVideos('0')
            .subscribe(function (videos) {
            _this.videos = videos;
        }, function (error) {
            //error occured
            _this.alertService.error(error);
        });
    };
    //load additional 10 videos
    HomeComponent.prototype.loadMore = function () {
        var _this = this;
        this.videoService.loadVideos(this.videos.length)
            .subscribe(function (videos) {
            _this.videos = _this.videos.concat(videos);
        }, function (error) {
            //error occured
            _this.alertService.error(error);
        });
    };
    //function to rate a video
    HomeComponent.prototype.ratingComponetClick = function (clickObj) {
        var _this = this;
        this.videoService.rateVideo(clickObj.itemId, clickObj.rating)
            .subscribe(function (video) {
            for (var counter = 0; counter < _this.videos.length; counter++) {
                if (_this.videos[counter]._id == video._id) {
                    _this.videos[counter].ratings = video.ratings;
                    break;
                }
            }
        }, function (error) {
            //error occured
            _this.alertService.error(error);
        });
    };
    //calculate the overall video rating from the rating array and append it to video object
    HomeComponent.prototype.videoOverallRating = function (index, video) {
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
    HomeComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            templateUrl: 'home.component.html',
        }), 
        __metadata('design:paramtypes', [index_1.VideoService, index_1.AlertService])
    ], HomeComponent);
    return HomeComponent;
}());
exports.HomeComponent = HomeComponent;
//# sourceMappingURL=home.component.js.map