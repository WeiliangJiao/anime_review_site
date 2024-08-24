import React, { useState, useEffect } from "react";
import { getAnimes } from "../services/api";
import AnimeCard from "./AnimeCard";
import AnimeDetail from "./AnimeDetail";
import Auth from "./Auth";
import Chatbot from "./Chatbot";
import axios from "axios";

const HomePage = () => {
  const [animes, setAnimes] = useState([]);
  const [selectedAnime, setSelectedAnime] = useState(null);
  const [showAuth, setShowAuth] = useState(false);
  const [showChatbot, setShowChatbot] = useState(false);
  const [authToken, setAuthToken] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const userName = localStorage.getItem("userName");

  useEffect(() => {
    getAnimes()
      .then((response) => {
        console.log("API Response:", response.data);
        const parsedData = response.data;
        if (Array.isArray(parsedData)) {
          setAnimes(parsedData);
        } else {
          setError("Invalid data structure");
        }
        setLoading(false); // Data fetched, stop loading
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setError(error.message || "An error occurred");
        setLoading(false); // Error occurred, stop loading
      });
  }, []);

  const handleAnimeClick = (anime) => {
    setSelectedAnime(anime);
  };

  if (loading) {
    return <div>Loading...</div>; // Show a loading message while fetching data
  }

  if (error) {
    return <div>Error loading data: {error}</div>; // Show an error message if data fetch fails
  }

  if (!animes.length) {
    return <div>No animes found</div>; // Show a message if no animes are found
  }

  return (
    <div className="home-page">
      <header>
        {authToken && (
          <div className="welcome-message">Welcome, {userName}!</div>
        )}
        <div className="loginOut">
          {authToken && (
            <button onClick={() => setAuthToken(null)}>Logout</button>
          )}
          {!authToken && (
            <button onClick={() => setShowAuth(true)}>Login</button>
          )}
        </div>
      </header>
      <div className="anime-grid">
        {animes.map((anime) => (
          <AnimeCard
            key={anime.animeId}
            anime={anime}
            onClick={handleAnimeClick}
          />
        ))}
      </div>
      {selectedAnime && (
        <AnimeDetail
          anime={selectedAnime}
          onClose={() => setSelectedAnime(null)}
        />
      )}
      {showAuth && (
        <Auth onClose={() => setShowAuth(false)} setAuthToken={setAuthToken} />
      )}
      {showChatbot && <Chatbot onClose={() => setShowChatbot(false)} />}
    </div>
  );
};

export default HomePage;
