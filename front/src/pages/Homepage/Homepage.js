import styles from "./Homepage.module.scss";
import Serie from "./components/Serie";
import { useContext, useState } from "react";
import Loading from "../../components/Loading/Loading";
import { ApiContext } from "../../context/ApiContext";
import Search from "../../components/Search/Search";
import { useFetchData } from "../../hooks/useFetchData";

export default function Homepage() {
  const [filter, setFilter] = useState("");
  const BASE_API_URL = useContext(ApiContext);

  const [[series, setSeries], isLoading] = useFetchData(
    BASE_API_URL,
    "series/getSeries"
  );

  function toggleLikeSerie(updatedSerie) {
    console.log(updatedSerie);
    setSeries(series.map((s) => (s.id === updatedSerie.id ? updatedSerie : s)));
  }

  function deleteSerie(id) {
    setSeries(series.filter((s) => s.id !== id));
  }

  return (
    <div className="flex-fill d-flex flex-column container p20">
      <h1 className="my30">Découvrez nos dernières critiques !</h1>
      <div
        className={`card p20 d-flex flex-column mb20 flex-fill ${styles.contentCard}`}
      >
        <Search setFilter={setFilter} />
        {isLoading ? (
          <Loading />
        ) : (
          <div className={`${styles.grid}`}>
            {series
              .filter((s) => s.title.toLowerCase().startsWith(filter))
              .map((serie) => (
                <Serie
                  key={serie.id}
                  serie={serie}
                  toggleLikeSerie={toggleLikeSerie}
                  deleteSerie={deleteSerie}
                />
              ))}
          </div>
        )}
      </div>
    </div>
  );
}
