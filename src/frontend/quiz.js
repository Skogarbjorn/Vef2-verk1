document.addEventListener('DOMContentLoaded', () => {
	const form = document.getElementById('quizForm');
	const questions = Array.from(form.querySelectorAll('.question'))
	const submitButton = document.getElementById('submitButton');

	updateSubmitButtonState();

	submitButton.addEventListener('click', handleSubmit);
	form.addEventListener('change', updateSubmitButtonState);

	function updateSubmitButtonState() {
		const allAnswered = questions.every(question => {
			return question.querySelector('input[type="radio"]:checked');
		});
		submitButton.disabled = !allAnswered;
	}
});

function handleSubmit() {
	document.querySelectorAll('.question').forEach(question => {
		const selectedAnswer = question.querySelector('input:checked');
		const correctAnswer = question.querySelector('input[data-is-correct="true"]');

		showAnswerFeedback(correctAnswer, selectedAnswer)
	});
}

function showAnswerFeedback(correctAnswer, selectedAnswer) {
	selectedAnswer.classList.remove('correct', 'incorrect');
	correctAnswer.classList.remove('correct', 'incorrect');

	if (correctAnswer === selectedAnswer) {
		selectedAnswer.classList.add('correct');
	} else {
		selectedAnswer.classList.add('incorrect');
		correctAnswer.classList.add('correct');
	}
	console.log("gaming");
}
