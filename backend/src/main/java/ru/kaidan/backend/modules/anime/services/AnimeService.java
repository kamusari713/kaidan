package ru.kaidan.backend.modules.anime.services;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import lombok.RequiredArgsConstructor;
import ru.kaidan.backend.modules.anime.entities.Anime;
import ru.kaidan.backend.modules.anime.entities.types.AnimeRaw;
import ru.kaidan.backend.modules.anime.entities.types.Page;
import ru.kaidan.backend.modules.anime.entities.types.ResultMessage;
import ru.kaidan.backend.modules.anime.mappers.AnimeMapper;
import ru.kaidan.backend.modules.anime.repositories.AnimeRepository;
z
@Service
@RequiredArgsConstructor
public class AnimeService {

    private final AnimeRepository animeRepository;
    private final AnimeMapper animeMapper;

    public Anime findByShikimoriId(String shikimoriId) {
        if (shikimoriId != null) {
            return animeRepository.findByShikimoriId(shikimoriId).orElse(null);
        } else {
            throw new IllegalArgumentException("Must provide id");
        }
    }

    public Page findByPageInfo(String id, String search, int page, int perPage) {
        if (id != null || search != null) {
            return animeRepository.findPageWithFilters(id, search, page, perPage);
        } else {
            throw new IllegalArgumentException("Must provide either id or search");
        }
    }

    @Transactional
    public ResultMessage addRawAnimeList(List<AnimeRaw> dataSet) {
        List<Anime> mappedAnime = dataSet.stream()
                .map(animeMapper::rawToEntity)
                .collect(Collectors.toList());
        animeRepository.saveAll(mappedAnime);
        return ResultMessage.builder()
                .message("Anime added successfully")
                .total(mappedAnime.size())
                .build();
    }
}
