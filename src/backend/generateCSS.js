import fs from 'node:fs/promises';
import path from 'node:path';

const DIST_PATH = './dist';

export async function initCSS() {
	await writeCSS(generateCSS(), "styles");
}

async function writeCSS(css, name) {
	try {
		await fs.writeFile(path.join(DIST_PATH, `${name}.css`), css);
	} catch (error) {
		console.error("Error writing to html:", error.message);
	}
}

function generateCSS() {
	return `
.body {
	background-color: red !important;
}

.question {
	position: relative;
	padding: 1rem;
	margin: 1rem 0;
	border-left: 4px solid transparent;
	transition: all 0.3s ease;
}

.question.correct {
	border-color: #4CAF50;
	background: #f0fff4;
	padding: 10rem;
}

.question.incorrect {
	border-color: #f44336;
	background: #fff0f0;
}`;
}
