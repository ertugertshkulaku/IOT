package com.moveengineering.backend.service;

import com.moveengineering.backend.model.Asset;
import com.moveengineering.backend.repository.AssetRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AssetService {

    @Autowired
    private AssetRepository repository;

    public Asset addAsset(Asset asset){
        return repository.insert(asset);
    }
    public Asset updateAsset(Asset asset){
        return repository.save(asset);
    }
    public boolean deleteAsset(Asset asset){
        repository.delete(asset);
        return true;
    }

    public Asset getAssetById(String id){
        return repository.findById(id).get();
    }


    public List<Asset> getAllAssets(){
        return repository.findAll();
    }

}
