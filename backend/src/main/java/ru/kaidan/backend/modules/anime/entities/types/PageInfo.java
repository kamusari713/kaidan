package ru.kaidan.backend.modules.anime.entities.types;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

@Data
@AllArgsConstructor
@Builder
public class PageInfo {

    private Long totalPages;
    private Integer currentPage;
    private Boolean hasNextPage;
    private Long lastPage;
    private Integer perPage;
}
