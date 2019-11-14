import { Component, OnInit } from '@angular/core';
import { WebcamImage, WebcamInitError, WebcamUtil } from 'ngx-webcam';
import { Observable } from 'rxjs';
import { Subject } from 'rxjs';
import { UtilService } from '../util.service'

@Component({
  selector: 'app-utilcam',
  templateUrl: './utilcam.component.html',
  styleUrls: ['./utilcam.component.css']
})

export class UtilcamComponent implements OnInit {

  constructor(readonly service: UtilService) {
    this.toggleWebcam();
  }

  bus_list = [];
  timing_list = [];
  base64Image: any;


  public showWebcam = false;
  public allowCameraSwitch = true;
  public multipleWebcamsAvailable = false;
  public deviceId: string;
  public videoOptions: MediaTrackConstraints = {
    // width: {ideal: 1024}, 
    // height: {ideal: 576} 
  };
  public errors: WebcamInitError[] = [];

  // latest snapshot
  public webcamImage: WebcamImage = null;

  // webcam snapshot trigger
  private trigger: Subject<void> = new Subject<void>();

  // switch to next / previous / specific webcam; true/false: forward/backwards, string: deviceId
  private nextWebcam: Subject<boolean | string> = new Subject<boolean | string>();

  ngOnInit() {

    WebcamUtil.getAvailableVideoInputs()
      .then((mediaDevices: MediaDeviceInfo[]) => {
        this.multipleWebcamsAvailable = mediaDevices && mediaDevices.length > 1;
      });
  }

  public dataURItoBlob(dataURI) {
    var binary = atob(dataURI.split(',')[1]);
    var array = [];
    for (var i = 0; i < binary.length; i++) {
      array.push(binary.charCodeAt(i));
    }
    return new Blob([new Uint8Array(array)], {
      type: 'image/jpg'
    });
  }


  public triggerSnapshot(): void {
    // button action conterolled -- edited on 18/9
    this.toggleWebcam();
    this.trigger.next();

  }

  public toggleWebcam(): void {
    this.showWebcam = !this.showWebcam;
  }

  public handleInitError(error: WebcamInitError): void {
    this.errors.push(error);
  }

  public showNextWebcam(directionOrDeviceId: boolean | string): void {
    // true => move forward through devices
    // false => move backwards through devices
    // string => move to device with given deviceId
    this.nextWebcam.next(directionOrDeviceId);
  }

  public handleImage(webcamImage: WebcamImage): void {
    console.info('received webcam image', webcamImage.imageAsDataUrl);
    this.webcamImage = webcamImage;
    console.log(webcamImage.imageData)
    console.log(webcamImage.imageAsBase64)
    var myFile:Blob = this.dataURItoBlob(webcamImage.imageAsDataUrl);
    this.service.getprocessedimage(webcamImage.imageAsBase64)

  }

  public cameraWasSwitched(deviceId: string): void {
    console.log('active device: ' + deviceId);
    this.deviceId = deviceId;
  }

  public get triggerObservable(): Observable<void> {
    return this.trigger.asObservable();
  }

  public get nextWebcamObservable(): Observable<boolean | string> {
    return this.nextWebcam.asObservable();
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
      this.timing_list = res
    })
      .catch(err => {
        console.log(err)
      })

  }

}
