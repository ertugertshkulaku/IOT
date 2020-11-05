package com.moveengineering.backend.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;

import java.util.List;
import java.util.UUID;

@Data
@AllArgsConstructor
public class Device {

    @Id
    private UUID id;
    private String name;
    private Type type;
    private Boolean status;
    private List<DeviceAttributes> attributes;

    public Device(){
        this.id = UUID.randomUUID();
    }

}
