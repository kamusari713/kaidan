package ru.kaidan.backend.Entities;


import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;
import ru.kaidan.backend.Enums.RoleType;
import ru.kaidan.backend.Enums.SexType;

import java.util.ArrayList;
import java.util.List;

@Data
@Document(collection = "user")
public class User {
    @Id
    private String id;
    private String name;
    private String hashedPassword;
    private RoleType role = RoleType.CLIENT;
    private SexType sex = SexType.NONE;
    private String watchListId;
    private List<String> comments = new ArrayList<>();
    
    @Indexed(unique = true)
    private String email;
}
