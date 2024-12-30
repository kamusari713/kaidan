package ru.kaidan.backend.Controllers;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import ru.kaidan.backend.Entities.Genre;
import ru.kaidan.backend.Services.GenreService;

import java.util.List;

@RestController
@RequestMapping("api/genres")
@RequiredArgsConstructor
public class GenreController {
    private final GenreService genreService;

    @GetMapping
    public ResponseEntity<List<Genre>> getGenres() {
        List<Genre> genres = genreService.getAllGenres();
        return ResponseEntity.ok(genres);
    }

    @GetMapping("/id/{id}")
    public ResponseEntity<Genre> getGenreById(@PathVariable String id) {
        Genre genre = genreService.getGenreById(id);
        return ResponseEntity.ok(genre);
    }

    @PostMapping
    public ResponseEntity<Genre> addGenre(@RequestBody Genre genre) {
        Genre savedGenre = genreService.addGenre(genre);
        return ResponseEntity.ok(savedGenre);
    }

    @PatchMapping("/{id}")
    public ResponseEntity<Genre> patchGenre(@PathVariable String id, @RequestBody Genre genreDetails) {
        Genre patchedGenre = genreService.patchGenre(id, genreDetails);
        return ResponseEntity.ok(patchedGenre);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteGenre(@PathVariable String id) {
        genreService.deleteGenre(id);
        return ResponseEntity.noContent().build();
    }
}
