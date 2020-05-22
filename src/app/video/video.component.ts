import {Component, Inject, OnInit} from '@angular/core';
import {VideoDBService} from '../shared/video-db.service';
import {ActivatedRoute} from '@angular/router';
import {TrainDto} from '../shared/entity/train-dto';
import {WaggonService} from '../shared/waggon.service';

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

  private waggonService: WaggonService;

  private loadedTrain: TrainDto;

  constructor(private route: ActivatedRoute, datenbank: VideoDBService, aWaggonService: WaggonService) {
    this.trains = datenbank.getTrains();
    this.waggonService = aWaggonService;
  }

  ngOnInit(): void {
    console.log('Zug anzeigen: ' + this.route.snapshot.params.id);
    this.loadedTrain = this.waggonService.getTrain(this.route.snapshot.params.id);
  }

  postTheStuff() {
    this.waggonService.postWaggon('qwe123aaa','rtz456aaa');
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
