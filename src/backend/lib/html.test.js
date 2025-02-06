import { generateIndexHTML, generateQuestionsHTML, escapeHTML } from "./html.js";
import { describe, expect, it } from '@jest/globals';

describe('html', () => {
	describe('generateIndexHTML', () => {
		it('returns an index template with links based on given data', () => {
			const dummy_data = [
				{
					title: "gamer",
					file: "gaming.json",
				},
				{
					title: "epic",
					file: "epicing.json",
				}
			]
			const result = generateIndexHTML(dummy_data);
			expect(result).toContain("<h1>Categories</h1>");
			expect(result).toContain("<li><a href=\"./gaming.html\">gamer</a></li>");
			expect(result).toContain("<li><a href=\"./epicing.html\">epic</a></li>");
		});

		it('returns null if no data is given', () => {
			const result = generateIndexHTML();
			expect(result).toBe(null);
		});
	});

	describe('generateQuestionsHTML', () => {
		it('returns a questions template with questions based on given data', () => {
			const dummy_data = {
				title: "gamer",
				file: "gaming.json",
				content: {
					title: "Gamer",
					questions: [
						{
							question: "What is a gamer?",
							answers: [
								{
									answer: "A fish~~!",
									correct: "true",
								},
								{
									answer: "ME!",
									correct: "false",
								}
							]
						},
						{
							question: "Where am I for sale?",
							answers: [
								{
									answer: "At the Taj Mahal",
									correct: "false",
								},
								{
									answer: "In the London Underground",
									correct: "true",
								},
							]
						},
					]
				},
			};

			const result = generateQuestionsHTML(dummy_data);
			expect(result).toContain("<input type=\"radio\" name=\"question0\" value=\"answer1\" data-is-correct=\"false\">");
			expect(result).toContain("<form id =\"quizForm\" data-total-questions=\"2\">"); 
		});

		it('returns false if there is no input data', () => {
			const result = generateQuestionsHTML();
			expect(result).toBe(false);
		});

		it('returns false if there is no content in the data', () => {
			const dummy_data = {
				title: "gamer",
				file: "gaming.json",
				content: null,
			};

			const result = generateQuestionsHTML(dummy_data);
			expect(result).toBe(false);
		});

		it('returns false if the content in the data is invalid', () => {
			const dummy_data = {
				title: "gamer",
				file: "gaming.json",
				content: {
					title: "Gamer",
					questions: null,
				}
			};

			const result = generateQuestionsHTML(dummy_data);
			expect(result).toBe(false);
		});
	});

	describe('escapeHTML', () => {
		it('returns an html-compatible version of the input string', () => {
			const input = "\<tag\>";
			const result = escapeHTML(input);

			expect(result).toBe("&lt;tag&gt;");
		});
	});
});
