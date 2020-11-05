import { Injectable } from '@angular/core';
import * as SockJS from 'sockjs-client';
import {Stomp} from '@stomp/stompjs';
import {Subject} from 'rxjs';
import {Asset} from '../../domain/Asset';
import {Device} from '../../domain/Device';
import {environment} from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SocketService {

  stompClient;
  assetsSubject = new Subject<Asset>();
  devicesSubject = new Subject<Device>();


  constructor() {this.initializeWebSocketConnection(); }

  initializeWebSocketConnection(){
    const ws = new SockJS(environment.serverUrl +'/root-path-iot');
    this.stompClient = Stomp.over(ws);
    const  that = this;
    this.stompClient.connect({}, function(frame){
      that.stompClient.subscribe('/topic/assets', (asset) => {
        if (asset.body){
          that.assetsSubject.next(JSON.parse(asset.body));
        }
      });
      that.stompClient.subscribe('/topic/devices',(device) => {
        if (device.body){
          that.devicesSubject.next(JSON.parse(device.body));
        }
      })
    });
  }
}
