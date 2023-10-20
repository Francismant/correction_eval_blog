import { useParams } from "react-router-dom";
import { useContext } from "react";
import { ApiContext } from "../../context/ApiContext";
import { useFetchData } from "../../hooks/useFetchData";
import styles from "./Details.module.scss";

export default function Details() {
  const params = useParams();
  const BASE_API_URL = useContext(ApiContext);
  const [[series]] = useFetchData(
    BASE_API_URL,
    `series/getOneSerie/${params.id}`
  );

  return (
    <div className="d-flex flex-column flex-fill">
      {series.length > 0 && (
        <div>
          <div className={`d-flex flex-column flex-fill ${styles.list}`}>
            <h1 className="ml20 my30">
              {series[0].title} (
              <span className={`${styles.year}`}>{series[0].year}</span>)
            </h1>
            <div className="d-flex">
              <img
                className={`${styles.poster}`}
                src={
                  !series[0].image.startsWith("data")
                    ? `../${series[0].image}`
                    : series[0].image
                }
                alt="img"
              />
              <p className={`${styles.paragraph}`}>
                <span className={`${styles.resume}`}>Résumé :</span>{" "}
                {series[0].content}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
