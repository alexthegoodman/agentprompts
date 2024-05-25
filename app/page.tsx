import Image from "next/image";
import styles from "./page.module.css";
import { Link } from "next-view-transitions";

export default function Home() {
  return (
    <main className={styles.main}>
      <section>
        <div>
          <h1>AI Agent Prompts</h1>
          <p>The home of AI Agent and future AGI prompts!</p>
          <p>
            {`Which AI Agent can fulfill the prompts best? It's up to you to find
            out.`}
          </p>
        </div>
      </section>
      <Link href="/prompts">Browse Prompts</Link>
    </main>
  );
}
