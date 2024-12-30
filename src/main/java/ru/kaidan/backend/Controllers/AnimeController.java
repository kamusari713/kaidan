package ru.kaidan.backend.Controllers;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import ru.kaidan.backend.Entities.Anime;
import ru.kaidan.backend.Models.AnimePatchDTO;
import ru.kaidan.backend.Services.AnimeService;

import java.util.List;

@RestController
@RequestMapping("api/anime")
@RequiredArgsConstructor
public class AnimeController {
    private final AnimeService animeService;

    @GetMapping
    public ResponseEntity<List<Anime>> getAnime() {
        List<Anime> anime = animeService.getAllAnime();
        return ResponseEntity.ok(anime);
    }

    @GetMapping("/id/{id}")
    public ResponseEntity<Anime> getAnimeById(@PathVariable String id) {
        Anime anime = animeService.getAnimeById(id);
        return ResponseEntity.ok(anime);
    }

    @GetMapping("/anime/{name}")
    public ResponseEntity<Anime> getAnimeByTitle(@PathVariable String name) {
        Anime anime = animeService.getAnimeByTitle(name);
        return ResponseEntity.ok(anime);
    }

    @PostMapping
    public ResponseEntity<Anime> addAnime(@RequestBody Anime anime) {
        Anime savedAnime = animeService.addAnime(anime);
        return ResponseEntity.ok(savedAnime);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteAnime(@PathVariable String id) {
        animeService.deleteAnime(id);
        return ResponseEntity.noContent().build();
    }

    @PatchMapping("/{id}")
    public ResponseEntity<Anime> patchAnime(@PathVariable String id, @RequestBody AnimePatchDTO animeDetails) {
        Anime patchedAnime = animeService.patchAnime(id, animeDetails);
        return ResponseEntity.ok(patchedAnime);
    }
}
