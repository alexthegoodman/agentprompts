"use client";

import Link from "next/link";
import promptsMetadata from "../promptsMetadata.json";

const promptCategories = promptsMetadata.reduce((acc: any, prompt) => {
  if (!acc.includes(prompt.category)) {
    acc.push(prompt.category);
  }
  return acc;
}, []);

export default function PromptsLayout({ children = null }) {
  return (
    <>
      <ul>
        {promptCategories.map((category: any, index: any) => {
          const readableCategory = category
            .split("-")
            .join(" ")
            .replace(/\b\w/g, (l: any) => l.toUpperCase());

          return (
            <li key={index}>
              <Link href={`/prompts/${category}/`}>{readableCategory}</Link>
            </li>
          );
        })}
      </ul>
      {children}
    </>
  );
}
