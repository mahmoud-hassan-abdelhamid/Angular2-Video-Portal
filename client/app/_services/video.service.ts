import { Injectable } from '@angular/core';
import { Http, Response, URLSearchParams } from '@angular/http';
import 'rxjs/Rx';
import { Video } from '../_models/index';
import {Observable} from 'rxjs/Rx';

@Injectable()
export class VideoService {
    constructor(private http: Http) { }

    //function to send get request to load 10 videos starting from skip
    loadVideos(skip) {
        var currentUser=JSON.parse(localStorage.getItem('currentUser'));
        if(currentUser){
            var sessionId=currentUser.sessionId;
            let params: URLSearchParams = new URLSearchParams();
            params.set('sessionId',sessionId);
            params.set('skip',skip);
            params.set('limit','10')
            return this.http.get('/videos',{search: params})
                .map(res => <Video[]> res.json().data)
                .catch(this.handleError)
        }
    }
    //function to send post request of video rate
    rateVideo(videoId,rating) {
        var currentUser=JSON.parse(localStorage.getItem('currentUser'));
        if(currentUser){
            var sessionId=currentUser.sessionId;
            return this.http.post('/video/ratings',{sessionId: sessionId, videoId: videoId, rating: rating})
                .map(res => <Video> res.json().data)
                .catch(this.handleError)
        }
    }

    //function to send get request to get a video by id
    getById(videoId): Observable<Video>{
        var currentUser=JSON.parse(localStorage.getItem('currentUser'));
        if(currentUser){
            var sessionId=currentUser.sessionId;
            let params: URLSearchParams = new URLSearchParams();
            params.set('sessionId',sessionId);
            params.set('videoId',videoId);
            return this.http.get('/video',{search: params})
                .map(res => <Video> res.json().data)
                .catch(this.handleError)
        }
    }

    //custom error handler
    private handleError(error: Response){
        return Observable.throw(error.json().error || 'Server error');
    }

}