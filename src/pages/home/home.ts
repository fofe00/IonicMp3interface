import { Component } from '@angular/core';
import { Media, MediaObject } from '@ionic-native/media';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  tracks: any;
  playing: boolean = true;
  currentTrack: any;
  progressInterval: any;
  private file:MediaObject;

  constructor( private media: Media) {

    this.tracks = [
      {title: 'DAMSO', artist: 'best', playing: false, progress: 0,path:"1.mp3"},
      {title: 'Damso2', artist: 'Allison Wonderland', playing: false, progress: 0,path:"2.mp3"},
      {title: 'Breathe', artist: 'Seeb Neev', playing: false, progress: 0,path:"1.mp3"},
      {title: 'HyperParadise', artist: 'Hermitude', playing: false, progress: 0,path:"1.mp3"},
      {title: 'Lifespan', artist: 'Vaults', playing: false, progress: 0,path:"1.mp3"},
      {title: 'Stay High', artist: 'Tove Lo', playing: false, progress: 0,path:"1.mp3"},
      {title: 'Lean On', artist: 'Major Lazer', playing: false, progress: 0,path:"1.mp3"},
      {title: 'Damso', artist: 'Damso', playing: false, progress: 0,path:"2.mp3"}
    ];

    this.currentTrack = this.tracks[0];

  }
  playTrack(track){

    // First stop any currently playing tracks

    for(let checkTrack of this.tracks){

      if(checkTrack.playing){
        this.pauseTrack(checkTrack);
      }

    }
    //code to play media
      if (this.file){
        this.file.stop();
        this.file.release();
      }
     // alert(track.path);
      this.file=this.media.create('../assets/mp3/'+track.path);
      this.file.play();

    track.playing = true;
    this.currentTrack = track;

    // Simulate track playing
    this.progressInterval = setInterval(() => {

      track.progress < 100 ? track.progress++ : track.progress = 0;

    }, 1000);

  }

  pauseTrack(track){

    track.playing = false;
    this.file=this.media.create('./assets/mp3/'+track.path);
    this.file.pause();
    clearInterval(this.progressInterval);

  }

  nextTrack(){

    let index = this.tracks.indexOf(this.currentTrack);
    index >= this.tracks.length - 1 ? index = 0 : index++;

    this.playTrack(this.tracks[index]);

  }

  prevTrack(){

    let index = this.tracks.indexOf(this.currentTrack);
    index > 0 ? index-- : index = this.tracks.length - 1;

    this.playTrack(this.tracks[index]);

  }


}
