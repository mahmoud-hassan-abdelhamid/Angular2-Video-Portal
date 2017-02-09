import { Component, OnInit } from '@angular/core';
import { Video } from '../_models/index';
import { VideoService, AlertService } from '../_services/index';
import {TruncatePipe} from '../truncate';
import {RatingComponent} from '../rating/index';

declare var jQuery:any;
declare var pause:any;

@Component({
    moduleId: module.id,
    templateUrl: 'home.component.html',
})

export class HomeComponent implements OnInit {
    videos: Video[] = [];

    constructor(private videoService: VideoService, private alertService: AlertService) {}

//When play a video pause other video
    ngAfterViewChecked (){
        var videos = document.getElementsByClassName('video');
        function stopOthers () {
            var id = this.id, i = 0;
            for (var j = videos.length; i < j; i++) {
                if (videos[i].id !== id) {
                    (<any>videos[i]).pause();
                }
            }
        }
        var i = 0;
        for (var j = videos.length; i < j; i++) {
            videos[i].addEventListener("play", stopOthers, false);
        }
    }

    ngOnInit() {
        this.initVideos();
    }

    //get the first 10 videos
    private initVideos() {
        this.videoService.loadVideos('0')
            .subscribe(
                videos=>{
                    this.videos = videos;
                },
                error => {
                    //error occured
                    this.alertService.error(error);
                }
            );
    }

    //load additional 10 videos
    loadMore(){
        this.videoService.loadVideos(this.videos.length)
            .subscribe(
                videos=>{
                    this.videos=this.videos.concat(videos);
                },
                error => {
                    //error occured
                    this.alertService.error(error);
                }
            );
    }

//function to rate a video
   ratingComponetClick(clickObj: any): void {
       this.videoService.rateVideo(clickObj.itemId,clickObj.rating)
            .subscribe(
                video=>{ 
                    for(var counter=0;counter<this.videos.length;counter++){
                        if(this.videos[counter]._id == video._id){
                            this.videos[counter].ratings=video.ratings;
                            break;  
                        }
                    }
                },
                error => {
                    //error occured
                    this.alertService.error(error);
                }
            )    
    }

//calculate the overall video rating from the rating array and append it to video object
    videoOverallRating(index, video) {
        if(video){
            var rating=0;
            for(var counter=0;counter<video.ratings.length;counter++){
                rating+=video.ratings[counter]; 
            }
            rating=rating/video.ratings.length;
            video.rating= Math.round(rating);
            return video;
        }
        return undefined;
    }
}