import Link from "next/link";
import promptsMetadata from "../app/promptsMetadata.json";

export default function CategoryPrompts({ slug = "" }) {
  const categoryPrompts = promptsMetadata.filter(
    (prompt) => prompt.category === slug
  );

  return (
    <>
      {categoryPrompts.map((prompt, index) => {
        const readableShortVersion = prompt.shortVersion
          .split("-")
          .join(" ")
          .replace(/\b\w/g, (l: any) => l.toUpperCase());

        return (
          <div>
            <Link href={prompt.url} key={index}>
              {readableShortVersion}...
            </Link>
          </div>
        );
      })}
    </>
  );
}
