package ru.kaidan.backend.modules.anime.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Data;
import lombok.EqualsAndHashCode;
import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.Transient;
import org.springframework.data.mongodb.core.mapping.Document;

@EqualsAndHashCode(callSuper = true)
@Data
@Document(collection = "tag")
public class TagEntity extends Tag {
    @Id
    private String id;

    @JsonIgnore
    @Transient
    private int rank;
}
