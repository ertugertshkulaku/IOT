import {Component, OnChanges, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Asset} from '../domain/Asset';
import {AssetsService} from '../service/assets/assets.service';
import {Device} from '../domain/Device';
import { MatDialog } from '@angular/material/dialog';
import {AddDeviceComponent} from '../add-device/add-device.component';
import {SocketService} from '../service/socket/socket.service';

@Component({
  selector: 'app-devices',
  templateUrl: './devices.component.html',
  styleUrls: ['./devices.component.css']
})
export class DevicesComponent implements OnInit {

  assetId: string;
  asset: Asset;
  deviceList: Device[];



  constructor(private route: ActivatedRoute,
              private service: AssetsService,
              private dialog: MatDialog,
              private socket: SocketService) { }

  ngOnInit(): void {
    this.listenDevices();
    this.assetId = this.route.snapshot.params['id'];
    this.service.getAssetById(this.assetId).subscribe(result =>{
     this.asset = result;
     this.deviceList = this.asset.devices;
   });

  }

  openPopUpDevice(){
    this.dialog.open(AddDeviceComponent, {
      data: {assetId: this.asset.id}
    });
  }

  updateDevice(device){
    this.service.updateDevice(this.assetId, device)
      .subscribe(result =>{
        console.log("update device", device);
      });
  }

  listenDevices(){
    this.socket.devicesSubject.subscribe(device =>{
      let existDevice = this.deviceList.find(value => value.id === device.id);
      if (existDevice){
        const indexDevice = this.deviceList.findIndex(value => value.id === device.id);
      this.deviceList[indexDevice] = device;
      }else {
        this.deviceList.push(device);
      }

    })
  }

}
