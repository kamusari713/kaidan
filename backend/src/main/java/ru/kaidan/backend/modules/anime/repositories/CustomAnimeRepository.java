package ru.kaidan.backend.modules.anime.repositories;

import ru.kaidan.backend.modules.anime.entities.types.Page;

public interface CustomAnimeRepository {
    Page findPageWithFilters(String id, String search, int page, int perPage);
}
