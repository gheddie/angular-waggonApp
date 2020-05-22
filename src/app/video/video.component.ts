import {Component, Inject, OnInit} from '@angular/core';
import {VideoDBService} from '../shared/video-db.service';
import {ActivatedRoute} from '@angular/router';
import {TrainDto} from '../shared/entity/train-dto';

@Component({
  selector: 'app-video',
  templateUrl: './video.component.html',
  styleUrls: ['./video.component.css']
})
export class VideoComponent implements OnInit {

  lenght = 0;
  name = 'a cool movie';
  theUrl = 'http://www.spiegel.de';

  trains: TrainDto[];

  constructor(private route: ActivatedRoute, datenbank: VideoDBService) {
    this.trains = datenbank.getTrains();
  }

  ngOnInit(): void {
    console.log('getze video anzeigen: ' + this.route.snapshot.params.id);
  }

  click(e) {
    // alert('...click...' + e);
    // console.log('...clicked...' + e);
    // console.log(e);
    // this.lenght = this.lenght + 1;
    // console.log('Länge jetzt: ' + length);
    console.log(this.trains);
  }
}
