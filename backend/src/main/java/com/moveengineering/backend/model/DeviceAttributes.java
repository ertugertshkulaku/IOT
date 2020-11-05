package com.moveengineering.backend.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;

import java.util.UUID;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class DeviceAttributes {

    @Id
    private UUID id;
    private String name;
    private Integer value;
    private Integer valueMin;
    private Integer valueMax;


}
