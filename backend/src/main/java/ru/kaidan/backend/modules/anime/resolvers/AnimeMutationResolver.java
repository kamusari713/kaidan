package ru.kaidan.backend.modules.anime.resolvers;

import lombok.RequiredArgsConstructor;
import org.springframework.graphql.data.method.annotation.Argument;
import org.springframework.graphql.data.method.annotation.MutationMapping;
import org.springframework.stereotype.Controller;
import ru.kaidan.backend.modules.anime.entities.Anime;
import ru.kaidan.backend.modules.anime.entities.types.AnimeRaw;
import ru.kaidan.backend.modules.anime.services.AnimeService;

@Controller
@RequiredArgsConstructor
public class AnimeMutationResolver {

  private final AnimeService animeService;

  @MutationMapping("createAnime")
  public Anime createAnime(@Argument AnimeRaw input) {
    return animeService.createAnime(input);
  }

  @MutationMapping("updateAnime")
  public Anime updateAnime(@Argument String shikimoriId, @Argument AnimeRaw input) {
    return animeService.updateAnime(shikimoriId, input);
  }
}
