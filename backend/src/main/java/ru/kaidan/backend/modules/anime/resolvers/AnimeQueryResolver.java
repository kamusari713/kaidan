package ru.kaidan.backend.modules.anime.resolvers;

import org.springframework.graphql.data.method.annotation.Argument;
import org.springframework.graphql.data.method.annotation.QueryMapping;
import org.springframework.stereotype.Controller;

import lombok.RequiredArgsConstructor;
import ru.kaidan.backend.modules.anime.entities.Anime;
import ru.kaidan.backend.modules.anime.entities.types.Page;
import ru.kaidan.backend.modules.anime.services.AnimeService;

@Controller
@RequiredArgsConstructor
public class AnimeQueryResolver {

    private final AnimeService animeService;

    @QueryMapping("anime")
    public Anime getOne(@Argument String shikimoriId) {
        return animeService.findByShikimoriId(shikimoriId);
    }

    @QueryMapping("page")
    public Page getPage(@Argument String id, @Argument String search, @Argument int page, @Argument int perPage) {
        return animeService.findByPageInfo(id, search, page, perPage);
    }
}
