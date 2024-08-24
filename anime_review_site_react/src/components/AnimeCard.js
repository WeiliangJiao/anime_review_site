import React from "react";

const AnimeCard = ({ anime, onClick }) => {
  return (
    <div className="anime-card" onClick={() => onClick(anime)}>
      <img src={anime.CoverImageURL} alt={anime.Title} />
      <h3>{anime.Title}</h3>
    </div>
  );
};

export default AnimeCard;
