import { Link } from "next-view-transitions";
import styles from "./CategoryPrompts.module.css";
import promptsMetadata from "../app/promptsMetadata.json";

export default function CategoryPrompts({ slug = "" }) {
  const categoryPrompts = promptsMetadata.filter(
    (prompt) => prompt.category === slug
  );

  return (
    <section className={styles.promptList}>
      {categoryPrompts.map((prompt, index) => {
        const readableShortVersion = prompt.shortVersion
          .split("-")
          .join(" ")
          .replace(/\b\w/g, (l: any) => l.toUpperCase());

        return (
          <Link href={prompt.url} key={index}>
            {readableShortVersion}...
          </Link>
        );
      })}
    </section>
  );
}
