package ru.kaidan.backend.Services;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import ru.kaidan.backend.Entities.Anime;
import ru.kaidan.backend.Entities.Episode;
import ru.kaidan.backend.Repositories.AnimeRepository;
import ru.kaidan.backend.Repositories.EpisodeRepository;

import java.util.List;

@Service
@RequiredArgsConstructor
public class EpisodeService {
    private final EpisodeRepository episodeRepository;
    private final AnimeRepository animeRepository;

    public List<Episode> getAllEpisodes() {
        return episodeRepository.findAll();
    }

    public Episode getEpisodeById(String id) {
        return episodeRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Episode not found"));
    }

    public List<Episode> getEpisodesByAnimeTitle(String title) {
        Anime anime = animeRepository.findByTitle(title)
                .orElseThrow(() -> new RuntimeException("Anime not found"));
        return episodeRepository.findByAnimeId(anime.getId());
    }

    public Episode save(Episode episode) {
        animeRepository.findById(episode.getAnimeId())
                .orElseThrow(() -> new RuntimeException("Anime not found"));
        return episodeRepository.save(episode);
    }

    public Episode patchEpisode(String id, Episode episode) {
        Episode existing = getEpisodeById(id);
        existing.setStreamingUrl(episode.getStreamingUrl());
        return episodeRepository.save(existing);
    }

    public void delete(String id) {
        episodeRepository.deleteById(id);
    }
}
