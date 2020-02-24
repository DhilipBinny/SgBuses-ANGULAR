import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { UtilService } from '../util.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogComponent } from "./dialog.component"

@Component({
  selector: 'app-buslist',
  templateUrl: './buslist.component.html',
  styleUrls: ['./buslist.component.css']
})
export class BuslistComponent implements OnInit {

  constructor(readonly service: UtilService, readonly activatedroute: ActivatedRoute, readonly router: Router, public dialog: MatDialog) { }

  ngOnInit() {
  }
  
  @Input()  
  bus_list = [];
  @Input() 
  busstop_code_id ;
  timing_list = [];

  imgdict = {
    "Single Deck":"../../assets/bustypes/SD.png",
    "Double Deck":"../../assets/bustypes/DD.png",
    "Bendy":"../../assets/bustypes/BD.png"
  }
  
  icondict={
    "Seats Available":"../../assets/sit2.png",
    "Standing Available":"../../assets/stand.png",
    "Limited Standing" : "../../assets/crowd.png"
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

}
