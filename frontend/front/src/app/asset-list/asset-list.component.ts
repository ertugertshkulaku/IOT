import { Component, OnInit } from '@angular/core';
import {AssetsService} from '../service/assets/assets.service';
import {Asset} from '../domain/Asset';
import {SocketService} from '../service/socket/socket.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-asset-list',
  templateUrl: './asset-list.component.html',
  styleUrls: ['./asset-list.component.css']
})
export class AssetListComponent implements OnInit {

  allAssets: Asset[];
  constructor(private service:AssetsService,
              private socket:SocketService,
              private router: Router) { }

  ngOnInit(): void {
    this.listenAssets();
    this.getAllAssetList();

  }
  getAllAssetList(){
    this.service.getAllAssets().subscribe((list) =>{
      this.allAssets = list
    })
  }

  assetDetails(id: string){
    this.router.navigate(['assets', id])
  }
  listenAssets(){
    this.socket.assetsSubject.subscribe((asset) =>{
      this.allAssets.push(asset);
    })
  }



}
