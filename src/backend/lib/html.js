import { shuffle } from "./lib.js";
import { QUIZ_JS_PATH } from "../generate.js";

export function generateIndexHTML(data) {
	if (!data) {
		return null;
	}

  const description = "Here is a very cool and meaningful description of these intense QUIZZES!!!";

  const links = data
    .map((item) => {
      try {
        return `<div class="main-link">
					<li><a href="./${item.file.replace(".json", ".html")}">${item.title}</a></li>
					</div>`;
      } catch (error) {
        console.error("Error generating category link:", error.message);
      }
    })
    .join("\n");

  const indexHTML = `
<!DOCTYPE html>
<html lang="en">
	<head>
		<meta charset="UTF-8">
		<meta name="viewport" content="width=device-width, initial-scale=1.0">
		<title>categories</title>
		<link rel="stylesheet" href="assets/styles.css">
	</head>
	<body>
		<div class="category-div">
		<header>
		    <h1>Categories</h1>
		</header>
		<main>
			<div class="main-description">
				 <p>${description}</p>
			</div>
			<div class="main-category-list">
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

export function generateQuestionsHTML(data) {
	if (!data) {
		return false;
	}

  const content = data.content;
  if (!content || !content.title || !content.questions) {
    return false;
  }

  let num_questions = 0;

  const questions = content.questions
    .map((question, question_index) => {
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
</div>`;
          })
          .join("\n");
      } catch (error) {
        console.error("Error generating answers:", error.message);
        num_questions--;
        return;
      }
      const header = `
<div class="question">
	<pre>${escapeHTML(question.question)}</pre>`;
      return `${header}${answers}</div>`;
    })
    .join(`\n`);

  const header = `
<!DOCTYPE html>
<html lang="en">
	<head>
		<meta charset="UTF-8">
		<meta name="viewport" content="width=device-width, initial-scale=1.0">
		<script src="${QUIZ_JS_PATH}" type="module"></script>
		<title>questions</title>
		<link rel="stylesheet" href="assets/styles.css">
	</head>
	<body>
		<div class="quiz-container">
		<h1>${data.title} Questions</h1>
	<form id ="quizForm" data-total-questions="${num_questions}">`;

  const footer = `<div class="button-div">
		<button type="button" id="submit-button" disabled>Submit</button>
	</div>
</form>
</div>`;
  return `${header}\n${questions}\n${footer}`;
}

export function escapeHTML(input) {
  return input
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

