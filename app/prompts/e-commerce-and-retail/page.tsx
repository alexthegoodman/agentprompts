"use client";

import CategoryPrompts from "@/components/CategoryPrompts";
import { useParams, usePathname } from "next/navigation";

export default function CategoryPage() {
  const pathname = usePathname();
  const slug = pathname.split("/").pop();

  return (
    <>
      <CategoryPrompts slug={slug} />
    </>
  );
}
