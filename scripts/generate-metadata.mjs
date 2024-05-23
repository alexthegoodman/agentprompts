import fs from "fs";

function main() {
  // read all directories in app/prompts
  // for each directory, read all .mdx files
  // save the urls to metadata.json

  const dirs = fs.readdirSync("app/prompts");
  const metadata = [];

  dirs.forEach((dir) => {
    if (dir.startsWith(".")) return;
    if (!fs.lstatSync(`app/prompts/${dir}`).isDirectory()) return;

    const files = fs.readdirSync(`app/prompts/${dir}`);
    files.forEach((file) => {
      const slug = file.replace(".mdx", "");
      const url = `/prompts/${dir}/${slug}`;
      metadata.push({
        shortVersion: slug,
        url,
        category: dir,
      });
    });
  });

  fs.writeFileSync(
    "app/promptsMetadata.json",
    JSON.stringify(metadata, null, 2)
  );
}

main();
