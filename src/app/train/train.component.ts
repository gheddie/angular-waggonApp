import {AfterContentInit, AfterViewChecked, AfterViewInit, Component, OnInit} from '@angular/core';
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

  // str: string;

  constructor(private route: ActivatedRoute, aTrainService: TrainService, public dialog: MatDialog) {
    this.trainService = aTrainService;
  }

  ngOnInit(): void {

    // this.str = '123';

    console.log('Zug anzeigen: ' + this.route.snapshot.params.id);
    this.loadedTrain = this.trainService.getTrain(this.route.snapshot.params.id);
    console.log('Wagen geladen: ' + this.loadedTrain.waggons.length);
  }

  waggonUp(aWaggonNumber: string, aTrainId: number) {
    console.log('waggon up: [aWaggonNumber:' + aWaggonNumber + ', aTrainId:' + aTrainId + ']');
    this.trainService.manipulateWaggonSequence(aWaggonNumber, aTrainId, 'UP');
    window.location.reload();
  }

  waggonDown(aWaggonNumber: string, aTrainId: number) {
    console.log('waggon down: [aWaggonNumber:' + aWaggonNumber + ', aTrainId:' + aTrainId + ']');
    this.trainService.manipulateWaggonSequence(aWaggonNumber, aTrainId, 'DOWN');
    window.location.reload();
  }

  removeWaggon(aWaggonNumber: string, aTrainId: number) {
    console.log('remove waggon: [aWaggonNumber:' + aWaggonNumber + ', aTrainId:' + aTrainId + ']');
    if (confirm('Wagen löschen?')) {
      this.trainService.manipulateWaggonSequence(aWaggonNumber, aTrainId, 'REMOVE');
      window.location.reload();
    }
  }

  waggonToEnd(aWaggonNumber: string, aTrainId: number) {
    console.log('waggon to end: [aWaggonNumber:' + aWaggonNumber + ', aTrainId:' + aTrainId + ']');
    if (confirm('Wagen an das Zugende stellen?')) {
      this.trainService.manipulateWaggonSequence(aWaggonNumber, aTrainId, 'TOEND');
      window.location.reload();
    }
  }

  createWaggon(aWaggonNumber: string, aTrainId: string, position: number) {

    const dialogRef = this.dialog.open(CreateWaggonDialogComponent, {
      width: '450px',
      data: {waggonNumber: '', waggonType: ''}
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed: ' + result);
      this.trainService.createWaggon(result, this.loadedTrain.trainId, position);
      window.location.reload();
    });
  }

  waggonClicked(position: number) {
    this.showOrHideInfoPanel(position);
  }

  inflateAllDamageWaggons() {
    for (var index = 0; index < this.loadedTrain.waggons.length; index++) {
      const infoFrame = document.getElementById('waggonInfo' + index);
      if (this.loadedTrain.waggons[index].damageCount > 0) {
        infoFrame.style.visibility = 'visible';
        infoFrame.style.height = '100px';
      }
    }
  }

  inflateAllWaggons(inflate: boolean) {
    console.log('double clicked...');
    for (var index = 0; index < this.loadedTrain.waggons.length; index++) {
      // var num = numbers[_i];
      console.log(index);
      const infoFrame = document.getElementById('waggonInfo' + index);
      if (inflate) {
        infoFrame.style.visibility = 'visible';
        infoFrame.style.height = '100px';
      } else {
        infoFrame.style.visibility = 'hidden';
        infoFrame.style.height = '0px';
      }
    }
  }

  showOrHideInfoPanel(position: number) {

    const infoFrame = document.getElementById('waggonInfo' + position);

    console.log('height: ' + infoFrame.style.getPropertyValue('height'));
    console.log('visibility: ' + infoFrame.style.getPropertyValue('visibility'));

    if (infoFrame.style.getPropertyValue('visibility') === 'hidden') {
      console.log('showing info panel: ' + position);
      infoFrame.style.visibility = 'visible';
      infoFrame.style.height = '100px';
    } else {
      infoFrame.style.visibility = 'hidden';
      infoFrame.style.height = '0px';
    }
  }
}
