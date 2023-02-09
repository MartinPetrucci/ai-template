import LoadImages from "../components/LoadImages/LoadImages";
import styles from './styles.module.scss'
export default function ImagesPage() {
  return (
    <main className={styles.main}>
      <LoadImages />
    </main>
  );
}
