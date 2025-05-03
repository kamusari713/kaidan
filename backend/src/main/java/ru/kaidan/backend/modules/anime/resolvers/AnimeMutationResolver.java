package ru.kaidan.backend.modules.anime.resolvers;

import lombok.RequiredArgsConstructor;
import org.springframework.graphql.data.method.annotation.Argument;
import org.springframework.graphql.data.method.annotation.MutationMapping;
import org.springframework.stereotype.Controller;
import ru.kaidan.backend.modules.anime.entities.Anime;
import ru.kaidan.backend.modules.anime.entities.types.AnimeCreate;
import ru.kaidan.backend.modules.anime.entities.types.AnimeRaw;
import ru.kaidan.backend.modules.anime.repositories.AnimeRepository;
import ru.kaidan.backend.modules.anime.services.AnimeService;
import ru.kaidan.backend.utils.exceptions.custom.NotFoundException;

@Controller
@RequiredArgsConstructor
public class AnimeMutationResolver {

  private final AnimeService animeService;
  private final AnimeRepository animeRepository;

  @MutationMapping("createAnime")
  public Anime createAnime(@Argument AnimeRaw input) {
    return animeService.createAnime(input);
  }

  @MutationMapping("updateAnime")
  public Anime updateAnime(@Argument String shikimoriId, @Argument AnimeRaw input) {
    return animeService.updateAnime(shikimoriId, input);
  }

  @MutationMapping("deleteAnime")
  public Anime deleteAnime(@Argument String shikimoriId) {
    Anime anime = animeRepository.findByShikimoriId(shikimoriId)
            .orElseThrow(() -> new NotFoundException("Anime not found"));

    animeRepository.delete(anime);
    return anime;
  }
}
