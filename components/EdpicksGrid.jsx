import { Star } from "@mui/icons-material";
import React from "react";
import styles from "../styles/Home.module.css";

const EdpicksGrid = ({ picks }) => {
  console.log(picks);
  return (
    <div className={styles.editGrid}>
      {picks.results.slice(16).map((movie, i) => {
        return (
          <div key={i} className={styles.gridItem}>
            <img
              alt="movieImg"
              src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
            />
            <div className={styles.Info}>
              <p>{movie.title}</p>
              <div className={styles.rating}>
                <Star />
                <p>{movie.vote_average}</p>
              </div>
              <button>Add to Watchlist</button>
              <a href="#">View Info</a>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default EdpicksGrid;
