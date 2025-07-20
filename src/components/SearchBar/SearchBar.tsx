
// ----------КОМПОНЕНТ, ЯКИЙ ПРАЦЮЄ ІЗ ФОРМОЮ----------

import styles from "./SearchBar.module.css";
import toast from "react-hot-toast";

export interface SearchBarProps {
  onSubmit: (query: string) => void;
}

// ----------Form Actions----------
export default function SearchBar ({ onSubmit }: SearchBarProps) {
  const handleAction = (formData: FormData) => {
    const query = (formData.get("query") as string).trim();

// ----------Обробка помилки пустого поля----------
    if (query === "") {
      toast.error("Please enter your search query.");
      return;
    }

    onSubmit(query);
  };

  return (
    <header className={styles.header}>
      <div className={styles.container}>

        <a className={styles.link} href="https://www.themoviedb.org/" target="_blank" rel="noopener noreferrer">Powered by TMDB</a>

        <form className={styles.form} action={handleAction}>
          <input className={styles.input} type="text" name="query" autoComplete="off" placeholder="Search movies..." autoFocus/>
          <button className={styles.button} type="submit">Search</button>
        </form>
        
      </div>
    </header>
  );
};