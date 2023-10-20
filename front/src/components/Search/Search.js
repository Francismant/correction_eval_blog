import styles from "./Search.module.scss";

export default function Search({ setFilter }) {
  const handleInput = (e) => {
    const search = e.target.value;
    setFilter(search.trim().toLowerCase());
  };
  return (
    <div
      className={`d-flex justify-content-center
         align-items-center my30 ${styles.search}
      `}
    >
      <i className="fas fa-magnifying-glass mr10"></i>
      <input
        onInput={handleInput}
        className="flex-fill"
        type="text"
        placeholder="Rechercher"
      />
    </div>
  );
}
