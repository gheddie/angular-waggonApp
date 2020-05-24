import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {TrainDto} from '../shared/entity/train-dto';
import {TrainService} from '../shared/train.service';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {CreateWaggonDialogComponent} from './create-waggon-dialog.component';

@Component({
  selector: 'app-train',
  templateUrl: './train.component.html',
  styleUrls: ['./train.component.css']
})
export class TrainComponent implements OnInit {

  trains: TrainDto[];

  private trainService: TrainService;

  loadedTrain: TrainDto;

  constructor(private route: ActivatedRoute, aTrainService: TrainService, public dialog: MatDialog) {
    this.trainService = aTrainService;
  }

  ngOnInit(): void {
    console.log('Zug anzeigen: ' + this.route.snapshot.params.id);
    this.loadedTrain = this.trainService.getTrain(this.route.snapshot.params.id);
  }

  waggonUp(aWaggonNumber: string, aTrainId: string) {
    this.trainService.switchWaggons(aWaggonNumber, aTrainId, 'UP');
    window.location.reload();
  }

  waggonDown(aWaggonNumber: string, aTrainId: string) {
    this.trainService.switchWaggons(aWaggonNumber, aTrainId, 'DOWN');
    window.location.reload();
  }

  removeWaggon(aWaggonNumber: string, aTrainId: string) {
    if (confirm('Wagen löschen?')) {
      this.trainService.switchWaggons(aWaggonNumber, aTrainId, 'REMOVE');
      window.location.reload();
    }
  }

  waggonToEnd(aWaggonNumber: string, aTrainId: string) {
    if (confirm('Wagen an das Zugende stellen?')) {
      this.trainService.waggonToEnd(aWaggonNumber, aTrainId);
      window.location.reload();
    }
  }

  createWaggon(aWaggonNumber: string, aTrainId: string) {

    const dialogRef = this.dialog.open(CreateWaggonDialogComponent, {
      width: '450px',
      data: {waggonNumber: '', waggonType: ''}
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed: ' + result);
      this.trainService.createWaggon(result, this.loadedTrain.trainNumber);
      window.location.reload();
    });
  }
}

