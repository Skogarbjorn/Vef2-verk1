import { stat, writeFile, mkdir } from 'node:fs/promises';
import path from "node:path";

export async function writeHTML(html, name, dir) {
  try {
    await writeFile(path.join(dir, `${name}.html`), html);
  } catch (error) {
    console.error("Error writing to html:", error.message);
  }
}

export async function createDir(dir) {
  try {
    await mkdir(dir);
  } catch (error) {
    console.error(`Error writing ${dir} folder:`, error.message);
  }
}

export async function dirExists(dir) {
	if (!dir) {
		return false;
	}

	try {
		const info = await stat(dir);
		return info.isDirectory();
	} catch (_) {
		return false
	}
}

export async function createDirIfNotExists(dir) {
	if (!await dirExists(dir)) {
		await createDir(dir);
	}
}
