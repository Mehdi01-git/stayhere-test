import { Star } from "@mui/icons-material";
import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import ReactPaginate from "react-paginate";
import styles from "../styles/Home.module.css";

// Example items, to simulate fetching from another resources.
const items = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14];

function Items({ currentItems, selectedRating, selectedGenres }) {
  console.log(selectedGenres);
  console.log(currentItems);
  return (
    <div className={styles.editGrid}>
      {currentItems &&
        currentItems.map((movie, i) => (
          <div key={i} className={styles.gridItem}>
            <img
              width="100%"
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
        ))}
    </div>
  );
}

export function PaginatedItems({
  itemsPerPage,
  data,
  selectedRating,
  selectedGenres,
  applied,
}) {
  // We start with an empty list of items.
  const [currentItems, setCurrentItems] = useState(null);
  const [pageCount, setPageCount] = useState(0);
  // Here we use item offsets; we could also use page offsets
  // following the API or data you're working with.
  const [itemOffset, setItemOffset] = useState(0);

  useEffect(() => {
    // Fetch items from another resources.
    const endOffset = itemOffset + itemsPerPage;
    const newdata = data.filter(
      (movie) =>
        (selectedGenres === "All"
          ? movie.genre_ids && movie.vote_average <= Number(selectedRating)
          : movie.genre_ids.includes(Number(selectedGenres))) &&
        movie.vote_average < Number(selectedRating)
    );
    console.log(`Loading items from ${itemOffset} to ${endOffset}`);
    setCurrentItems(data.slice(itemOffset, endOffset));
    setPageCount(Math.ceil(data.length / itemsPerPage));
  }, [itemOffset, itemsPerPage, applied]);

  // Invoke when user click to request another page.
  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % data.length;
    console.log(
      `User requested page number ${event.selected}, which is offset ${newOffset}`
    );
    setItemOffset(newOffset);
  };
  return (
    <div>
      <Items
        selectedGenres={selectedGenres}
        selectedRating={selectedRating}
        currentItems={currentItems}
      />
      <div className={styles.paginator}>
        <ReactPaginate
          breakLabel="..."
          nextLabel="next >"
          onPageChange={handlePageClick}
          pageRangeDisplayed={5}
          pageCount={pageCount}
          previousLabel="< previous"
          renderOnZeroPageCount={null}
        />
      </div>
    </div>
  );
}
