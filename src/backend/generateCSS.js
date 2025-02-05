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
* {
    margin: 0;
	padding: 0;
	box-sizing: border-box;
}

body {
	font-family: 'Arial', sans-serif;
	background-color: #f4f4f9;
	color: #333;
	line-height: 1.6;
	padding: 20px;
	display: flex;
}

.categoryDiv {
	text-align: center;
	color: #484848;
	max-width: 800px;
	width: 85%;
	margin: 0 auto;
	background: #fff;
	padding: 20px;
	border-radius: 8px;
	box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

header {
	margin-bottom: 20px;
}

.mainDescription {
	margin-bottom: 20px;
}

.mainDescription p {
	font-size: 1.2rem;
	color: #666;
}

.mainCategoryList {
	margin-top: 10px;
}

ul {
	list-style: none;
	padding: 0;
	display: flex;
	flex-direction: column;
	gap: 15px;
	align-items: center;
}

.mainLink {
	width: 100%;
	max-width: 200px;
}

.mainLink li {
	background: #fdfdfd;
	border: 2px solid #c1c1c1;
	border-radius: 8px;
	padding: 10px 10px;
	color: #333;
	transition: 0.3s ease;
}

.mainLink a {
	text-decoration: none;
	font-size: 1.2rem;
	color: #666;
	display: block;
	font-weight: bold;
	transition: 0.3s ease-out;
}

.mainLink li:hover {
	background-color: #343434;
}

.mainLink li:hover a {
    color: #eeeeee;
}

footer {
    margin-top: 20px;
    padding: 15px;
    background-color: #fff;
    color: #adadad;
    width: 100%;
    text-align: center;
    font-size: 0.9rem;
    border-radius: 5px;
}

.quiz-container {
	max-width: 800px;
	margin: 0 auto;
	background: #fff;
	padding: 20px;
	border-radius: 8px;
	box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.quiz-container h1 {
	text-align: center;
	margin-bottom: 20px;
	font-size: 2rem;
	color: #484848;
}

.question {
	position: relative;
	margin: 1rem 0;
	border-left: 4px solid transparent;
	transition: all 0.3s ease;
}

.question pre {
	white-space: pre-wrap;
	font-family: inherit;
	font-size: 1.1rem;
	margin-bottom: 15px;
	color: #34495e;
}

.answer {
	display: flex;
	align-items: center;
	padding: 10px;
	background: #fff;
	transition: background 0.3s ease;
	margin: 2px;
	border: 2px solid #fff;
	border-radius: 4px;
}

.answer label {
	display: flex;
	align-items: center;
	gap: 10px;
	cursor: pointer;
	width: 100%;
}

div:has(> label > input.correct) {
	border: 2px solid #6ed660;
	border-radius: 4px;
	background: #f0fff4;
}

div:has(> label > input.incorrect) {
	border: 2px solid #e8665a;
	border-radius: 4px;
	background: #fff0f0;
}

.buttonDiv {
	display: flex;
	justify-content: center;
	margin-top: 2em;
}

#submitButton {
	all: unset;
	display: block;
	width: 35%;
	minimum-width: 100px;
	padding: 0.8em;
	background: #fdfdfd;
	color: #333;
	border: 2px solid #c1c1c1;
	border-radius: 10px;
	text-align: center;
	transition: 0.3s ease;
}

#submitButton:hover {
	background-color: #343434;
    color: #eeeeee;
}
#submitButton:disabled {
	color: #999999;
	border: 2px solid #e1e1e1;
}
#submitButton:disabled:hover {
	background: #fdfdfd;
}
`;
}
