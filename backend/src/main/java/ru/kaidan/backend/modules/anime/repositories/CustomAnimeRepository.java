package ru.kaidan.backend.modules.anime.repositories;

import ru.kaidan.backend.modules.anime.entities.types.Page;
import ru.kaidan.backend.modules.anime.entities.types.Sort;

public interface CustomAnimeRepository {

  Page findPageWithFilters(int page, int perPage, Sort sort, String search);
}
