package ru.kaidan.backend.modules.anime.resolvers;

import java.util.ArrayList;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.aggregation.Aggregation;
import org.springframework.data.mongodb.core.aggregation.AggregationOperation;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.graphql.data.method.annotation.Argument;
import org.springframework.graphql.data.method.annotation.QueryMapping;
import org.springframework.stereotype.Controller;
import ru.kaidan.backend.modules.anime.entities.Anime;
import ru.kaidan.backend.modules.anime.entities.Genre;
import ru.kaidan.backend.modules.anime.entities.Tag;
import ru.kaidan.backend.modules.anime.entities.types.*;
import ru.kaidan.backend.modules.anime.repositories.GenreRepository;
import ru.kaidan.backend.modules.anime.services.AnimeService;

@Controller
@RequiredArgsConstructor
public class AnimeQueryResolver {

  private final AnimeService animeService;
  private final MongoTemplate mongoTemplate;
  private final GenreRepository genreRepository;

  @QueryMapping("anime")
  public Anime getAnime(@Argument String shikimoriId) {
    return animeService.findByShikimoriId(shikimoriId);
  }

  @QueryMapping("page")
  public Page getPage(
      @Argument int page,
      @Argument int perPage,
      @Argument Sort sort,
      @Argument String search,
      @Argument AnimeFilter filter) {
    return animeService.findPage(page, perPage, sort, search, filter);
  }

  @QueryMapping("genres")
  public List<Genre> genres() {
    return genreRepository.findAll();
  }

  @QueryMapping("tags")
  public List<Tag> searchTags(@Argument String search, @Argument int limit) {
    List<AggregationOperation> pipeline = new ArrayList<>();

    pipeline.add(Aggregation.unwind("tags"));

    if (search != null && !search.isEmpty()) {
      pipeline.add(
          Aggregation.match(Criteria.where("tags.RU.name").regex(".*" + search + ".*", "i")));
    }

    pipeline.add(Aggregation.group("tags.RU.name").first("tags.RU").as("RU"));

    pipeline.add(Aggregation.project("RU"));

    pipeline.add(Aggregation.limit(limit));

    Aggregation aggregation = Aggregation.newAggregation(pipeline);

    return mongoTemplate.aggregate(aggregation, "anime", Tag.class).getMappedResults();
  }

  @QueryMapping("studios")
  public List<String> getStudios() {
    return animeService.findAllStudios();
  }

  @QueryMapping("kinds")
  public List<String> kinds() {
    return List.of("tv", "movie", "ova", "ona", "special", "tv_special", "music", "cm");
  }

  @QueryMapping("ratings")
  public List<String> ratings() {
    return List.of("g", "pg", "pg_13", "r", "r_plus");
  }
}
