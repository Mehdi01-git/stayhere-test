import { Star } from "@mui/icons-material";
import React, { useEffect } from "react";
import styles from "../styles/Home.module.css";
import { dispatchStateContext, globalStateContext } from "../pages/_app";
import { Tooltip } from "@mui/material";
import Link from "next/link";

const SearchGrid = ({ data }) => {
  const useGlobalState = () => [
    React.useContext(globalStateContext),
    React.useContext(dispatchStateContext),
  ];

  const [state, dispatch] = useGlobalState();
  function putItem() {
    typeof window !== "undefined"
      ? localStorage.setItem("FavMovies", JSON.stringify(state.favsId))
      : false;
  }
  const handleRemove = (id) => {
    const newPeople = state.favsId.filter((person) => person !== id);

    dispatch({
      favsId: newPeople,
    });
  };
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
              {typeof window !== "undefined" &&
              window.localStorage.getItem("FavMovies") &&
              window.localStorage.getItem("FavMovies").includes(movie.id) ? (
                <Tooltip title="Double Click to Remove">
                  <button
                    onClick={() => {
                      handleRemove(movie.id);
                      putItem();
                    }}
                  >
                    Remove from Watchlist
                  </button>
                </Tooltip>
              ) : (
                <Tooltip title="Click to Add">
                  <button
                    onClick={() => {
                      dispatch(state.favsId.push(movie.id));
                      putItem();
                    }}
                  >
                    Add to Watchlist
                  </button>
                </Tooltip>
              )}
              <Link href={`/${movie.id}`}>View Info</Link>
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
