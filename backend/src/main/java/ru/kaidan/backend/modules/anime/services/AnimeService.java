package ru.kaidan.backend.modules.anime.services;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import ru.kaidan.backend.modules.anime.entities.Anime;
import ru.kaidan.backend.modules.anime.entities.types.Page;
import ru.kaidan.backend.modules.anime.repositories.AnimeRepository;

@Service
@RequiredArgsConstructor
public class AnimeService {
    private final AnimeRepository animeRepository;

    public Anime findByShikimoriId(String shikimoriId) {
        if (shikimoriId != null) {
            return animeRepository.findByShikimoriId(shikimoriId).orElse(null);
        } else throw new IllegalArgumentException("Must provide id");
    }

    public Page findByPageInfo(String id, String search, int page, int perPage) {
        if (id != null || search != null) {
            return animeRepository.findPageWithFilters(id, search, page, perPage);
        } else throw new IllegalArgumentException("Must provide either id or search");
    }
}
