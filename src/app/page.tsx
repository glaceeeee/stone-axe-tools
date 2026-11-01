import Image from "next/image";
import styles from "./page.module.css";
import GraphicGenerator from "./_graphic_generator/_components/graphic-generator";

export default function Home() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <GraphicGenerator />
      </main>
    </div>
  );
}
