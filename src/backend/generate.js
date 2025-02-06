import { createDirIfNotExists } from "./lib/file.js";
import { generateIndexHTML, generateQuestionsHTML } from "./lib/html.js";
import { writeHTML } from "./lib/file.js";
import { readJson } from "./lib/parse.js";

const INDEX_PATH = "./data/index.json";
const DIST_PATH = "./dist";
export const QUIZ_JS_PATH = "frontend/quiz.js";

export async function main() {
  console.log("hello world");

  const indexData = await readJson(INDEX_PATH);

  if (!Array.isArray(indexData)) {
    console.error("index.json is not an array. Check the file format.");
    return [];
  }

  const allData = (
    await Promise.all(
      indexData.map(async (item) => {
        const filePath = `./data/${item.file}`;
        const fileData = await readJson(filePath);
        return fileData
          ? {
              ...item,
              content: fileData.title && fileData.questions ? fileData : null,
            }
          : null;
      }),
    )
  ).filter((item) => item != null && item.content != null);

  await createDirIfNotExists(DIST_PATH);

  await writeHTML(generateIndexHTML(allData), "index", DIST_PATH);

  await Promise.all(
		allData.map(async (data) => {
			const html = generateQuestionsHTML(data);
			await writeHTML(html, data.file.replace(".json", ""), DIST_PATH);
		})
	);
}

if (import.meta.url.endsWith(process.argv[1])) {
	main().catch((error) => {
		console.error("Fatal error:", error);
		process.exit(1);
	});
}


