package ru.kaidan.backend.modules.anime.repositories;

import static org.springframework.data.mongodb.core.aggregation.Aggregation.*;

import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Sort;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import ru.kaidan.backend.modules.anime.entities.Anime;
import ru.kaidan.backend.modules.anime.entities.types.AnimeFilter;
import ru.kaidan.backend.modules.anime.entities.types.Page;
import ru.kaidan.backend.modules.anime.entities.types.PageInfo;

@RequiredArgsConstructor
public class CustomAnimeRepositoryImpl implements CustomAnimeRepository {

  private final MongoTemplate mongoTemplate;

  @Override
  public Page findPageWithFilters(
      int page,
      int perPage,
      ru.kaidan.backend.modules.anime.entities.types.Sort sort,
      String search,
      AnimeFilter filter) {

    Query query = new Query();
    int perPageMax = Math.min(perPage, 50);
    long skip = (long) (page - 1) * perPageMax;

    if (search != null && !search.isEmpty()) {
      query.addCriteria(
          new Criteria()
              .orOperator(
                  Criteria.where("title.EN").regex(search, "i"),
                  Criteria.where("title.RU").regex(search, "i"),
                  Criteria.where("title.ROMAJI").regex(search, "i"),
                  Criteria.where("title.NATIVE").regex(search, "i")));
    }

    if (filter != null) {
      if (filter.getGenres() != null && !filter.getGenres().isEmpty()) {
        query.addCriteria(Criteria.where("genres.RU").in(filter.getGenres()));
      }
      if (filter.getTags() != null && !filter.getTags().isEmpty()) {
        query.addCriteria(Criteria.where("tags.RU.name").in(filter.getTags()));
      }
      if (filter.getStudios() != null && !filter.getStudios().isEmpty()) {
        query.addCriteria(Criteria.where("studios").in(filter.getStudios()));
      }
      if (filter.getKind() != null && !filter.getKind().isEmpty()) {
        query.addCriteria(Criteria.where("kind").in(filter.getKind()));
      }
      if (filter.getRating() != null && !filter.getRating().isEmpty()) {
        query.addCriteria(Criteria.where("rating").in(filter.getRating()));
      }
      if (filter.getStatus() != null && !filter.getStatus().isEmpty()) {
        query.addCriteria(Criteria.where("status.EN").is(filter.getStatus()));
      }
      if (filter.getEpisodes() != null) {
        query.addCriteria(Criteria.where("episodes").gte(filter.getEpisodes()));
      }
      if (filter.getScore() != null) {
        query.addCriteria(Criteria.where("shikimoriScore").gte(filter.getScore()));
      }
    }

    if (sort.getOrderBy() != null && sort.getDirection() != null) {
      Sort.Direction sortDirection =
          "desc".equalsIgnoreCase(sort.getDirection()) ? Sort.Direction.DESC : Sort.Direction.ASC;
      query.with(
          Sort.by(
              new Sort.Order(sortDirection, sort.getOrderBy()),
              new Sort.Order(sortDirection, "shikimoriId")));
    }

    query.skip(skip).limit(perPageMax);

    List<Anime> animeList = mongoTemplate.find(query, Anime.class);
    long totalMedia = mongoTemplate.count(query.skip(-1).limit(-1), Anime.class);
    long totalPages = (long) Math.ceil((double) totalMedia / perPageMax);
    boolean hasNextPage = page < totalPages;

    PageInfo pageInfo =
        PageInfo.builder()
            .totalPages(totalPages)
            .currentPage(page)
            .hasNextPage(hasNextPage)
            .lastPage(totalPages)
            .perPage(perPageMax)
            .build();

    return Page.builder().pageInfo(pageInfo).media(animeList).build();
  }
}
