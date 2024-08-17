import fs from "fs";
import path from "path";

function extractPromptText(content) {
  const promptRegex = /---\s*Prompt:\s*---\s*([\s\S]*?)\s*---/;
  const match = content.match(promptRegex);
  return match ? match[1].trim() : "";
}

function extractCategory(content) {
  const categoryRegex = /Category:\s*(.*)/;
  const match = content.match(categoryRegex);
  return match ? match[1].trim() : "";
}

function main() {
  const promptsDir = "app/prompts";
  const dirs = fs.readdirSync(promptsDir);
  const metadata = [];

  dirs.forEach((dir) => {
    if (dir.startsWith(".")) return;
    const dirPath = path.join(promptsDir, dir);
    if (!fs.lstatSync(dirPath).isDirectory()) return;

    const folders = fs.readdirSync(dirPath);
    console.info("folders", folders);

    folders.forEach((folder) => {
      const folderPath = path.join(dirPath, folder);
      const filePath = `${folderPath}/page.mdx`;
      // const file = fs.readFileSync(filePath);

      if (path.extname(filePath) !== ".mdx") return;
      if (!fs.existsSync(filePath)) return;

      // const filePath = path.join(dirPath, file);
      const content = fs.readFileSync(filePath, "utf-8");
      const slug = path.basename(folderPath, ".mdx");
      const url = `/prompts/${dir}/${slug}`;
      const promptText = extractPromptText(content);
      const category = extractCategory(content) || dir;

      metadata.push({
        shortVersion: slug,
        url,
        category,
        promptText,
      });
    });
  });

  fs.writeFileSync(
    "app/promptsMetadata.json",
    JSON.stringify(metadata, null, 2)
  );
}

main();
