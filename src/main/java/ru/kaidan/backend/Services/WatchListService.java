package ru.kaidan.backend.Services;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import ru.kaidan.backend.Entities.WatchList;
import ru.kaidan.backend.Repositories.AnimeRepository;
import ru.kaidan.backend.Repositories.WatchListRepository;

import java.util.List;

@Service
@RequiredArgsConstructor
public class WatchListService {
    private final WatchListRepository watchListRepository;
    private final AnimeRepository animeRepository;

    public List<WatchList> getAllWatchLists() {
        return watchListRepository.findAll();
    }

    public WatchList getWatchListById(String id) {
        return watchListRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("WatchList not found"));
    }

    public WatchList addWatchList(String id) {
        WatchList watchList = new WatchList();
        watchList.setId(id);
        return watchListRepository.save(watchList);
    }

    public WatchList addAnimeToWatchLists(String watchListId, String animeId) {
        WatchList watchList = getWatchListById(watchListId);
        animeRepository.findById(animeId)
                .orElseThrow(() -> new RuntimeException("Anime not found"));

        if (!watchList.getAnimeIds().contains(animeId)) {
            watchList.getAnimeIds().add(animeId);
            watchListRepository.save(watchList);
        }
        return watchList;
    }

    public WatchList removeAnimeFromWatchList(String watchListId, String animeId) {
        WatchList watchList = getWatchListById(watchListId);
        watchList.getAnimeIds().remove(animeId);
        return watchListRepository.save(watchList);
    }

    public void deleteWatchList(String id) {
        watchListRepository.deleteById(id);
    }
}
