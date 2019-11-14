import { Injectable } from '@angular/core';

import { HttpClient, HttpClientModule } from '@angular/common/http';

import { busStops } from './model';
import { busTiming } from './model';

@Injectable({
  providedIn: 'root'
})
export class UtilService {

  constructor(readonly http: HttpClient) { }

  getPosition(): Promise<any> {
    return new Promise((resolve, reject) => {

      navigator.geolocation.getCurrentPosition(resp => {

        resolve({ lng: resp.coords.longitude, lat: resp.coords.latitude });
      },
        err => {
          reject(err);
        });
    });
  }

  getstops(lat, lon): Promise<busStops[]> {
    return (
      this.http.get<any>(`https://datamall-server.azurewebsites.net/bstops?lat=${lat}&lon=${lon}`)
        .toPromise()
        .then(res => {
          var r = res.map(element => <busStops>{
            id: element[0],
            desc: element[1]
          });
          console.log(r)
          return r
        })
        .catch(err => {
          console.log("service call error>>>> ", err)
        })
    );
  }

  // http://localhost:5000/buses?bstpcode=18059
  getbusses(gstpcode): Promise<string[]> {
    return (
      this.http.get<any>(`https://datamall-server.azurewebsites.net/buses?bstpcode=${gstpcode}`)
        .toPromise()
        .then(res => {
          console.log(res)
          return res
        })
        .catch(err => {
          console.log("service call error>>>> ", err)
        })
    );
  }
  // http://localhost:5000/timing?bstpcode=18119&bscode=166
  gettiming(bstpcode, bscode): Promise<busTiming[]> {
    return (
      this.http.get<any>(`https://datamall-server.azurewebsites.net/timing?bstpcode=${bstpcode}&bscode=${bscode}`)
        .toPromise()
        .then(res => {
          var r = res.map(element => <busTiming>{
            estimatedArrival: element.EstimatedArrival,
            seats_available: element.Load,
            type: element.Type,
            type_img: element.type_img
          });
          console.log(r)
          return r
        })
        .catch(err => {
          console.log("service call error>>>> ", err)
        })
    );
  }


  getprocessedimage(img){
    console.log(">>>>>>>>>>>>>>> file :"+img)
    this.http.post("https://f5691c52.ngrok.io/processimage", {
      file:img
    }
    ).toPromise()
    .then(
      res=>{
        console.log(res)
      }
    ).catch(err => {
      console.log("service call error>>>> ", err)
    })
  }
}
