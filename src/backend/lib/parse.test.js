import { describe, expect, it } from '@jest/globals';
import { readJson } from "./parse.js";

const dummy_data_path = './src/backend/test_data/data.json';

describe('parse', () => {
	describe('readJson', () => {
		it('parses a json file into data for javascript', async () => {
			const data = {
				"gamer": "gamer",
				"gaming": "gamer.json",
				"content": [
					{
						"where": "here"
					},
					{
						"over": "here?"
					}
				]
			};
			const result = await readJson(dummy_data_path);

			expect(result).toMatchObject(data);
		});

		it('returns null if no input is given', async () => {
			const result = await readJson();

			expect(result).toBe(null);
		});
	});
});
