package ru.kaidan.backend.Controllers;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import ru.kaidan.backend.Entities.WatchList;
import ru.kaidan.backend.Services.WatchListService;

import java.util.List;

@RestController
@RequestMapping("api/watch-lists")
@RequiredArgsConstructor
public class WatchListController {
    private final WatchListService watchListService;

    @GetMapping
    public ResponseEntity<List<WatchList>> getWatchLists() {
        List<WatchList> watchLists = watchListService.getAllWatchLists();
        return ResponseEntity.ok(watchLists);
    }

    @GetMapping("/id/{id}")
    public ResponseEntity<WatchList> getWatchListById(@PathVariable String id) {
        WatchList watchList = watchListService.getWatchListById(id);
        return ResponseEntity.ok(watchList);
    }

    @PostMapping
    public ResponseEntity<WatchList> addWatchList(@RequestBody String id) {
        WatchList savedWatchList = watchListService.addWatchList(id);
        return ResponseEntity.ok(savedWatchList);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteWatchList(@PathVariable String id) {
        watchListService.deleteWatchList(id);
        return ResponseEntity.noContent().build();
    }
}
