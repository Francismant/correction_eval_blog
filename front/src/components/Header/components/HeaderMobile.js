import styles from "./headerMobile.module.scss";

export default function HeaderMobile({ setPage }) {
  return (
    <ul className={`card p20 ${styles.menuContainer}`}>
      <li onClick={() => setPage("admin")}>Ajouter une série</li>
      <li>Favoris</li>
      <li>Connexion</li>
    </ul>
  );
}
