"use client";

import Link from "next/link";
import styles from "./layout.module.css";
import promptsMetadata from "../promptsMetadata.json";
import { usePathname, useSelectedLayoutSegments } from "next/navigation";

const promptCategories = promptsMetadata.reduce((acc: any, prompt) => {
  if (!acc.includes(prompt.category)) {
    acc.push(prompt.category);
  }
  return acc;
}, []);

export default function PromptsLayout({ children = null }) {
  const pathname = usePathname();
  const category = pathname.split("/")[2];
  const readableCategory = category
    .split("-")
    .join(" ")
    .replace(/\b\w/g, (l: any) => l.toUpperCase());
  const pathMetadata = promptsMetadata.find(
    (prompt) => prompt.url === pathname
  );

  return (
    <main className={styles.main}>
      <aside className={styles.sidebar}>
        <h1>
          <Link href="/prompts">AgentPrompts</Link>
        </h1>
        <nav>
          <ul className={styles.navList}>
            {promptCategories.map((category: any, index: any) => {
              const readableCategory = category
                .split("-")
                .join(" ")
                .replace(/\b\w/g, (l: any) => l.toUpperCase());

              return (
                <li key={index} className={styles.navItem}>
                  <Link href={`/prompts/${category}/`}>{readableCategory}</Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </aside>
      <article className={styles.card}>
        <div>
          {readableCategory && !pathMetadata && (
            <h3>{readableCategory} Prompts</h3>
          )}
          {children}
          {pathMetadata && (
            <button className={styles.btn}>Try Prompt on CommonOS</button>
          )}
        </div>
      </article>
    </main>
  );
}
