import Image from "next/image";
import styles from "./page.module.css";
import Link from "next/link";

export default function Home() {
  return (
    <main className={styles.main}>
      Welcome to AgentPrompts, the home to AI Agent and AGI prompts.
      <Link href="/prompts">Browse Prompts</Link>
    </main>
  );
}
