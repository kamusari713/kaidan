package ru.kaidan.backend.Services;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import ru.kaidan.backend.Entities.Rating;
import ru.kaidan.backend.Repositories.AnimeRepository;
import ru.kaidan.backend.Repositories.RatingRepository;

import java.util.List;

@Service
@RequiredArgsConstructor
public class RatingService {
    private final RatingRepository ratingRepository;
    private final AnimeRepository animeRepository;

    public List<Rating> getAllRatings() {
        return ratingRepository.findAll();
    }

    public Rating getRatingById(String id) {
        return ratingRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Rating not found"));
    }

    public Rating save(Rating rating) {
        animeRepository.findById(rating.getAnimeId())
                .orElseThrow(() -> new RuntimeException("Anime not found"));
        return ratingRepository.save(rating);
    }

    public Rating patchRating(String id, Rating rating) {
        Rating existing = getRatingById(id);
        existing.setScore(rating.getScore());
        return ratingRepository.save(existing);
    }

    public void deleteRating(String id) {
        ratingRepository.deleteById(id);
    }
}
