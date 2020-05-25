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
export class TrainComponent implements OnInit, AfterViewChecked, AfterViewInit {

  trains: TrainDto[];
  private trainService: TrainService;
  loadedTrain: TrainDto;

  infoHeight = 0;

  initialized = false;

  constructor(private route: ActivatedRoute, aTrainService: TrainService, public dialog: MatDialog) {
    this.trainService = aTrainService;
  }

  ngOnInit(): void {
    console.log('Zug anzeigen: ' + this.route.snapshot.params.id);
    this.loadedTrain = this.trainService.getTrain(this.route.snapshot.params.id);
    console.log('Wagen geladen: ' + this.loadedTrain.waggons.length);
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

  createWaggon(aWaggonNumber: string, aTrainId: string, position: number) {

    const dialogRef = this.dialog.open(CreateWaggonDialogComponent, {
      width: '450px',
      data: {waggonNumber: '', waggonType: ''}
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed: ' + result);
      this.trainService.createWaggon(result, this.loadedTrain.trainNumber, position);
      window.location.reload();
    });
  }

  waggonClicked(position: number) {

    // this.hideOrShowInfoPanels(true);
    this.showInfoPanel(position);

    /*
    console.log('waggon clicked: ' +  position);
    if (this.infoVisible) {
      console.log('visible: hiding');
    } else {
      console.log('invisible: showing');
    }
    for (let index = 0; index < this.loadedTrain.waggons.length; index++) {
      const infoFrame = document.getElementById('waggonInfo' + index);
      const infoTable = document.getElementById('waggonTable' + index);
      if (this.infoVisible) {
        console.log('hiding: ' + index);
        infoFrame.style.visibility = 'hidden';
        infoFrame.style.height = '0px';
        this.infoHeight = +infoFrame.style.height;
      } else {
        console.log('showing: ' + index);
        infoFrame.style.visibility = 'visible';
        infoFrame.style.height = '100px';
      }
    }
    // this.infoVisible = !(this.infoVisible);
    */
  }

  showInfoPanel(position: number) {
    console.log('showing info panel: ' + position);
    const infoFrame = document.getElementById('waggonInfo' + position);
    infoFrame.style.visibility = 'visible';
    infoFrame.style.height = '100px';
  }

  hideOrShowInfoPanels(show: boolean) {
    console.log('hiding info panels: ' + show);
    for (let index = 0; index < this.loadedTrain.waggons.length; index++) {
      const infoFrame = document.getElementById('waggonInfo' + index);
      if (show) {
        console.log('showing panel: ' + index);
        infoFrame.style.visibility = 'visible';
        infoFrame.style.height = '250px';
      } else {
        console.log('hiding panel: ' + index);
        infoFrame.style.visibility = 'hidden';
        infoFrame.style.height = '0px';
        this.infoHeight = +infoFrame.style.height;
      }
    }
  }

  ngAfterViewInit() {

    /*
    console.log('after view init: ' + this.loadedTrain.waggons.length);
    this.hideOrShowInfoPanels(false);
    */
  }

  ngAfterViewChecked() {

    /*
    if (!this.initialized) {
      console.log('after view checked: ' + this.loadedTrain.waggons.length);
      this.hideOrShowInfoPanels(false);
    }
    this.initialized = true;
    */
  }
}
