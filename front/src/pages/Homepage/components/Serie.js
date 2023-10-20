import { NavLink } from "react-router-dom";
import { ApiContext } from "../../../context/ApiContext";
import styles from "./Serie.module.scss";
import { useContext } from "react";

export default function Serie({ serie, toggleLikeSerie, deleteSerie }) {
  const { id, title, image, like } = serie;
  const BASE_API_URL = useContext(ApiContext);

  const handleClick = async () => {
    const response = await fetch(`${BASE_API_URL}/series/likedOne`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ...serie, like: !like }),
    });
    if (response.ok) {
      const updatedSerieFromBack = await response.json();
      toggleLikeSerie(updatedSerieFromBack);
    }
  };

  async function handleDelete(e) {
    e.stopPropagation();
    try {
      const response = await fetch(`${BASE_API_URL}/series/deleteSerie/${id}`, {
        method: "DELETE",
      });
      if (response.ok) {
        deleteSerie(id);
      }
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className={`${styles.serie}`}>
      <i className="fas fa-xmark" onClick={handleDelete}></i>
      <div className={`${styles.imgContainer}`}>
        <NavLink to={`details/${id}`}>
          <img src={image} alt="oneSerie" />
        </NavLink>
      </div>
      <div
        className={`${styles.title} d-flex flex-column justify-content-center align-items-center`}
      >
        <h3 className="mb10">{title}</h3>
        <i
          onClick={handleClick}
          className={`fas fa-heart ${like ? "text-error" : ""}`}
        ></i>
      </div>
    </div>
  );
}
