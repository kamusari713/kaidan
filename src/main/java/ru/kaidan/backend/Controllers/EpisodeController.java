package ru.kaidan.backend.Controllers;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import ru.kaidan.backend.Entities.Episode;
import ru.kaidan.backend.Services.EpisodeService;

import java.util.List;

@RestController
@RequestMapping("api/episodes")
@RequiredArgsConstructor
public class EpisodeController {
    private final EpisodeService episodeService;

    @GetMapping
    public ResponseEntity<List<Episode>> getEpisodes() {
        List<Episode> episodes = episodeService.getAllEpisodes();
        return ResponseEntity.ok(episodes);
    }

    @GetMapping("/id/{id}")
    public ResponseEntity<Episode> getEpisodeById(@PathVariable String id) {
        Episode episode = episodeService.getEpisodeById(id);
        return ResponseEntity.ok(episode);
    }

    @PostMapping
    public ResponseEntity<Episode> addEpisode(@RequestBody Episode episode) {
        Episode savedEpisode = episodeService.save(episode);
        return ResponseEntity.ok(savedEpisode);
    }

    @PatchMapping("/{id}")
    public ResponseEntity<Episode> patchEpisode(@PathVariable String id, @RequestBody Episode episodeDetails) {
        Episode patchedEpisode = episodeService.patchEpisode(id, episodeDetails);
        return ResponseEntity.ok(patchedEpisode);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteEpisode(@PathVariable String id) {
        episodeService.delete(id);
        return ResponseEntity.noContent().build();
    }
}
