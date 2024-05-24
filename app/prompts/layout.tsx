"use client";

import { Link } from "next-view-transitions";
import styles from "./layout.module.css";
import promptsMetadata from "../promptsMetadata.json";
import { usePathname, useSelectedLayoutSegments } from "next/navigation";
import { useMemo } from "react";

const promptCategories = promptsMetadata.reduce((acc: any, prompt) => {
  if (!acc.includes(prompt.category)) {
    acc.push(prompt.category);
  }
  return acc;
}, []);

// promptsMetadata.sort(() => Math.random() - 0.5);

export default function PromptsLayout({ children = null }) {
  const pathname = usePathname();
  const category = pathname.split("/")[2];
  const readableCategory = category
    ? category
        .split("-")
        .join(" ")
        .replace(/\b\w/g, (l: any) => l.toUpperCase())
    : "";
  const pathMetadata = promptsMetadata.find(
    (prompt) => prompt.url === pathname
  );

  return (
    <main className={styles.main}>
      <aside className={styles.sidebar}>
        <h1>
          <Link href="/prompts">AI Agent Prompts</Link>
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
        <a
          className={styles.link}
          href="https://x.com/AlexTheGoodman"
          target="_blank"
        >
          Created by Alex Goodman
        </a>
      </aside>
      <article>
        <div className={styles.card}>
          {readableCategory && !pathMetadata && (
            <h3>{readableCategory} Prompts</h3>
          )}
          {children}
          {pathMetadata && (
            <button
              className={styles.btn}
              onClick={() => {
                // open commonos.cloud in new tab
                window.open("https://commonos.cloud");
              }}
            >
              Try Prompt on CommonOS
            </button>
          )}
        </div>
        {pathMetadata && (
          <div className={styles.relatedPrompts}>
            <h3>Related Prompts</h3>
            <div className={styles.grid}>
              {promptsMetadata
                .filter((prompt) => prompt.category === category)
                .filter((prompt) => prompt.url !== pathname)
                .map((prompt, index) => {
                  if (index > 2) return null;

                  const readableShortVersion = prompt.shortVersion
                    .split("-")
                    .join(" ")
                    .replace(/\b\w/g, (l: any) => l.toUpperCase());

                  return (
                    <div className={styles.card} key={index}>
                      <Link href={prompt.url}>{readableShortVersion}...</Link>
                    </div>
                  );
                })}
            </div>
          </div>
        )}
      </article>
    </main>
  );
}
