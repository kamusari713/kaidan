package ru.kaidan.backend.Models;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class AnimePatchDTO {
    private String title;
    private String description;
    private String cover;
    private String animeType;
    private LocalDate releaseDate;
    private Integer episodeAmount;
    private String status;
    private List<String> genreIds;
}
