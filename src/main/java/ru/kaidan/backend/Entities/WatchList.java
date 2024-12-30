package ru.kaidan.backend.Entities;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.ArrayList;
import java.util.List;

@Data
@Document(collection = "watch_list")
public class WatchList {
    @Id
    private String id;
    private String userId;
    private List<String> animeIds = new ArrayList<>();
}