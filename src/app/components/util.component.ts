import { Component, OnInit, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { UtilService } from '../util.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogComponent } from "./dialog.component"


@Component({
  selector: 'app-util',
  templateUrl: './util.component.html',
  styleUrls: ['./util.component.css']
})
export class UtilComponent implements OnInit {

  constructor(readonly service: UtilService, 
    readonly activatedroute: ActivatedRoute, 
    readonly router: Router, 
    public dialog: MatDialog) {
    this.getlocation()
  }

  currLat = 0;
  currLng = 0;
  busstops_list = [];
  bus_list = [];
  timing_list = []

  imgdict = {
    "Single Deck":"../../assets/11.png",
    "Double Deck":"../../assets/22.png",
    "Bendy":"../../assets/2.png"
  }

  icondict={
    "Seats Available":"../../assets/sit2.png",
    "Standing Available":"../../assets/stand.png",
    "Limited Standing" : "../../assets/crowd.png"
  }
  ngOnInit() {
  }

  getlocation() {
    this.service.getPosition().then(pos => {
      this.currLat = pos.lat;
      this.currLng = pos.lng;

      this.service.getstops(this.currLat, this.currLng).then(res => {
        this.busstops_list = res;
        res.forEach(element => {
          console.log(`is : ${element.id} desc : ${element.desc}`)
        });
      });
      console.log(`Positon: ${pos.lng} ${pos.lat}`);
    });
  }

  getbusses(bstpcode) {
    this.bus_list = []
    this.service.getbusses(bstpcode).then(res => {
      this.bus_list = res
      console.log(res)
    })
      .catch(err => {
        console.log(err)
      })
  }

  gettimimng(bstpcode, bscode) {
    this.timing_list = []
    this.service.gettiming(bstpcode, bscode).then(res => {
      console.log(res)

      var temp = res.map(e => ({
        "estimatedArrival" : e.estimatedArrival,
        "seats_available" : e.seats_available,
        "type" : e.type,
        "type_img" : this.imgdict[e.type],
        "seats_available_" : this.icondict[e.seats_available],

      }))
      this.timing_list = temp

      this.dialog.open(DialogComponent, {
        width: '80%',
        data: this.timing_list
      });

    })
      .catch(err => {
        console.log(err)
      })

  }

  oncameraclick() {
    this.router.navigate(['/cam'])
  }
}
