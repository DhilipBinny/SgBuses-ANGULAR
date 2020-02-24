import { Component, OnInit, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { UtilService } from '../util.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogComponent } from "./dialog.component";
import {OpencamdialogComponent} from "./opencamdialog.component"


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
    // this.getlocation()
  }

  page1 = true
  currLat = 0;
  currLng = 0;
  busstops_list = [];
  bus_list = [];
  timing_list = []

  busstopcodeformimage ;  
  imageurl = "https://media-cdn.tripadvisor.com/media/photo-s/13/bd/7e/73/closest-bus-stop-steps.jpg";

    // "Single Deck":"../../assets/11.png",
    // "Double Deck":"../../assets/22.png",
    // "Bendy":"../../assets/2.png"
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
  ngOnInit() {
  }

  getlocation() {
    this.page1=true
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
    this.page1=false
    this.bus_list = null
    this.imageurl = "https://media-cdn.tripadvisor.com/media/photo-s/13/bd/7e/73/closest-bus-stop-steps.jpg";

    const dialogRef = this.dialog.open(OpencamdialogComponent, {
      width: '95%',
      data: ""
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(result.data)
      // this.imagefile = result.data.file
      // console.log(this.imagefile)

      this.imageurl = result.data.imageurl
      // console.log(this.imageurl)
      this.service.getprocessedimage(result.data.file).then(r=>{
        console.log(r)

        console.log(r.result=="ok")

        if(r["result"]=="ok"){
          this.busstopcodeformimage = r["busstopcode"]
         
          this.getbusses(r["busstopcode"])
        }else{
          this.oncameraclick()
        }

      }).catch(e=>{
        console.log(e)
      })
     
    });

  }
}
