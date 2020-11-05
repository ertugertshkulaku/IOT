package com.moveengineering.backend.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;

import java.util.UUID;

@Data
@AllArgsConstructor
public class Type {

    private UUID id;
    private String description;

    public Type(){
        this.id= UUID.randomUUID();
    }
}
