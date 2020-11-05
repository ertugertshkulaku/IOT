import {Attribute, Component, Inject, OnInit} from '@angular/core';
import {AssetsService} from '../service/assets/assets.service';
import {Device} from '../domain/Device';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import {Type} from '../domain/Type';
import {DeviceAttributes} from '../domain/DeviceAttributes';




@Component({
  selector: 'app-add-device',
  templateUrl: './add-device.component.html',
  styleUrls: ['./add-device.component.css']
})
export class AddDeviceComponent implements OnInit {

  device : Device;
  type= {} as Type;
  attributes= [];
  newAttribute :DeviceAttributes = null;

  constructor(@Inject(MAT_DIALOG_DATA) public assetId: string ,
              private service: AssetsService) { }

  ngOnInit(): void {
    this.device = new Device();
    this.newAttribute = new DeviceAttributes();
    this.type = new Type();

  }

  addDevice() {
    const device = this.buildDeviceObj();
    this.service.createNewDevice(this.assetId, device)
      .subscribe(result => {
        this.device = new Device();
        console.log(result);
      });

  }

  buildDeviceObj(){
    this.attributes.push(this.newAttribute);
    this.device = {
      name:this.device.name,
      type: this.type,
      status:this.device.status,
     attributes: this.attributes
    }
return this.device;
   }

  deleteAttribute(attribute){
    return null;
  }




}
