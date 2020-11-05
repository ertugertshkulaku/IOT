import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Asset} from '../../domain/Asset';
import {environment} from '../../../environments/environment';
import {Device} from '../../domain/Device';



@Injectable({
  providedIn: 'root'
})
export class AssetsService {

  constructor(private http: HttpClient) { }

  getAllAssets(): Observable<Asset[]>{
    return this.http.get<Asset[]>(environment.serverUrl + '/asset');
  }
  createAsset(asset){
    return  this.http.post(environment.serverUrl + '/asset', asset);
  }
  getAssetById(id: string){
    return this.http.get<Asset>(environment.serverUrl + '/asset/' + id);
  }
  createNewDevice(id, device: Device){
    console.log("Create device" , device);
    return this.http.post(environment.serverUrl + '/device/' + id.assetId, device);

  }
  updateDevice(id, device: Device){
    return this.http.put(environment.serverUrl + '/updateDevice/' + id, device);
  }
}
