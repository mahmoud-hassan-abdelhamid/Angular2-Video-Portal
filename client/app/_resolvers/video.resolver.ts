import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { VideoService } from '../_services/video.service';
import { Video } from '../_models/video';

@Injectable()
//Single video page resolver
export class VideoResolver implements Resolve<Video> {

  constructor(private videoService: VideoService) { }

  resolve(route: ActivatedRouteSnapshot) {
    return this.videoService.getById(route.params['id']);
  }
}