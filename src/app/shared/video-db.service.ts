import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class VideoDBService {

  videos: string[];

  constructor() {
    this.videos = ['VideoAFromService', 'VideoBFromService', 'VideoCFromService'];
  }

  getVideos() {
    return this.videos;
  }
}
