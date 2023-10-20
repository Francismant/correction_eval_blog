import styles from "./Favorites.module.scss";
import { useFetchData } from "../../hooks/useFetchData";
import { useContext } from "react";
import { ApiContext } from "../../context/ApiContext";

export default function Favorites() {
  const BASE_API_URL = useContext(ApiContext);
  const [[series, setSeries]] = useFetchData(
    BASE_API_URL,
    "series/getFavorites"
  );

  async function toggleLikeSerie(updatedSerie) {
    console.log(updatedSerie);
    const response = await fetch(`${BASE_API_URL}/series/likedOne`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ...updatedSerie, like: !updatedSerie.like }),
    });
    if (response.ok) {
      const newSerie = await response.json();
      setSeries(series.filter((s) => s.id !== newSerie.id));
    }
  }

  return (
    <div className="d-flex flex-column flex-fill">
      <h1 className="my30 ml20">Favorites</h1>
      <ul className={styles.list}>
        {series.length
          ? series.map((s) => (
              <li key={s.id} className="d-flex align-items-center">
                <span className="flex-fill">{s.title}</span>
                <button
                  onClick={() => {
                    toggleLikeSerie(s);
                  }}
                  className="btn btn-danger"
                >
                  Dislike
                </button>
              </li>
            ))
          : null}
      </ul>
    </div>
  );
}
