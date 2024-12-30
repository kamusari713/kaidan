package ru.kaidan.backend.Controllers;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import ru.kaidan.backend.Entities.Rating;
import ru.kaidan.backend.Services.RatingService;

import java.util.List;

@RestController
@RequestMapping("api/ratings")
@RequiredArgsConstructor
public class RatingController {
    private final RatingService ratingService;

    @GetMapping
    public ResponseEntity<List<Rating>> getEpisodes() {
        List<Rating> episodes = ratingService.getAllRatings();
        return ResponseEntity.ok(episodes);
    }

    @GetMapping("/id/{id}")
    public ResponseEntity<Rating> getEpisodeById(@PathVariable String id) {
        Rating episode = ratingService.getRatingById(id);
        return ResponseEntity.ok(episode);
    }

    @PostMapping
    public ResponseEntity<Rating> addEpisode(@RequestBody Rating episode) {
        Rating savedEpisode = ratingService.save(episode);
        return ResponseEntity.ok(savedEpisode);
    }

    @PatchMapping("/{id}")
    public ResponseEntity<Rating> patchEpisode(@PathVariable String id, @RequestBody Rating episodeDetails) {
        Rating patchedEpisode = ratingService.patchRating(id, episodeDetails);
        return ResponseEntity.ok(patchedEpisode);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteEpisode(@PathVariable String id) {
        ratingService.deleteRating(id);
        return ResponseEntity.noContent().build();
    }
}
