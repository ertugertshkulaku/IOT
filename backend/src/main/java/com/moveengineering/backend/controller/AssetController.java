package com.moveengineering.backend.controller;

import com.moveengineering.backend.model.Asset;
import com.moveengineering.backend.model.Device;
import com.moveengineering.backend.model.DeviceDTO;
import com.moveengineering.backend.service.AssetService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
public class AssetController {

    @Autowired
    AssetService assetsService;
    @Autowired
    SimpMessagingTemplate template;

    /** Create new asset and push to socket***/
    @PostMapping("/asset")
    public ResponseEntity<Asset> createAsset(@RequestBody Asset asset){
        Asset newAsset = new Asset();
        newAsset.setName(asset.getName());
        newAsset.setDevices(asset.getDevices());
        assetsService.addAsset(newAsset);
        this.template.convertAndSend("/topic/assets", newAsset);
        return new ResponseEntity<>(newAsset, HttpStatus.OK);

    }
    @PutMapping("/asset")
    public ResponseEntity<Asset> updateAsset(@RequestBody Asset asset){
        Asset upAsset = assetsService.getAssetById(asset.getId());
        if (upAsset != null){
            upAsset.setName(asset.getName());
            upAsset.setDevices(asset.getDevices());
            assetsService.updateAsset(upAsset);
            this.template.convertAndSend("/topic/assets", upAsset);
        }
        return new ResponseEntity<>(upAsset, HttpStatus.OK);

    }
    @GetMapping("/asset")
    public ResponseEntity<List<Asset>> getAllAssets(){
        List<Asset> assets = assetsService.getAllAssets();
        // this.template.convertAndSend("/topic/assets", assets);
        return new ResponseEntity<>(assets, HttpStatus.OK);
    }

    @GetMapping("/asset/{id}")
    public ResponseEntity<Asset> getAssetById(@PathVariable String id){
        Asset asset = assetsService.getAssetById(id);
        // this.template.convertAndSend("/topic/devices", asset.getDevices());
        return new ResponseEntity<>(asset, HttpStatus.OK);
    }

    @PostMapping(value = "/device/{id}")
    public ResponseEntity<Asset> createNewDevice(
            @PathVariable("id") String id,
            @RequestBody Device device
    ){

        Asset asset = assetsService.getAssetById(id);
        List<Device> devices = asset.getDevices();

        if(devices == null){
            devices = new ArrayList<Device>();
        }

        devices.add(device);
        asset.setDevices(devices);

        this.assetsService.updateAsset(asset);

        this.template.convertAndSend("/topic/devices", device);

        return new ResponseEntity<>(asset, HttpStatus.OK);


    }
    //update device
    @PutMapping(value = "updateDevice/{id}")
    public ResponseEntity<Asset> updateDevice(
            @PathVariable("id") String id,
            @RequestBody Device device
    ){
        Asset findAsset = assetsService.getAssetById(id);
        List<Device> deviceList = findAsset.getDevices();
        for(Device deviceOfAsset: deviceList){
            if(deviceOfAsset.getId().equals(device.getId())){
                deviceOfAsset.setStatus(device.getStatus());
                deviceOfAsset.setAttributes(device.getAttributes());
                break;


            }
        }

        findAsset.setDevices(deviceList);
        assetsService.updateAsset(findAsset);
        this.template.convertAndSend("/topic/devices", device);
        return new ResponseEntity<>(findAsset, HttpStatus.OK);

    }



}
