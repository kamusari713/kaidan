package ru.kaidan.backend.modules.anime.repositories;

import lombok.RequiredArgsConstructor;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import ru.kaidan.backend.modules.anime.entities.Anime;
import ru.kaidan.backend.modules.anime.entities.types.Page;
import ru.kaidan.backend.modules.anime.entities.types.PageInfo;

import java.util.List;

@RequiredArgsConstructor
public class CustomAnimeRepositoryImpl implements CustomAnimeRepository {
    private final MongoTemplate mongoTemplate;

    @Override
    public Page findPageWithFilters(String id, String search, int page, int perPage) {
        Query query = new Query();
        int perPageMax = Math.min(perPage, 50);
        long skip = (long) (page - 1) * perPageMax;

        query.addCriteria(new Criteria().orOperator(
                                Criteria.where("title.EN").regex(search, "i"),
                                Criteria.where("title.RU").regex(search, "i"),
                                Criteria.where("title.ROMAJI").regex(search, "i"),
                                Criteria.where("title.NATIVE").regex(search, "i")
                        )
                )
                .skip(skip)
                .limit(perPageMax);

        List<Anime> animeList = mongoTemplate.find(query, Anime.class);
        long totalMedia = mongoTemplate.count(query.skip(-1).limit(-1), Anime.class);
        long totalPages = (long) Math.ceil(totalMedia / (double) perPageMax);
        boolean hasNextPage = page + 1 >= totalPages;

        PageInfo pageInfo = PageInfo
                .builder()
                .totalPages(totalPages)
                .currentPage(page)
                .hasNextPage(hasNextPage)
                .lastPage(totalPages)
                .perPage(perPageMax)
                .build();

        return Page
                .builder()
                .pageInfo(pageInfo)
                .media(animeList)
                .build();
    }
}
