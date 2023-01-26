import { Star } from "@mui/icons-material";
import React, { useEffect } from "react";
import styles from "../styles/Home.module.css";

const SearchGrid = ({ data }) => {
  return (
    <div className={styles.editGrid}>
      {data.map((movie, i) => {
        return (
          <div key={i} className={styles.gridItem}>
            <img
              alt="movieImg"
              src={
                `https://image.tmdb.org/t/p/w500/${movie.poster_path}` ||
                `https://image.tmdb.org/t/p/w500/${movie.backdrop_path}`
              }
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
      {data.length === 0 ? (
        <div className={styles.NoResults}>
          <h3>No Results Found</h3>
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default SearchGrid;
