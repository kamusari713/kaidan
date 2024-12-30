package ru.kaidan.backend.Services;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import ru.kaidan.backend.Entities.Anime;
import ru.kaidan.backend.Entities.Rating;
import ru.kaidan.backend.Mappers.AnimeMapper;
import ru.kaidan.backend.Models.AnimePatchDTO;
import ru.kaidan.backend.Repositories.AnimeRepository;
import ru.kaidan.backend.Repositories.RatingRepository;

import java.util.List;

@Service
@RequiredArgsConstructor
public class AnimeService {
    private final AnimeRepository animeRepository;
    private final RatingRepository ratingRepository;
    private final AnimeMapper animeMapper;

    public List<Anime> getAllAnime() {
        return animeRepository.findAll();
    }

    public Anime getAnimeById(String id) {
        return animeRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Anime not found"));
    }

    public Anime getAnimeByTitle(String title) {
        return animeRepository.findByTitle(title).orElse(null);
    }

    public Double getAnimeRating(String animeId) {
        List<Rating> ratings = ratingRepository.findByAnimeId(animeId);
        if (ratings == null || ratings.isEmpty()) {
            return 0.0;
        }
        return ratings.stream()
                .mapToInt(Rating::getScore)
                .average()
                .orElse(0.0);
    }

    public Anime addAnime(Anime anime) {
        return animeRepository.save(anime);
    }

    public Anime patchAnime(String id, AnimePatchDTO animeData) {
        animeRepository.findById(id).orElseThrow(() -> new RuntimeException("Anime not found"));
        return animeRepository.save(animeMapper.patchDTOtoEntity(animeData));
    }

    public void deleteAnime(String id) {
        animeRepository.deleteById(id);
    }
}
