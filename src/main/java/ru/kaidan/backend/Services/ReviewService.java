package ru.kaidan.backend.Services;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import ru.kaidan.backend.Entities.Review;
import ru.kaidan.backend.Repositories.AnimeRepository;
import ru.kaidan.backend.Repositories.CommentRepository;
import ru.kaidan.backend.Repositories.ReviewRepository;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ReviewService {
    private final ReviewRepository reviewRepository;
    private final AnimeRepository animeRepository;
    private final CommentRepository commentRepository;

    public List<Review> getAllReview() {
        return reviewRepository.findAll();
    }

    public Review getReviewById(String id) {
        return reviewRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Review not found"));
    }

    public Review addReview(Review review) {
        animeRepository.findById(review.getAnimeId())
                .orElseThrow(() -> new RuntimeException("Anime not found"));

        commentRepository.findById(review.getCommentId())
                .orElseThrow(() -> new RuntimeException("Comment not found"));

        return reviewRepository.save(review);
    }

    public Review patchReview(String id, Review review) {
        Review existing = getReviewById(review.getId());
        existing.setContent(review.getContent());
        return reviewRepository.save(existing);
    }

    public void deleteReview(String id) {
        reviewRepository.deleteById(id);
    }
}
