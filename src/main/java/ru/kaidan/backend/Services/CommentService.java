package ru.kaidan.backend.Services;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import ru.kaidan.backend.Entities.Anime;
import ru.kaidan.backend.Entities.Comment;
import ru.kaidan.backend.Entities.Review;
import ru.kaidan.backend.Entities.User;
import ru.kaidan.backend.Repositories.AnimeRepository;
import ru.kaidan.backend.Repositories.CommentRepository;
import ru.kaidan.backend.Repositories.ReviewRepository;
import ru.kaidan.backend.Repositories.UserRepository;

import java.util.List;

@Service
@RequiredArgsConstructor
public class CommentService {
    private final CommentRepository commentRepository;
    private final AnimeRepository animeRepository;
    private final ReviewRepository reviewRepository;
    private final UserRepository userRepository;

    public List<Comment> getAllComments() {
        return commentRepository.findAll();
    }

    public Comment getCommentById(String id) {
        return commentRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Comment not found"));
    }

    public Comment addComment(Comment comment) {
        Anime anime = animeRepository.findById(comment.getAnimeId())
                .orElseThrow(() -> new RuntimeException("Anime not found"));
        List<String> animeComments = anime.getCommentsId();
        animeComments.add(comment.getId());
        anime.setCommentsId(animeComments);
        animeRepository.save(anime);

        User user = userRepository.findById(comment.getUserId())
                .orElseThrow(() -> new RuntimeException("User not found"));
        List<String> userComments = user.getComments();
        userComments.add(comment.getId());
        user.setComments(userComments);
        userRepository.save(user);

        return commentRepository.save(comment);
    }

    public Comment addReviewToComment(String commentId, Review review) {
        Comment comment = getCommentById(commentId);

        animeRepository.findById(review.getAnimeId())
                .orElseThrow(() -> new RuntimeException("Anime not found"));

        review.setCommentId(commentId);
        Review savedReview = reviewRepository.save(review);

        comment.getReviews().add(savedReview);
        return commentRepository.save(comment);
    }

    public Comment patchComment(String id, Comment comment) {
        Comment existing = getCommentById(id);
        existing.setContent(comment.getContent());
        return commentRepository.save(existing);
    }

    public void deleteComment(String id) {
        Comment comment = getCommentById(id);
        if (comment.getReviews() != null && !comment.getReviews().isEmpty()) {
            comment.getReviews().forEach(r -> reviewRepository.delete(r));
        }
        commentRepository.deleteById(id);
    }
}
