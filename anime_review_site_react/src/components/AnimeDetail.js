import React, { useState, useEffect } from "react";
import {
  getAnimeReviews,
  addReview,
  upvoteReview,
  downvoteReview,
} from "../services/api";

const AnimeDetail = ({ anime, onClose }) => {
  const [reviews, setReviews] = useState([]);
  const [newReview, setNewReview] = useState("");
  const [authToken] = useState(localStorage.getItem("authToken"));
  const userId = localStorage.getItem("userId");
  const userName = localStorage.getItem("userName");

  useEffect(() => {
    getAnimeReviews(anime.animeId)
      .then((response) => {
        console.log("API Response:", response);
        const reviewsArray = response.data || [];
        setReviews(reviewsArray);
        console.log("Parsed Reviews:", reviewsArray); // Log the parsed reviews
      })
      .catch((error) => {
        console.error("Error fetching reviews:", error);
        console.log("animeId:", anime.animeId); // Log the anime ID
        setReviews([]); // Ensure reviews is always an array
      });
  }, [anime.animeId]);

  const handleAddReview = () => {
    const reviewData = {
      animeId: anime.animeId,
      userId: userId,
      reviewText: newReview,
    };
    // const anime_id = anime.animeId;
    // const user_id = userId;
    // const review_text = newReview;
    // const reviewData = { anime_id, user_id, review_text };

    console.log("Adding review:", reviewData); // Log the review data

    addReview(reviewData)
      .then((response) => {
        console.log("Add Review Response:", response); // Log the response
        setNewReview("");
        getAnimeReviews(anime.animeId).then((response) => {
          const reviewsArray = response.data || [];
          setReviews(reviewsArray);
        });
      })
      .catch((error) => {
        console.error("Error adding review:", error);
      });
  };

  const handleUpvote = (reviewId) => {
    console.log("Upvoting review:", reviewId); // Log the review ID

    upvoteReview(reviewId)
      .then((response) => {
        console.log("Upvote Response:", response); // Log the response
        getAnimeReviews(anime.animeId).then((response) => {
          const reviewsArray = response.data || [];
          setReviews(reviewsArray);
        });
      })
      .catch((error) => {
        console.error("Error upvoting review:", error);
      });
  };

  const handleDownvote = (reviewId) => {
    console.log("Downvoting review:", reviewId); // Log the review ID

    downvoteReview(reviewId)
      .then((response) => {
        console.log("Downvote Response:", response); // Log the response
        getAnimeReviews(anime.animeId).then((response) => {
          const reviewsArray = response.data || [];
          setReviews(reviewsArray);
        });
      })
      .catch((error) => {
        console.error("Error downvoting review:", error);
      });
  };

  return (
    <div className="anime-detail">
      <button className="close-button" onClick={onClose}>
        &times;
      </button>
      <h2>{anime.Title}</h2>
      <img src={anime.CoverImageURL} alt={anime.Title} />
      <p>{anime.Description}</p>
      <h3>Reviews</h3>
      {Array.isArray(reviews) && reviews.length > 0 ? (
        reviews.map((review) => (
          <div className="review" key={review.reviewId}>
            <p>
              {review.userName}: {review.reviewText} [👍 {review.likes}]
            </p>
            {authToken && (
              <button
                className="upvote"
                onClick={() => handleUpvote(review.reviewId)}
              >
                Upvote
              </button>
            )}
            {authToken && (
              <button
                className="downvote"
                onClick={() => handleDownvote(review.reviewId)}
              >
                Downvote
              </button>
            )}
          </div>
        ))
      ) : (
        <p>No reviews yet.</p>
      )}
      {authToken && (
        <div>
          <textarea
            value={newReview}
            onChange={(e) => setNewReview(e.target.value)}
            placeholder="Write a review..."
          ></textarea>
          <button className="submit-review" onClick={handleAddReview}>
            Submit Review
          </button>
        </div>
      )}
    </div>
  );
};

export default AnimeDetail;
