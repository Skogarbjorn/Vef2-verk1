import path from 'node:path';
import fs from 'node:fs/promises';

const INDEX_PATH = './data/index.json';
const DIST_PATH = './dist';
const MAIN_JS_PATH = 'frontend/main.js';
const QUIZ_JS_PATH = 'frontend/quiz.js';

async function readJson(filePath) {
	console.log('reading: ', filePath);
	try {
		const data = await fs.readFile(path.resolve(filePath), 'utf-8');
		return JSON.parse(data);
	} catch (error) {
		console.error(`Error reading file ${filePath}: `, error.message);
		return null;
	}
}

async function writeHTML(html, name) {
	try {
		await fs.writeFile(path.join(DIST_PATH, `${name}.html`), html);
	} catch (error) {
		console.error("Error writing to html:", error.message);
	}
}

async function writeDist() {
	try {
		await fs.mkdir(DIST_PATH);
	} catch (error) {
		console.error("Error writing templates/ folder:", error.message);
	}
}

export async function initHTML() {
	console.log('hello world');

	const indexData = await readJson(INDEX_PATH);

	if (!Array.isArray(indexData)) {
		console.error('index.json is not an array. Check the file format.');
		return [];
	}


	const allData = (await Promise.all(
		indexData.map(async (item) => {
			const filePath = `./data/${item.file}`;
			const fileData = await readJson(filePath);
			return fileData ? { ...item, content: 
				(fileData.title &&
				fileData.questions) ? fileData : null } : null;
		}))).filter((item) => item != null && item.content != null);

	await writeDist();

	await writeHTML(generateIndexHTML(allData), "index");

	allData.map(async (data) => {
		const html = generateQuestionsHTML(data);
		await writeHTML(html, data.file.replace('.json', ''))
	});
}

function generateIndexHTML(data) {
	const description = "gamer description";

	const links = data
		.map((item) => {
			try {
				return `<div class="mainLink">
					<li><a href="./${item.file.replace('.json', '.html')}">${item.title}</a></li>
					</div>`
			} catch (error) {
				console.error('Error generating category link:', error.message);
			}
		})
		.join('\n');

	const indexHTML = `
<!DOCTYPE html>
<html lang="en">
	<head>
		<meta charset="UTF-8">
		<meta name="viewport" content="width=device-width, initial-scale=1.0">
		<script src="${MAIN_JS_PATH}" type="module"></script>
		<title>categories</title>
		<link rel="stylesheet" href="styles.css">
	</head>
	<body>
		<div class="categoryDiv">
		<header>
		    <h1>Categories</h1>
		</header>
		<main>
			<div class="mainDescription">
				 <p>${description}</p>
			</div>
			<div class="mainCategoryList">
				 <ul>
					 ${links}
				 </ul>
			</div>
		</main>
		<footer>
		    <p>&copy; gamer quiz</p>
		</footer>
		</div>
	</body>
</html>`;

	return indexHTML;
}

function generateQuestionsHTML(data) {
	const content = data.content;
    if (!content ||
	    !content.title ||
	    !content.questions) {
		return false;
	}

	let num_questions = 0;

    const questions = content.questions.map((question, question_index) => {
		let answers;
		num_questions++;
		
		try {
			answers = shuffle(question.answers)
				.map((answer, answer_index) => {
					return `
<div class="answer">
	<label>
		<input type="radio" name="question${question_index}" value="answer${answer_index}" data-is-correct="${answer.correct}">
		${escapeHTML(answer.answer)}
	</label>
</div>`;})
				.join('\n');
		} catch(error) {
			console.error("Error generating answers:", error.message);
			num_questions--;
			return;
		}
		const header = `
<div class="question">
	<pre>${escapeHTML(question.question)}</pre>`;
		return `${header}${answers}</div>`;
	}).join(`\n`);

	const header = `
<!DOCTYPE html>
<html lang="en">
	<head>
		<meta charset="UTF-8">
		<meta name="viewport" content="width=device-width, initial-scale=1.0">
		<script src="${QUIZ_JS_PATH}" type="module"></script>
		<title>questions</title>
		<link rel="stylesheet" href="./styles.css">
	</head>
	<body>
		<div class="quiz-container">
		<h1>${data.title} Questions</h1>
	<form id ="quizForm" data-total-questions="${num_questions}">`;

    const footer = `<div class="buttonDiv">
		<button type="button" id="submitButton" disabled>Submit</button>
	</div>
</form>
</div>`;
	return `${header}\n${questions}\n${footer}`;
}

function escapeHTML(input) {
	return input
	    .replace(/&/g, '&amp;') 
		.replace(/</g, '&lt;')
		.replace(/>/g, '&gt;')
		.replace(/"/g, '&quot;')
		.replace(/'/g, '&#039;');
}

function shuffle(array) {
	if (array.constructor !== Array) {
		console.error("Trying to randomize a non-array object");
		return null;
	}
	let currentIndex = array.length;

	while (currentIndex != 0) {
		const randomIndex = Math.floor(Math.random() * currentIndex);
		currentIndex--;

		[array[currentIndex], array[randomIndex]] = [
			array[randomIndex], array[currentIndex]];
	}

	return array;
}
