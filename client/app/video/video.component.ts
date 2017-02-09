import { Component, OnInit, OnDestroy  } from '@angular/core';
import { User,Video } from '../_models/index';
import { VideoService, AlertService } from '../_services/index';
import { RatingComponent } from '../rating/index';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Rx';

@Component({
    moduleId: module.id,
    templateUrl: 'video.component.html',
})

export class VideoComponent implements OnInit  {
    video: Video;
    videoId: string;
    private sub: any;

    constructor(private videoService: VideoService,private alertService: AlertService, private route: ActivatedRoute) {
    }

    //initialize the video
    ngOnInit() {
            this.video = this.appendVideoFields(this.route.snapshot.data['video']);
    }

    //function to get the video by the url id
     initVideo() {
        this.videoService.getById(this.videoId)
            .subscribe(
                video=>{ 
                    this.video=this.appendVideoFields(video);
                },
                error => {
                    //error occured
                    this.alertService.error(error);
                }
            );
    }

   //function called when user rate a video
   ratingComponetClick(clickObj: any): void {
       this.videoService.rateVideo(clickObj.itemId,clickObj.rating)
            .subscribe(
                video=>{ 
                        this.video.ratings=video.ratings;
                },
                error => {
                    //error occured
                    this.alertService.error(error);
                }
            ); 
    }
    //calcolating the overall rating and append the result to the video object
    private appendVideoFields(video) {
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