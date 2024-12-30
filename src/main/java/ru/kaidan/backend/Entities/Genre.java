package ru.kaidan.backend.Entities;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.ArrayList;
import java.util.List;


@Data
@Document(collection = "genre")
public class Genre {
    @Id
    private String id;

    @Indexed(unique = true)
    private String title;

    @DBRef
    private List<Anime> anime = new ArrayList<>();
}
