package ru.kaidan.backend.Services;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import ru.kaidan.backend.Entities.Anime;
import ru.kaidan.backend.Entities.Genre;
import ru.kaidan.backend.Repositories.AnimeRepository;
import ru.kaidan.backend.Repositories.GenreRepository;

import java.util.List;

@Service
@RequiredArgsConstructor
public class GenreService {
    private final GenreRepository genreRepository;
    private final AnimeRepository animeRepository;

    public List<Genre> getAllGenres() {
        return genreRepository.findAll();
    }

    public Genre getGenreById(String id) {
        return genreRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Genre not found"));
    }

    public Genre addGenre(Genre genre) {
        return genreRepository.save(genre);
    }

    public Genre addAnimeToGenre(String genreId, String animeId) {
        Genre genre = getGenreById(genreId);
        Anime anime = animeRepository.findById(animeId)
                .orElseThrow(() -> new RuntimeException("Anime not found"));

        if (!genre.getAnime().contains(anime)) {
            genre.getAnime().add(anime);
            genreRepository.save(genre);

            if (!anime.getGenres().contains(genre)) {
                anime.getGenres().add(genre);
                animeRepository.save(anime);
            }
        }
        return genre;
    }

    public Genre patchGenre(String id, Genre genre) {
        Genre existing = getGenreById(id);
        existing.setTitle(genre.getTitle());
        return genreRepository.save(existing);
    }

    public void deleteGenre(String id) {
        genreRepository.deleteById(id);
    }
}
