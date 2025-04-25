package ru.kaidan.backend.modules.anime.entities.types;

import java.util.List;
import lombok.Data;

@Data
public class AnimeFilter {
  private List<String> genres;
  private List<String> tags;
  private List<String> studios;
  private List<Kind> kind;
  private List<Rating> rating;
  private String status;
  private Integer episodes;
  private Float score;
}
