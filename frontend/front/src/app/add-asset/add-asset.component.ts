import { Component, OnInit } from '@angular/core';
import {Asset} from '../domain/Asset';
import {AssetsService} from '../service/assets/assets.service';

@Component({
  selector: 'app-add-asset',
  templateUrl: './add-asset.component.html',
  styleUrls: ['./add-asset.component.css']
})
export class AddAssetComponent implements OnInit {

  asset: Asset;


  constructor(private service: AssetsService) { }

  ngOnInit(): void {
    this.asset = new Asset();

  }
  saveAsset(){
    if (this.asset.name !== undefined && this.asset.name !== null) {
      this.service.createAsset(this.asset).subscribe(data => {
        this.asset = new Asset();
      });
    }
  }



}
