package com.example.demo.entity;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.DBRef;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Document(collection = "admins")
@Getter @Setter
@NoArgsConstructor
@AllArgsConstructor
public class Admin {

    @Id
    private String id;

    @DBRef
    private User user;

    private String fullName;
}