package com.moveengineering.backend.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;
@Data
@AllArgsConstructor
@NoArgsConstructor
@Document
public class Asset {

    @Id
    private String id;
    private String name;
    private List<Device> devices;
}
